import { useContext } from 'react'
import { TimersContext } from '../../contexts/timer-context'
import { Status } from './components/status'
import './styles.css'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function History() {
  const { timers } = useContext(TimersContext)

  return (
    <main className='history-container'>
      <h1>Meu histórico</h1>

      <div className='history-list'>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timers.map((timer) => {
              return (
                <tr key={timer.id}>
                  <td>{timer.task}</td>
                  <td>{timer.duration} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(timer.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {timer.finishedDate ? (
                      <Status labelName='Concluído' />
                    ) : timer.interruptedDate ? (
                      <Status labelName='Interrompido' />
                    ) : (
                      <Status labelName='Em andamento' />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
