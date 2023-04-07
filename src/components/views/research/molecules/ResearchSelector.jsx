import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Search from '@arcgis/core/widgets/Search'
import '../style.scss'

const addParticipantSearch = (view, container) => {
  const layer = view.map.findLayerById('constituents')
  console.log(layer)
  const sources = [{
    layer,
    placeholder: 'Participants',
    maxResults: 5,
    searchFields: ['FirstName', 'LastName'],
    displayField: 'FirstName',
    name: 'This is a name'
  }]

  const search = new Search({
    view,
    container,
    includeDefaultSources: false,
    locationEnabled: false,
    // popupEnabled: true,
    // searchAllEnabled: false,
    suggestionsEnabled: true,
    sources
  })
}

export default function ResearchSidepane(props) {
  const { view } = useSelector(state => state.map)
  const searchContainer = useRef(null)

  useEffect(() => {
    if (view) console.log('timmy jimmy')
    if (view && searchContainer && searchContainer.current) {
      addParticipantSearch(view, searchContainer.current)
    }
  }, [searchContainer, view])

  return (
    <>
      <div className="search__container" ref={searchContainer} />
    </>
  )
}
