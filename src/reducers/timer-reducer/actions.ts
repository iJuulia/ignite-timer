import { Timer } from './reducer'

export enum ActionTypes {
  START_TIMER = 'START_TIMER',
  INTERRUPT_TIMER = 'INTERRUPT_TIMER',
  MARK_TIMER_AS_FINISHED = 'MARK_TIMER_AS_FINISHED',
}

export function startTimerAction(newTimer: Timer) {
  return {
    type: ActionTypes.START_TIMER,
    payload: {
      newTimer,
    },
  }
}

export function interruptTimerAction() {
  return {
    type: ActionTypes.INTERRUPT_TIMER,
  }
}

export function markTimerAsFinishedAction() {
  return {
    type: ActionTypes.MARK_TIMER_AS_FINISHED,
  }
}
