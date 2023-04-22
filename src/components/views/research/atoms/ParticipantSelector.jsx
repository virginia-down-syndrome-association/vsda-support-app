import { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentParticipant } from '@/store/reducers/research'
import '../style.scss'

export default function ResearchSelector (props) {
  const dispatch = useDispatch()
  const { participants, currentParticipant } = useSelector(state => state.research)
  const [options, setOptions] = useState([])

  useEffect(() => {
    const opts = participants.map(({ id, FirstName, LastName }) => {
      return {
        key: id,
        value: id,
        text: `${FirstName} ${LastName}`
      }
    })
    setOptions(opts)
  }, [participants])

  return (
    <>
      { currentParticipant &&
        <Dropdown
          placeholder='Select Participant'
          search
          selection
          options={options}
          value={currentParticipant.id}
          onChange={(e, { value }) => dispatch(setCurrentParticipant(value))}
        />
      }
    </>
  )
}
