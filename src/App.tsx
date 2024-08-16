import { TimerContextProvider } from './contexts/timer-context'
import { Router } from './routes/router'

export function App() {
  return (
    <TimerContextProvider>
      <Router />
    </TimerContextProvider>
  )
}
