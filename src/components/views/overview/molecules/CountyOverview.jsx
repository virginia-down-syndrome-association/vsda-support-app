import React, { useState, useEffect, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { agolItems } from '@/constants/appConfig'
import 'react-tooltip/dist/react-tooltip.css'
import '../style.scss'
import CountyOverviewLegend from './CountyOverviewLegend'
import { useDispatch } from 'react-redux'
import { setParticipants } from '@/store/reducers/participants'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'

export const serviceAreaColorScale = {
  other: '#cbd5e8',
  vdsa: '#b3e2cd',
  dsanv: '#fdcdac',
  dsanrv: '#fff2ae',
  dsahr: '#f4cae4',
  dsar: '#b3cde3'
}

const useParticipantState = () => {
  const dispatch = useDispatch()
  const [_participants, _setParticipants] = useState([])

  function handleTranslation (participants) {
    return participants.map(({ properties, geometry }) => {
      return {
        name: `${properties.FirstName} ${properties.LastName}`,
        coordinates: geometry.coordinates
      }
    })
  }

  function translateFormat (participants) {
    if (participants) {
      dispatch(setParticipants(participants))
    }

    const recast = handleTranslation(participants)
    _setParticipants(recast)
  }

  return [_participants, translateFormat]
}

export default function CountyOverview (props) {
  const { authentication } = useTokenHelper()
  const [affiliates, setAffiliates] = useState([])
  const [participants, setParticipants] = useParticipantState()

  const geoUrl = 'https://gist.githubusercontent.com/mbostock/7061976/raw/90b132eeb21fc81df9572782cd4e1f8adadb6fe3/va-counties.json'

  const getCountyServiceAreaData = useCallback(async () => {
    const fields = ['service_area', 'GEOID']
    const res = await queryFeatures({
      url: agolItems.rest.counties,
      f: 'json',
      outfields: fields,
      returnGeometry: false,
      authentication
    })
    setAffiliates(res)
  })

  const getParticipantData = useCallback(async () => {
    const fields = ['service_area', 'GEOID']
    const { features } = await queryFeatures({
      url: agolItems.rest.constituents,
      f: 'geojson',
      outfields: fields,
      returnGeometry: true,
      authentication
    })
    setParticipants(features)
  })

  useEffect(() => {
    if (authentication) {
      getCountyServiceAreaData()
      getParticipantData()
    }
  }, [authentication])

  const calculateColor = (serviceArea) => {
    switch (serviceArea) {
    case 'vsda':
      return serviceAreaColorScale.vdsa
    case 'dsanv':
      return serviceAreaColorScale.dsanv
    case 'dsahr':
      return serviceAreaColorScale.dsahr
    case 'dsanrv':
      return serviceAreaColorScale.dsanrv
    case 'dsar':
      return serviceAreaColorScale.dsanrv
    case 'other':
      return serviceAreaColorScale.other
    default:
      return serviceAreaColorScale.other
    }
  }

  return (
    <>
      {affiliates &&
        <div className='countyOverview__container'>
          <ComposableMap projection='geoMercator' projectionConfig={{ center: [-78.6569, 37.4316], scale: 4000 }}>
            <Geographies geography={geoUrl} >
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoid = geo.id
                  try {
                    const { attributes: { service_area: serviceArea } } = affiliates.features.find(f => f.attributes.GEOID === geoid)
                    geo.properties.serviceArea = serviceArea
                    return <Geography
                      key={geo.id}
                      geography={geo}
                      fill={calculateColor(serviceArea)}
                      style={{
                        hover: {
                          fill: 'yellow'
                        },
                        outline: {
                          stroke: 'black'
                        }
                      }}
                    />
                  } catch (e) {
                    // eslint-disable-next-line no-console
                    // console.error(`For GEOID ${geoid}`, e)
                    return <Geography key={geo.id} geography={geo} fill={'#cbd5e8'} />
                  }
                })
              }
            </Geographies>
            {participants.length > 0 && participants.map(participant => (
              <React.Fragment key={participant.name}>
                <Marker key={participant.name} coordinates={participant.coordinates}>
                  <circle r={4} fill="darkestgray" />
                </Marker>
              </React.Fragment>
            ))
            }
          </ComposableMap>
          <CountyOverviewLegend />
        </div>
      }
    </>
  )
}
