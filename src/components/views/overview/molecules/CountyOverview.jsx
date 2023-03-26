import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'

import '../style.scss'

export default function CountyOverview (props) {
  const [data, setData] = useState(null)

  const getCountyServiceAreaData = async () => {
    const fields = ['service_area', 'GEOID']
    const url = 'https://services3.arcgis.com/eyU1lVcSnKSGItET/ArcGIS/rest/services/Virginia_Counties/FeatureServer/0'
    const res = await queryFeatures({
      url,
      f: 'json',
      outfields: fields,
      returnGeometry: false
    })
    setData(res)
  }

  const geoUrl = 'https://gist.githubusercontent.com/mbostock/7061976/raw/90b132eeb21fc81df9572782cd4e1f8adadb6fe3/va-counties.json'
  const config = { center: [-78.6569, 37.4316], scale: 4000 }

  useEffect(() => {
    getCountyServiceAreaData()
  }, [])

  const colorScale = {
    other : '#cbd5e8',
    vdsa: '#b3e2cd',
    dsanv: '#fdcdac',
    dsahr: '#f4cae4',
    ds : '#e6f5c9',
  }

  const calculateColor = (serviceArea) => {
    switch (serviceArea) {
      case 'vsda':
        return colorScale.vdsa
      case 'dsanv':
        return colorScale.dsanv
      case 'dsahr':
        return colorScale.dsahr
      case 'dsar':
        return colorScale.ds
      case 'other':
        return colorScale.other
      default:
        return colorScale.other
    }
  }

  return (
    <>
      { data &&
        <div className='countyOverview__container'>
          <ComposableMap projection='geoMercator' projectionConfig={config}>
            <Geographies geography={geoUrl} >
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoid = geo.id
                  try {
                    const { attributes: { service_area} } = data.features.find(f => f.attributes.GEOID === geoid)
                    geo.properties.serviceArea = service_area
                    return <Geography
                      key={geo.id}
                      geography={geo}
                      fill={calculateColor(service_area)}
                      style={{
                        default: {

                        },
                        hover: {
                          fill: 'red'
                        }
                      }}
                    />
                  } catch (e) {
                    console.error(`For GEOID ${geoid}`, e)
                    return <Geography key={geo.id} geography={geo} fill={'#cbd5e8'} />
                  }
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      }
    </>
  )
}
