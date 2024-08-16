import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Timer {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface TimersState {
  timers: Timer[]
  activeTimerId: string | null
}

export function TimerReducer(state: TimersState, action: any) {
  switch (action.type) {
    case ActionTypes.START_TIMER: {
      // return {
      //   ...state,
      //   timers: [...state.timers, action.payload.newTimer],
      //   activeTimerId: action.payload.newTimer.id,
      // }
      return produce(state, (draft) => {
        draft.timers.push(action.payload.newTimer)
        draft.activeTimerId = action.payload.newTimer.id
      })
    }
    case ActionTypes.INTERRUPT_TIMER: {
      // return {
      //   ...state,
      //   timers: state.timers.map((timer) => {
      //     if (timer.id === state.activeTimerId) {
      //       return { ...timer, interruptedDate: new Date() }
      //     } else {
      //       return timer
      //     }
      //   }),
      //   activeTimerId: null,
      // }
      const currentTimerIndex = state.timers.findIndex((timer) => {
        return timer.id === state.activeTimerId
      })
      if (currentTimerIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeTimerId = null
        draft.timers[currentTimerIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_TIMER_AS_FINISHED: {
      // return {
      //   ...state,
      //   timers: state.timers.map((timer) => {
      //     if (timer.id === state.activeTimerId) {
      //       return { ...timer, finishedDate: new Date() }
      //     } else {
      //       return timer
      //     }
      //   }),
      //   activeTimerId: null,
      // }
      const currentTimerIndex = state.timers.findIndex((timer) => {
        return timer.id === state.activeTimerId
      })
      if (currentTimerIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeTimerId = null
        draft.timers[currentTimerIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
