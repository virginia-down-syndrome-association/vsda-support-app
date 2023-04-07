import { useState } from 'react'
import { Message } from 'semantic-ui-react'
import '../style.scss'

const active = () => {
  return (
    <Message info>
      <Message.Header className='cardHeader'>Active Participant</Message.Header>
      <p>This is a current member of VSDA</p>
    </Message>
  )
}

const prospective = () => {
  return (
    <Message info>
      <Message.Header className='cardHeader'>Prospective Member</Message.Header>
      <p>This individual reached out to VSDA to learn more</p>
    </Message>
  )
}

export default function ParticipantTypeNotice() {
  const [isMember, setIsMember] = useState(true)

  return (
    <>
      {
        isMember ? active() : prospective()
      }
    </>
  )
}
