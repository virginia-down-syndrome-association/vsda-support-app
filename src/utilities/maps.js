import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import Search from '@arcgis/core/widgets/Search'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { MapConfig } from '@/constants/appConfig'

const app = {}

export async function initView (container, map) {
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

export const addConstituentsLayer = (map, view, setConstituentsLayer) => {
  const url = 'https://services3.arcgis.com/eyU1lVcSnKSGItET/arcgis/rest/services/constituents/FeatureServer/0'
  const constituentsLayer = new FeatureLayer({
    url
  })
  map.add(constituentsLayer)
  view.whenLayerView(constituentsLayer).then((layerView) => {
    setConstituentsLayer(layerView)
  })
}

export const addContextStates = (map) => {
  const states = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized_Boundaries/FeatureServer/0',
    definitionExpression: "STATE_ABBR = 'VA'"
  })

  map.add(states)
}

export async function initMap (config) {
  if (app.map) return
  const map = new Map(config)
  app.map = map // should set in redux instead
  return map
};
