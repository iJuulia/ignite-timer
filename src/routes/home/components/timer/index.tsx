import './styles.css'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { TimersContext } from '../../../../contexts/timer-context'

export function TimerForm() {
  const { activeTimer } = useContext(TimersContext)
  const { register } = useFormContext()

  return (
    <header className='form-container'>
      <label htmlFor='task'>Vou trabalhar em</label>
      <input
        type='text'
        id='task'
        placeholder='Dê um nome para o seu projeto'
        list='task-suggestions'
        disabled={!!activeTimer}
        {...register('task')}
      />
      <label htmlFor='duration'>durante</label>
      <input
        id='duration'
        type='number'
        placeholder='00'
        step={5}
        min={5}
        max={60}
        disabled={!!activeTimer}
        {...register('duration', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </header>
  )
}
