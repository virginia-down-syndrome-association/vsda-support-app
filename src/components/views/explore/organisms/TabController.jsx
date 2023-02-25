import { Icon, Tab } from 'semantic-ui-react'
import ParticipantList from '../molecules/ParticipantList'
import DataFilters from '../molecules/DataFilters'
import '../style.scss'

export default function TabController () {
  const panes = [
    {
      menuItem: {
        key: 'filters-item',
        content: 'Filters',
        className: 'first-item'
      },
      render: () => <DataFilters />
    },
    {
      menuItem: {
        key: 'active-queue',
        content: 'Participant List'
      },
      render: () => <ParticipantList activeView={false} />
    }
  ]

  return (
    <div className='tabContainer__wrapper'>
      <Tab
        className='tab__container'
        menu={{ borderless: true, secondary: true }}
        panes={panes}
      />
      <Icon name='warning circle' />
    </div>
  )
}
