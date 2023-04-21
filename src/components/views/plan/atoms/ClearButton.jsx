import { Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { resetFilters } from '@/store/reducers/filters'

const useFilterHelper = () => {
  const filters = useSelector(state => state.filters)

  if (filters) {
    const { minAge, maxAge, county, sex } = filters
    return {
      filterSet: !(minAge === 0 && maxAge === 100 && county === 'all' && sex === 'all')
    }
  }
  return {
    filterSet: false
  }
}

export default function ClearButton () {
  const { filterSet } = useFilterHelper()
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(resetFilters())
  }

  return (
    <Button primary circular size="small" disabled={!filterSet} onClick={handleReset}>
        Clear Filters
    </Button>
  )
}
