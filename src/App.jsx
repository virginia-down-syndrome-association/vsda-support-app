import Overview from '@/components/views/overview'
import Research from '@/components/views/research'
import Plan from '@/components/views/plan'
import Manage from '@/components/views/manage'
import Edit from '@/components/views/edit'
import Layout from '@/components/layout/Layout'
import { Navigate, Routes, Route } from 'react-router-dom'
import './App.css'

export default function App () {
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<Navigate to='/overview' replace />} />
        <Route exact path='/overview' element={<Overview />} />
        <Route exact path='/research' element={<Research />} />
        <Route exact path='/plan' element={<Plan />} />
        <Route exact path='/manage' element={<Manage />} />
        <Route exact path='/edit' element={<Edit />} />
        <Route path='*' element={<Navigate to='/overview' replace />} />
      </Routes>
    </Layout>
  )
}
