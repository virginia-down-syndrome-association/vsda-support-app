import { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentParticipant } from '@/store/reducers/research'
import '../style.scss'

export default function ResearchSelector (props) {
  const dispatch = useDispatch()
  const { view } = useSelector(state => state.map)
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

  const handleChange = (value) => {
    const cr = view?.map?.findLayerById('isochrone')
    if (cr) cr.destroy()
    dispatch(setCurrentParticipant(value))
  }

  return (
    <>
      { currentParticipant && view &&
        <Dropdown
          placeholder='Select Participant'
          search
          selection
          options={options}
          value={currentParticipant.id}
          onChange={(e, { value }) => handleChange(value)}
        />
      }
    </>
  )
}
