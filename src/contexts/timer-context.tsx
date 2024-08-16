import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Timer, TimerReducer } from '../reducers/timer-reducer/reducer'
import {
  interruptTimerAction,
  markTimerAsFinishedAction,
  startTimerAction,
} from '../reducers/timer-reducer/actions'
import { differenceInSeconds } from 'date-fns'

interface ContextProps {
  children: ReactNode
}

interface TimerData {
  task: string
  duration: number
}

interface TimersContext {
  timers: Timer[]
  activeTimer: Timer | undefined
  activeTimerId: string | null
  markTimerAsFinished: () => void
  timePassed: number
  timePassedFunction: (time: number) => void
  startTimer: (formData: TimerData) => void
  interruptTimer: () => void
}

export const TimersContext = createContext({} as TimersContext)

export function TimerContextProvider({ children }: ContextProps) {
  // NOTA: todos os useState() que foram substituídos por useReducer() foram comentados e não removidos. O código antigo está logo em cima do novo.

  // const [timers, setTimers] = useState<Timer[]>([])
  const [timersState, dispatch] = useReducer(
    TimerReducer,
    {
      timers: [],
      activeTimerId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  // const [activeTimerId, setActiveTimerId] = useState<string | null>(null)
  const { timers, activeTimerId } = timersState
  const activeTimer = timers.find((timer) => timer.id === activeTimerId) // procura qual dos timers é o ativo, comparando os ids

  function markTimerAsFinished() {
    // setTimers((state) =>
    //   state.map((timer) => {
    //     if (timer.id === activeTimerId) {
    //       return { ...timer, finishedDate: new Date() }
    //     } else {
    //       return timer
    //     }
    //   }),
    // )
    dispatch(markTimerAsFinishedAction())
  }

  const [timePassed, setTimePassed] = useState(() => {
    if (activeTimer) {
      return differenceInSeconds(new Date(), new Date(activeTimer.startDate))
    }
    return 0
  })
  function timePassedFunction(time: number) {
    setTimePassed(time)
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(timersState)
    localStorage.setItem('ignite-timer', stateJSON)
  }, [timersState])

  function startTimer(formData: TimerData) {
    const id = String(new Date().getTime())

    const newTimer: Timer = {
      id,
      task: formData.task,
      duration: formData.duration,
      startDate: new Date(),
    }

    // setTimers((state) => [...state, newTimer])
    dispatch(startTimerAction(newTimer))
    // setActiveTimerId(id)
    setTimePassed(0)
  }

  function interruptTimer() {
    // setTimers((state) =>
    //   state.map((timer) => {
    //     if (timer.id === activeTimerId) {
    //       return { ...timer, interruptedDate: new Date() }
    //     } else {
    //       return timer
    //     }
    //   }),
    // )
    dispatch(interruptTimerAction())
    // setActiveTimerId(null)
  }

  return (
    <TimersContext.Provider
      value={{
        activeTimer,
        activeTimerId,
        markTimerAsFinished,
        timePassed,
        timePassedFunction,
        startTimer,
        interruptTimer,
        timers,
      }}>
      {children}
    </TimersContext.Provider>
  )
}
