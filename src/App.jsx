import Home from '@/components/views/home'
import Research from '@/components/views/research'
import Plan from '@/components/views/plan'
import Manage from '@/components/views/manage'
import Layout from '@/components/layout/Layout'
import DataLoader from '@/components/global/organisms/data/DataLoader'
import { Navigate, Routes, Route } from 'react-router-dom'
import './App.css'

export default function App () {
  return (
    <>
      <DataLoader />
      <Layout>
        <Routes>
          <Route exact path='/' element={<Navigate to='/home' replace />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/research' element={<Research />} />
          <Route exact path='/plan' element={<Plan />} />
          <Route exact path='/manage' element={<Manage />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
      </Layout>
    </>
  )
}
