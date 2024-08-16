import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import './styles.css'
import { TimersContext } from '../../../../contexts/timer-context'

export function Countdown() {
  const {
    activeTimer,
    activeTimerId,
    markTimerAsFinished,
    timePassed,
    timePassedFunction,
  } = useContext(TimersContext)

  const totalSeconds = activeTimer ? activeTimer.duration * 60 : 0

  // calcula a diferença entre o momento atual e o momento de início do timer para definir se ele foi finalizado ou não
  useEffect(() => {
    let interval: number

    if (activeTimer) {
      interval = setInterval(() => {
        const diff = differenceInSeconds(
          new Date(),
          new Date(activeTimer.startDate),
        )
        if (diff >= totalSeconds) {
          markTimerAsFinished()
          timePassedFunction(totalSeconds)
          clearInterval(interval)
        } else {
          timePassedFunction(diff)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeTimer,
    totalSeconds,
    activeTimerId,
    markTimerAsFinished,
    timePassedFunction,
  ])

  const currentSeconds = activeTimer ? totalSeconds - timePassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeTimer) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeTimer, minutes, seconds])

  return (
    <div className='countdown-container'>
      <span className='countdown-number'>{minutes[0]}</span>
      <span className='countdown-number'>{minutes[1]}</span>
      <span className='separator'>:</span>
      <span className='countdown-number'>{seconds[0]}</span>
      <span className='countdown-number'>{seconds[1]}</span>
    </div>
  )
}
