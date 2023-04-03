import { Loader, Dimmer } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import './DataLoader.scss'

export default function DataLoader () {
  const { loading } = useSelector(state => state.notification)
  return (
    <Dimmer active={loading} className='full-screen-loader'>
      <Loader
        inverted
        size='big'
        active={loading}
        inline='centered'
        content="Loading data..."
      />
    </Dimmer>
  )
}
