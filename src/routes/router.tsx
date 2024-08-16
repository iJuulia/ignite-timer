import { Route, Routes } from 'react-router-dom'
import { Home } from './home'
import { History } from './history'
import { DefaultLayout } from '../layouts/default'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>
    </Routes>
  )
}
