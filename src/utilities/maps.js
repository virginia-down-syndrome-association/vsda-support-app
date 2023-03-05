import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import Search from '@arcgis/core/widgets/Search'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import { MapConfig, agolItemsPublic, agolItems } from '@/constants/appConfig'

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

export const addConstituentsLayer = (mapView) => {
  const constituentRenderer = {
    type: 'simple', // autocasts as new SimpleRenderer()
    symbol: {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      size: 10,
      color: 'yellow',
      outline: { // autocasts as new SimpleLineSymbol()
        width: 3,
        color: 'gray'
      }
    }
  }

  const url = agolItems.rest.constituents
  const constituentsLayer = new FeatureLayer({
    url,
    renderer: constituentRenderer
  })
  mapView.map.add(constituentsLayer)
  mapView.whenLayerView(constituentsLayer).then((layerView) => {
    // setConstituentsLayer(layerView)
    console.log('layerview is ready to be set and accessed'')
  })
}

export const addContextStates = (map) => {
  const url = agolItemsPublic.rest.states
  const states = new FeatureLayer({
    url,
    definitionExpression: "STATE_ABBR = 'VA'"
  })

  map.add(states)
}

export async function initMap (config) {
  if (app.map) return
  const map = new Map(config)
  app.map = map // should set in redux instead
  return map
}
