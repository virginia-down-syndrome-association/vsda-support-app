import { Tab } from 'semantic-ui-react'
import ParticipantList from '../molecules/ParticipantList'
import DataFilters from '../molecules/DataFilters'
import '../style.scss'

const getDataFilters = () => {
  return (
    <div className="tabContent__container">
      <DataFilters />
    </div>
  )
}

const getParticipantList = () => {
  return (
    <div className="tabContent__container">
      <ParticipantList activeView={false} />
    </div>
  )
}

export default function TabController () {
  const panes = [
    {
      menuItem: {
        key: 'filters-item',
        content: 'Filters',
        icon: 'filter',
        className: 'first-item'
      },
      render: () => getDataFilters()
    },
    {
      menuItem: {
        key: 'active-queue',
        icon: 'user circle outline',
        content: 'Participant List'
      },
      render: () => getParticipantList()
    }
  ]

  return (
    <Tab
      className='tab__container'
      panes={panes}
    />
  )
}
