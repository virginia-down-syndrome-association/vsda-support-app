import {
  useState,
  useEffect,
  useRef,
  useId
} from 'react'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import type FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView'
import type MapView from '@arcgis/core/views/MapView'
import type Map from '@arcgis/core/WebMap'


export type AppFeatureLayerIds = 'explore' | 'analyze'

type FeatureLayerConfig = {
  renderer: __esri.Renderer
  featureLayerId: AppFeatureLayerIds
  url: string
}

// export function useFeatureLayer (
//   config: FeatureLayerConfig,
//   mapView: __esri.MapView
// ): any | undefined | null {
//   const { url, renderer } = config
//   const [featureList, setFeatureList] = useState<[]>()
//   const [layerView, setLayerView] = useState<FeatureLayerView | null>(null)

//   // const layerView = mapView.layerViews.find((lv: { layer: { id: string } }) => lv.layer.id === featureLayerId)

//   const layer = new FeatureLayer({
//     url,
//     renderer
//   })
//   mapView.map.add(layer)
//   void mapView.whenLayerView(layer).then((layerView: FeatureLayerView) => {
//     console.log('layerview is ready to be set and accessed')
//     setLayerView(layerView)
//   })

//   useEffect(() => {
//     if (!layerView) return
//     const handle = layerView.watch('numberOfFeatures', (newValue, oldValue, propertyName, target) => {
//       console.log('numberOfFeatures changed ')
//       // Use the queryFeatures method to get an updated array of features
//       layerView.queryFeatures().then((result: { features: any }) => {
//         const features = result.features
//         console.log('features queried', features)
//         setFeatureList(features)
//       })
//     })
//     return () => { handle.remove() }
//   }, [layerView])

//   return {
//     layer,
//     featureList
//   }
// }

export function useFeatureLayer(
  mapView: MapView | undefined,
  layerParams: ConstructorParameters<typeof FeatureLayer>[0],
  layerId: AppFeatureLayerIds
): FeatureLayer {
  const layer = useRef(new FeatureLayer({ ...layerParams, id: layerId }))

  useEffect(() => {
    if (!mapView) return
    const currentLayer = layer.current
    const prevLayer = mapView.map.findLayerById(layerId)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (prevLayer) {
      mapView.map.remove(prevLayer)
    }
    mapView.map.add(currentLayer)

    return () => {
      mapView.map.remove(currentLayer)
    }
  }, [layerId, layer, mapView])

  return layer.current
}

export const useFeatureLayerView = (
  mapView: MapView | undefined,
  layer: FeatureLayer
) => {
  const [layerView, setLayerView] = useState<FeatureLayerView>()
  const [featureList, setFeatureList] = useState<[]>()

  useEffect(() => {
    if (!layer || !mapView) return;
    mapView.whenLayerView(layer).then((layerView) => {
      setLayerView(layerView);
    })
  }, [layer, mapView])

  useEffect(() => {
    if (!layerView) return
    const handle = layerView.watch('numberOfFeatures', (newValue, oldValue, propertyName, target) => {
      console.log('numberOfFeatures changed ')
      // Use the queryFeatures method to get an updated array of features
      layerView.queryFeatures().then((result: { features: any }) => {
        const features = result.features
        console.log('features queried', features)
        setFeatureList(features)
      })
    })
    return () => { handle.remove() }
  }, [layerView])

  return {
    layerView,
    featureList
  }
}
