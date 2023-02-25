
import { Message } from 'semantic-ui-react'
import '../style.scss'

export default function TabControllerDisclaimer () {
  return (
    <>
      <Message warning className='disclaimer__header'>
        <Message.Header>Data Availability</Message.Header>
        <p>
          Areas within the state may be operated by other organizations such as the Down Syndrome Association of Northern Virginia
        </p>
      </Message>
    </>
  )
}
