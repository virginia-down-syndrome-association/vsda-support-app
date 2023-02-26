import store from '@/store'

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

export const translateAgeToDate = (minAge, maxAge) => {
  const minBirthDate = calculateBirthDate(maxAge)
  const maxBirthDate = calculateBirthDate(minAge)
  return {
    minBirthDate,
    maxBirthDate
  }
}

export const updateConstituentFilter = (layerView) => {
  const { filters: { minAge, maxAge, county, sex } } = store.getState()
  const filters = []
  if (county !== 'all') {
    const countryWhere = `County = '${county}'`
    filters.push({ where: countryWhere })
  }
  if (sex !== 'all') {
    const sexWhere = `Sex = '${sex}'`
    filters.push({ where: sexWhere })
  }
  if (minAge !== 0 || maxAge !== 100) {
    const { minBirthDate, maxBirthDate } = translateAgeToDate(minAge, maxAge)
    // eslint-disable-next-line quotes
    const ageWhere = `(Birthdate >= '${minBirthDate}' AND Birthdate <= '${maxBirthDate}')`
    filters.push({ where: ageWhere })
  }
  if (filters.length) {
    const where = filters.map(filter => filter.where).join(' AND ')
    console.log(where)
    layerView.filter = {
      where
    }
  } else {
    layerView.filter = null
  }
}
