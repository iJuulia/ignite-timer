import './styles.css'
import { HandPalm, Play } from '@phosphor-icons/react'
import { Countdown } from './components/countdown'
import { TimerForm } from './components/timer'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { TimersContext } from '../../contexts/timer-context'
import { useContext } from 'react'

const startTimerSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  duration: z
    .number()
    .min(5, 'O ciclo precisa ser entre 5 e 60 minutos')
    .max(60, 'O ciclo precisa ser entre 5 e 60 minutos'),
})

type TimerFormData = z.infer<typeof startTimerSchema> // NOTE: typeof referencia uma função TS para o JS

export function Home() {
  const { activeTimer, startTimer, interruptTimer } = useContext(TimersContext)

  const timerForm = useForm<TimerFormData>({
    resolver: zodResolver(startTimerSchema),
  })
  const { handleSubmit, watch, reset } = timerForm

  function handleStartTimer(formData: TimerFormData) {
    startTimer(formData)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <main className='home-container'>
      <form onSubmit={handleSubmit(handleStartTimer)}>
        <FormProvider {...timerForm}>
          <TimerForm />
        </FormProvider>

        <datalist id='task-suggestions'>
          <option value='Projeto 1' />
          <option value='Projeto 2' />
          <option value='Projeto 3' />
          <option value='Bananas' />
        </datalist>

        <Countdown />

        {activeTimer ? (
          <button
            onClick={interruptTimer}
            type='button'
            className='countdown-button stop-button'>
            <HandPalm size={24} />
            Interromper
          </button>
        ) : (
          <button
            type='submit'
            className='countdown-button start-button'
            disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </button>
        )}
      </form>
    </main>
  )
}
