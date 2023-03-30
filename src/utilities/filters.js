import store from '@/store'
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter.js'
import TimeExtent from '@arcgis/core/TimeExtent'

function getMonth (date) {
  const month = date.getMonth() + 1
  return month < 10 ? '0' + month : '' + month
}

// function calculateBirthDate (age) {
//   const currentDate = new Date()
//   const currentYear = currentDate.getFullYear()
//   const birthYear = currentYear - age
//   return {
//     year: birthYear,
//     month: currentDate.getMonth(),
//     day: currentDate.getDate()
//   }
// }

// export const translateAgeToDate = (minAge, maxAge) => {
//   const { year: minYear, month: minMonth, day: minDay } = calculateBirthDate(maxAge)
//   const { year: maxYear, month: maxMonth, day: maxDay } = calculateBirthDate(minAge)

//   return new TimeExtent({
//     start: new Date(minYear, minMonth, minDay),
//     end: new Date(maxYear, maxMonth, maxDay)
//   })
// }

function calculateBirthDate (age) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const birthYear = currentYear - age
  return `${birthYear}-${getMonth(currentDate)}-${currentDate.getDate()}`
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
    // filterOptions.timeExtent = translateAgeToDate(minAge, maxAge)
    const { minBirthDate, maxBirthDate } = makeAgeToDate(minAge, maxAge)
    // eslint-disable-next-line quotes
    const ageWhere = `(Birthdate >= timestamp '${minBirthDate}' AND Birthdate <= timestamp '${maxBirthDate}')`
    filterOptions.filters.push({ where: ageWhere })
  }
  const targetLayerView = view.map.findLayerById('constituents')
  if (filterOptions.filters.length) {
    const where = filterOptions.filters.map(filter => filter.where).join(' AND ')
    view.whenLayerView(targetLayerView).then(function (layerView) {
      layerView.filter = new FeatureFilter({
        where
      })
    })
  } else {
    view.whenLayerView(targetLayerView).then(function (layerView) {
      layerView.filter = new FeatureFilter({
        where: '1=1' // shoud this be null?
      })
    })
  }
}