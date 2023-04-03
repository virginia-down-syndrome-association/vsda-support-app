import { Checkbox, Divider, Button, Icon, Popup } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export default function ParticipantListActions ({ onEvent, selectedFeatures, features }) {
  const { matrixLookup } = useSelector(state => state.filters)
  const allSelected = selectedFeatures.length === features.length

  const handleClick = () => {
    onEvent({ checked: !allSelected })
  }

  const handleExportToCsv = () => {
    console.log('exporting to csv')
    // console.log(features)
    // let csvContent = 'data:text/csv;charset=utf-8,'

    // features.forEach(function (feature) {
    //   const row = feature.join(',')
    //   csvContent += row + '\r\n'
    // })

    // var encodedUri = encodeURI(csvContent)
    // window.open(encodedUri)
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
          {/* <Button animated='vertical' disabled={selectedFeatureIds.length === 0}>
            <Button.Content hidden>csv</Button.Content>
            <Button.Content visible>
              <Icon name='download' />
            </Button.Content>
          </Button> */}
          <div>
            <Button icon disabled={selectedFeatures.length === 0} onClick={handleExportToCsv} circular color="gray" size='tiny' labelPosition='left'>
              <Icon name='download' />
              Download as csv
            </Button>
            <Popup content='Clear to/from travel lines from map' position='right center' trigger={<Button icon disabled={ matrixLookup.length === 0} onClick={''} circular color="gray" size='tiny'>
              <Icon name='trash alternate outline' />
            </Button>} />
          </div>
        </div>
        <Divider />
      </div>
    </>
  )
}
