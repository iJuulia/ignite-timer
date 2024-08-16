import { tv } from 'tailwind-variants'

const label = tv({
  base: 'flex items-center gap-2 before:size-2 before:rounded-full before:content-[""]',
  variants: {
    color: {
      yellow: 'before:bg-yellow-500',
      green: 'before:bg-green-500',
      red: 'before:bg-red-500',
      gray: 'before:bg-gray-500',
    },
  },
})

interface StatusProps {
  labelName?: 'Concluído' | 'Em andamento' | 'Interrompido' | 'Indefinido'
}

export function Status({ labelName = 'Concluído' }: StatusProps) {
  return (
    <span
      className={
        labelName === 'Concluído'
          ? label({ color: 'green' })
          : labelName === 'Interrompido'
            ? label({ color: 'red' })
            : labelName === 'Em andamento'
              ? label({ color: 'yellow' })
              : label({ color: 'gray' })
      }>
      {labelName}
    </span>
  )
}
