import { useCallback, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import DataSidepane from './organisms/DataSidepane'
import { constituents } from '../../../constants/layerConfig'
import './style.scss'

const useBaseMapPopup = (view) => {
  view.on('click', (event) => {
    const lat = Math.round(event.mapPoint.latitude * 1000) / 1000
    const lon = Math.round(event.mapPoint.longitude * 1000) / 1000
    view.popup.open({
      title: 'Reverse geocode: [' + lon + ', ' + lat + ']',
      location: event.mapPoint // Set the location of the popup to the clicked location
    })
  })

  return () => {
    view.off('click')
  }
}

export default function Plan (props) {
  const { view } = useSelector(state => state.map)

  // useEffect(() => {
  //   if (view) {

  //     view.on('click', (event) => {
  //       view.hitTest(event).then(function (response) {
  //         if (response.results.length === 1 && response.results[0].layer.type === 'vector-tile') {
  //           view.popup.open({
  //             location: event.mapPoint, // Set the location of the popup to the clicked location
  //             
  //           })
  //         }
  //       })d
  //     })
  //   }
  //   return () => {
  //     // view.off('click')
  //   }
  // }, [view])

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <DataSidepane />
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
            mapProps={{ basemap: 'gray-vector' }}
            mapViewProps={{}}
            mapConsumer="plan"
            layers={[constituents]}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
