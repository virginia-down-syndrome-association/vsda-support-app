import { Checkbox, Divider } from 'semantic-ui-react'

export default function ParticipantListActions ({ onEvent, selectedFeatures, features }) {
  const allSelected = selectedFeatures.length === features.length

  const handleClick = () => {
    onEvent({ checked: !allSelected })
  }

  return (
    <>
      <div className='participantListActions__container'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox
            label="Select All"
            onClick={() => handleClick()}
            checked={allSelected}
          />
        </div>
        <Divider />
      </div>
    </>
  )
}
