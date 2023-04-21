import { Checkbox, Divider, Button, Icon, Popup } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { clearMatrixLookup } from '@/store/reducers/filters'

export default function ParticipantListActions ({ onEvent, selectedFeatures, features }) {
  const { matrixLookup } = useSelector(state => state.filters)
  const { view } = useSelector(state => state.map)

  const allSelected = selectedFeatures.length === features.length
  const dispatch = useDispatch()

  const handleClick = () => {
    onEvent({ checked: !allSelected })
  }

  const clearDistanceFilters = () => {
    dispatch(clearMatrixLookup())
    const cr = view.map.findLayerById('circleRoutes')
    if (cr) cr.destroy()
  }

  const handleExportToCsv = () => {
    const selected = features.filter((feature) => selectedFeatures.includes(feature.id))
    const enriched = selected.map((feature) => {
      const travelTime = matrixLookup.filter((item) => item.id === feature.id)
      return {
        ...feature,
        travelTime: (travelTime && travelTime.length > 0) ? travelTime[0].duration : ''
      }
    })

    // Convert data to CSV format
    const headers = Object.keys(enriched[0]).join(',')
    const csv = `${headers}\n${enriched.map(obj => Object.values(obj).join(',')).join('\n')}`

    // Create a blob object from CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

    // Create a link element to trigger download
    const link = document.createElement('a')
    link.setAttribute('href', URL.createObjectURL(blob))
    link.setAttribute('download', 'participants.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
            <Button icon disabled={selectedFeatures.length === 0} onClick={handleExportToCsv} circular size='tiny' labelPosition='left'>
              <Icon name='download' />
              Download as csv
            </Button>
            <Popup content='Clear to/from travel lines from map' position='right center' trigger={<Button icon disabled={ matrixLookup.length === 0} onClick={''} circular size='tiny'>
              <Icon name='trash alternate outline' onClick={clearDistanceFilters} />
            </Button>} />
          </div>
        </div>
        <Divider />
      </div>
    </>
  )
}
