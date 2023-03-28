import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { agolItems } from '@/constants/appConfig'
import 'react-tooltip/dist/react-tooltip.css'
import '../style.scss'
import CountyOverviewLegend from './CountyOverviewLegend'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'

export const serviceAreaColorScale = {
  other: '#cbd5e8',
  vdsa: '#b3e2cd',
  dsanv: '#fdcdac',
  dsanrv: '#fff2ae',
  dsahr: '#f4cae4',
  dsar: '#b3cde3'
}

export default function CountyOverview (props) {
  const { authentication }= useTokenHelper()
  const [affiliates, setAffiliates] = useState([])
  const [participants, setParticipants] =
    useState(
      [
        { name: 'Alexandria', coordinates: [-77.0469, 38.8048] },
        { name: 'Arlington', coordinates: [-77.0903, 38.8816] },
        { name: 'Bristol', coordinates: [-82.1887, 36.5951] }
      ]
    )

  const getCountyServiceAreaData = async () => {
    const fields = ['service_area', 'GEOID']
    console.log(authentication)
    const res = await queryFeatures({
      url: agolItems.rest.counties,
      f: 'json',
      outfields: fields,
      returnGeometry: false,
      authentication
    })
    setAffiliates(res)
  }

  const getParticipantData = async () => {
    const fields = ['service_area', 'GEOID']
    console.log(authentication)
    const { features } = await queryFeatures({
      url: agolItems.rest.constituents,
      f: 'json',
      outfields: fields,
      returnGeometry: false,
      authentication
    })
    setParticipants(features)
  }

  const geoUrl = 'https://gist.githubusercontent.com/mbostock/7061976/raw/90b132eeb21fc81df9572782cd4e1f8adadb6fe3/va-counties.json'
  const config = { center: [-78.6569, 37.4316], scale: 4000 }

  useEffect(() => {
    if (authentication) {
      getCountyServiceAreaData()
      // getParticipantData()
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
          <ComposableMap projection='geoMercator' projectionConfig={config}>
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
            {participants.map(participant => (
              <React.Fragment key={participant.name}>
                <Marker key={participant.name} coordinates={participant.coordinates}>
                  <circle r={4} fill="#F53" />
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
