import { Scroll, Timer } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className='flex items-center justify-between'>
      <img src='/ignite-logo.svg' />
      <nav className='flex gap-2'>
        <NavLink
          to='/'
          className='border-y-transparent flex size-12 items-center justify-center border-y-2 hover:border-b-green-500 aria-[current]:text-green-500'>
          <Timer size={24} />
        </NavLink>
        <NavLink
          to='/history'
          className='border-y-transparent flex size-12 items-center justify-center border-y-2 hover:border-b-green-500 aria-[current]:text-green-500'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </header>
  )
}
