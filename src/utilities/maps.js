import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import Search from '@arcgis/core/widgets/Search'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { MapConfig, agolItemsPublic, agolItems } from '@/constants/appConfig'
import {
  useState,
  useEffect,
  useRef,
  useId
} from 'react'

const app = {}

export async function initView(container, map) {
  const config = {
    zoom: 7,
    extent: new Extent(MapConfig.extent),
    constraints: {
      geometry: new Extent(MapConfig.viewBounds),
      minZoom: MapConfig.minZoom
    }
  }

  const view = new MapView({
    ...config,
    map,
    container,
    popup: {
      defaultPopupTemplateEnabled: false,
      dockEnabled: true,
      dockOptions: {
        position: 'bottom-left',
        buttonEnabled: false,
        breakpoint: false
      }
    }
  })
  const toggle = new BasemapToggle({ view, nextBasemap: 'hybrid' })
  view.ui.add(toggle, 'bottom-right')

  const search = new Search({ // Add Search widget
    view
  })
  view.ui.add(search, 'top-right')

  app.view = view

  // app.view.when(() => {
  //   console.log('bookmark example is neat from PS2022 work')
  // })

  return view
}

export const addContextStates = (map) => {
  const url = agolItemsPublic.rest.states
  const states = new FeatureLayer({
    url,
    definitionExpression: "STATE_ABBR = 'VA'"
  })

  map.add(states)
}

export async function initMap(config) {
  if (app.map) return
  const map = new Map(config)
  app.map = map // should set in redux instead
  return map
}



const addLayer = (view, layer) => {
  const { layerId, layerParams } = layer

  const lyr = useRef(new FeatureLayer({ ...layerParams, id: layerId }))

  const prevLayer = view.map.findLayerById(layer.layerId)
  if (prevLayer) {
    view.map.remove(prevLayer)
  }
  view.map.add(lyr)
}

export const handleLayerInstantiation = (view, layers) => {
  layers.forEach(layer => {
    addLayer(view, layer)
  })
}
