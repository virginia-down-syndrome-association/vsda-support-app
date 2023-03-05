import {
  useState,
  useEffect
} from 'react'

export function useFeatureArray (
  featureLayerId: string,
  mapView: __esri.MapView
): any | undefined | null {
  const [features, setFeatures] = useState<[]>()

  const layerView = mapView.layerViews.find((lv: { layer: { id: string } }) => lv.layer.id === featureLayerId)

  useEffect(() => {
    const handle = layerView.watch('numberOfFeatures', (newValue, oldValue, propertyName, target) => {
      console.log('handled ')
      // Use the queryFeatures method to get an updated array of features
      layerView.queryFeatures().then((result: { features: any }) => {
        const features = result.features
        console.log('features', features)
        setFeatures(features)
      })
    })
    return () => { handle.remove() }
  }, [])

  return features
}
