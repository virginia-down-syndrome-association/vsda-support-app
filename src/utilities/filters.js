import store from '@/store'
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter.js'
import { setCurrentFeatures } from '@/store/reducers/filters'

function getMonth (date) {
  const month = date.getMonth() + 1
  return month < 10 ? '0' + month : '' + month
}

function calculateBirthDate (age) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const birthYear = currentYear - age
  return `${birthYear}-${getMonth(currentDate)}-${currentDate.getDate()}`
}

export function calculateAgeFromTimestamp (timestamp) {
  const now = new Date()
  const birthdate = new Date(timestamp)
  let age = now.getFullYear() - birthdate.getFullYear()
  const monthDiff = now.getMonth() - birthdate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())) {
    age--
  }
  return age
}

export const makeAgeToDate = (minAge, maxAge) => {
  const minBirthDate = calculateBirthDate(maxAge)
  const maxBirthDate = calculateBirthDate(minAge)
  return {
    minBirthDate,
    maxBirthDate
  }
}
export const updateConstituentFilter = (view) => {
  const { filters: { minAge, maxAge, county, sex } } = store.getState()
  const filterOptions = {
    filters: []
  }
  if (county !== 'all') {
    const countryWhere = `County = '${county}'`
    filterOptions.filters.push({ where: countryWhere })
  }
  if (sex !== 'all') {
    const sexWhere = `Sex = '${sex}'`
    filterOptions.filters.push({ where: sexWhere })
  }
  if (minAge !== 0 || maxAge !== 100) {
    const { minBirthDate, maxBirthDate } = makeAgeToDate(minAge, maxAge)
    // eslint-disable-next-line quotes
    const ageWhere = `(Birthdate >= timestamp '${minBirthDate}' AND Birthdate <= timestamp '${maxBirthDate}')` // TODO use DATE
    filterOptions.filters.push({ where: ageWhere })
  }
  const targetLayerView = view.map.findLayerById('constituents')
  if (targetLayerView) {
    if (filterOptions.filters.length) {
      const where = filterOptions.filters.map(filter => filter.where).join(' AND ')
      view.whenLayerView(targetLayerView).then(async function (layerView) {
        layerView.filter = new FeatureFilter({
          where
        })
        const { features } = await layerView.queryFeatures()
        store.dispatch(setCurrentFeatures(features))
      })
    } else {
      view.whenLayerView(targetLayerView).then(async function (layerView) {
        layerView.filter = new FeatureFilter({
          where: '1=1' // shoud this be null?
        })
        const { features } = await layerView.queryFeatures()
        store.dispatch(setCurrentFeatures(features))
      })
    }
  }
}
