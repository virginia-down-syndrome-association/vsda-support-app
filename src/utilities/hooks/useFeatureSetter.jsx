import { watch } from '@arcgis/core/core/reactiveUtils'
import { useSelector } from 'react-redux'
import { setCurrentFeatures } from '@/store/reducers/filters'
import store from '@/store'

const useFeatureSetter = () => {
  const { view } = useSelector((state) => state.map)

  const handleZoomChange = (stationary, view) => {
    console.log('does something')
  }

  const handle = watch(
    () => [view?.zoom, view?.stationary],
    ([zoom, stationary]) => {
      if (stationary) {
        handleZoomChange(stationary, view)
      }
    }
  )

  return () => {
    handle.remove()
  }
}

export default useFeatureSetter
