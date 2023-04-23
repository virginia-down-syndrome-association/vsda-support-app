import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import Basemap from '@arcgis/core/Basemap'
import LocalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource'
import Expand from '@arcgis/core/widgets/Expand'
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import Search from '@arcgis/core/widgets/Search'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import LayerList from '@arcgis/core/widgets/LayerList'
import Legend from '@arcgis/core/widgets/Legend'
import Editor from '@arcgis/core/widgets/Editor'
import { MapConfig, agolItemsPublic } from '@/constants/appConfig'
import store from '../store'
import { setMatrixLookup } from '@/store/reducers/filters'
import { setLoadingStatus } from '@/store/reducers/notifications'

const app = {}

export const generateIsochrone = async ({ lat, lng, travelTime, view }) => {
  const response = await fetch('http://localhost:3000/isochrone', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: {
        lat,
        lng
      },
      mode: 'car',
      travelTime
    })
  })
  const data = await response.json()
  return data
}

const generateMatrixFromParticipants = async ({ latitude, longitude }) => {
  const { selectedFeatures, currentFeatures } = store.getState().filters
  const destinations = selectedFeatures.map((id) => {
    const { geometry: { latitude, longitude } } = currentFeatures.find((feature) => feature.attributes.OBJECTID === id)
    return {
      id,
      coords: [longitude, latitude]
    }
  })

  const response = await fetch('http://localhost:3000/matrix', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      origin: [longitude, latitude],
      destinations
    })
  })
  const data = await response.json()
  return data
}

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

export const addContextStates = (map) => {
  const url = agolItemsPublic.rest.states
  const states = new FeatureLayer({
    url,
    definitionExpression: "STATE_ABBR = 'VA'",
    outFields: ['*']
  })

  map.add(states)
}

export async function initMap (config) {
  if (app.map) return
  const map = new Map(config)
  app.map = map // should set in redux instead
  return map
}

const addLayer = (view, { props, popupTemplate }) => {
  const lyr = new FeatureLayer({ ...props })

  const prevLayer = view.map.findLayerById(props.id)
  if (prevLayer) {
    view.map.remove(prevLayer)
  }
  view.map.add(lyr)
  lyr.when((layer) => {
    layer.popupEnabled = true
    layer.popupTemplate = popupTemplate || { title: layer.title, content: 'OBJECTID' } // TODO: popupTemplate from config object
  })
}

export const handleLayerInstantiation = (view, layers) => {
  layers.forEach(layer => {
    addLayer(view, layer)
  })
}

export const addIsochroneLayer = (isochrone) => {
  const { view } = store.getState().map

  const blob = new Blob([JSON.stringify(isochrone)], {
    type: 'application/json'
  })
  // URL reference to the blob
  const url = URL.createObjectURL(blob)
  // create new geojson layer using the blob url
  const layer = new GeoJSONLayer({
    url,
    id: 'isochrone'
  })
  view.map.add(layer, 0)
}

const handleCircleRoutes = (circleRoutes) => {
  const { view } = store.getState().map

  const blob = new Blob([JSON.stringify(circleRoutes)], {
    type: 'application/json'
  })
  // URL reference to the blob
  const url = URL.createObjectURL(blob)
  // create new geojson layer using the blob url
  const layer = new GeoJSONLayer({
    url,
    id: 'circleRoutes'
  })
  view.map.add(layer)
}

const handleMatrixResults = (results) => {
  try {
    const { destinations, circleRoutes } = results
    handleCircleRoutes(circleRoutes)
    store.dispatch(setMatrixLookup(destinations))
  } catch (e) {
    console.error('Error in the Clientside handler for Matrix results', e)
  }
}

const zoomToBBox = (bbox) => {
  const { view } = store.getState().map
  const [xmin, ymin, xmax, ymax] = bbox
  const newExtent = new Extent({
    xmin,
    ymin,
    xmax,
    ymax,
    spatialReference: {
      wkid: 4326
    }
  }).expand(2)

  view.goTo(newExtent, {
    easing: 'ease-in-out',
    duration: 2000
  })
}

export const setBasemapGallery = (view) => {
  const basemapGallery = new BasemapGallery({
    source: new LocalBasemapsSource({
      basemaps: [
        Basemap.fromId('hybrid'),
        Basemap.fromId('topo-vector'),
        Basemap.fromId('gray-vector'),
        Basemap.fromId('streets-vector')
      ]
    }),
    view: view
  })

  const layerListExpand = new Expand({
    content: basemapGallery,
    view,
    group: 'main-widgets'
  })

  view.ui.add(layerListExpand, {
    position: 'top-right',
    index: 1
  })
}

export const addSearch = (view) => {
  const searchActionId = 'route-to-selected-participants'
  const search = new Search({ // Add Search widget
    view,
    index: 0,
    popupTemplate: {
      title: 'Search Results',
      actions: [
        {
          title: 'Calculate distance to selected partipants',
          id: searchActionId,
          className: 'esri-icon-check-mark'
        }
      ]
    }
  })

  const searchExpand = new Expand({
    content: search,
    group: 'layer-list-expand',
    view,
    expandTooltip: 'Layers'
  })
  // Event handler that fires each time an action is clicked.
  view.popup.on('trigger-action', async (event) => {
    // Execute the measureThis() function if the measure-this action is clicked
    if (event.action.id === searchActionId) {
      const { location } = view.popup.viewModel
      try {
        store.dispatch(setLoadingStatus(true))
        const results = await generateMatrixFromParticipants(location)
        handleMatrixResults(results)
        zoomToBBox(results.bbox)
      } catch (e) {
        console.error('Error in the Clientside handler for Matrix results', e)
      } finally {
        store.dispatch(setLoadingStatus(false))
      }
    }
  })

  view.ui.add(searchExpand, 'top-right')
}

export const addLayerList = (view, handler) => {
  const layerList = new LayerList({
    id: 'layer-list',
    view,
    listItemCreatedFunction: handler || null
  })

  const layerListExpand = new Expand({
    content: layerList,
    group: 'layer-list-expand',
    view,
    expandTooltip: 'Layers'
  })

  view.ui.add(layerListExpand, 'top-right')
}

export const addLegend = (view) => {
  const legend = new Legend({
    id: 'layer-legend',
    view
  })

  const legendExpand = new Expand({
    content: legend,
    group: 'legend-expand',
    view,
    expandTooltip: 'Legend'
  })

  view.ui.add(legendExpand, 'top-right')
}

export const addEditorWidget = (view, layerInfos) => {
  const editor = new Editor({
    view,
    layerInfos
  })
  const editorExpand = new Expand({
    content: editor,
    group: 'editor-expand',
    view,
    expandTooltip: 'Editor'
  })

  view.ui.add(editorExpand, 'top-right')
}
