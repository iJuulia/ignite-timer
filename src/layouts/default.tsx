import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'

export function DefaultLayout() {
  return (
    <div className='mx-auto my-20 flex h-[calc(100vh-10rem)] max-w-[74rem] flex-col rounded-lg bg-gray-800 p-10'>
      <Header />
      <Outlet />
    </div>
  )
}
