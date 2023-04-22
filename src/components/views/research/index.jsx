import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ResearchSidepane from './organisms/ResearchSidepane'
import { agolItems } from '../../../constants/appConfig'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { setCurrentParticipant, setParticipants } from '@/store/reducers/research'
import store from '@/store'
import { useSelector } from 'react-redux'

const bootResearchData = async (authentication) => {
  try {
    const fields = ['OBJECTID', 'FirstName', 'LastName', 'BirthDate', 'Sex', 'County']
    const { features } = await queryFeatures({
      url: agolItems.rest.constituents,
      f: 'geojson',
      outfields: fields,
      returnGeometry: true,
      authentication
    })
    const formattedFeatures = features.map(({ id, properties, geometry }) => {
      return {
        id,
        FirstName: properties.FirstName,
        LastName: properties.LastName,
        Birthdate: properties.Birthdate,
        Sex: properties.Sex,
        CF_FamilyID: properties.CF_FamilyID,
        ConstituentNumber: properties.ConstituentNumber,
        County: properties.County,
        CreationDate: properties.CreationDate,
        PostalCode: properties.PostalCode,
        coordinates: [geometry.coordinates[1], geometry.coordinates[0]]

      }
    }).sort((a, b) => a.FirstName.localeCompare(b.FirstName))
    store.dispatch(setParticipants(formattedFeatures))
    store.dispatch(setCurrentParticipant(formattedFeatures[0].id))
    // rework into Participant data structure
  } catch (err) {
    console.error(err)
  }
  // get participants
  // get single constituent
  // set booted
}

export default function Research (props) {
  const { view } = useSelector(state => state.map)
  const { currentParticipant } = useSelector(state => state.research)
  const { authentication } = useTokenHelper()
  useEffect(() => {
    if (view?.ready) {
      console.log('MapView is ready within the Research view')
      bootResearchData(authentication)
    }
  }, [view])

  useEffect(() => {
    if (currentParticipant && view?.ready) {
      const { coordinates: [lat, lng] } = currentParticipant
      const options = {
        center: [lng, lat],
        duration: 3500,
        easing: 'ease-in-out',
        scale: 224000
      }
      view.goTo(options)
    }
  }, [currentParticipant, view])

  const mapProps = {
    basemap: 'gray-vector',
    portalItem: {
      id: agolItems.webmaps.research.id
    }
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height' columns='two' divided>
          <Grid.Column className="first-col" width="6">
            <ResearchSidepane />
          </Grid.Column>
          <Grid.Column className="second-col"width="10">
            <MapViewComponent
              mapProps={ mapProps }
              mapViewProps={{}}
              mapConsumer="analysis"
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  )
}
