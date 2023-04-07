import { Header } from 'semantic-ui-react'
import '../style.scss'

export default function ResearchCard ({ name, children }) {
  return (
    <>
      <div>
        <Header as='h3' className='cardHeader'>{name}</Header>
        { children }
      </div>
    </>
  )
}
