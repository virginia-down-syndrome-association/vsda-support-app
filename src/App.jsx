import Overview from '@/components/views/overview'
import Research from '@/components/views/research'
import Explore from '@/components/views/explore'
import Manage from '@/components/views/manage'
import Layout from '@/components/layout/Layout'
import { Navigate, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<Navigate to='/overview' replace />} />
        <Route exact path='/overview' element={<Overview />} />
        <Route exact path='/research' element={<Research />} />
        <Route exact path='/explore' element={<Explore />} />
        <Route exact path='/manage' element={<Manage />} />
        <Route path='*' element={<Navigate to='/overview' replace />} />
      </Routes>
    </Layout>
  )
}
