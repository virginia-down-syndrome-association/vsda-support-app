import { Tab } from 'semantic-ui-react'
import AdvocacyCard from '../molecules/AdvocacyCard'
import MedicalCard from '../molecules/MedicalCard'
import EngagementCard from '../molecules/EngagementCard'

import '../style.scss'

const ProfileCard = () => {
  return (
    <div className="tabContent__container">
      <EngagementCard />
    </div>
  )
}

const MedCard = () => {
  return (
    <div className="tabContent__container">
      <MedicalCard />
    </div>
  )
}

const AdvoCard = () => {
  return (
    <div className="tabContent__container">
      <AdvocacyCard />
    </div>
  )
}

const EngageCard = () => {
  return (
    <div className="tabContent__container">
      <EngagementCard />
    </div>
  )
}

export default function TabController () {
  const panes = [
    {
      menuItem: {
        key: 'filters-item',
        content: 'Health',
        icon: 'filter',
        className: 'first-item'
      },
      render: () => MedCard()
    },
    {
      menuItem: {
        key: 'active-queue',
        icon: 'user circle outline',
        content: 'Advocacy'
      },
      render: () => AdvoCard()
    },
    {
      menuItem: {
        key: 'active-queue1',
        icon: 'user circle outline',
        content: 'Engagement'
      },
      render: () => EngageCard()
    }

  ]

  return (
    <Tab
      className='tab__container'
      panes={panes}
    />
  )
}
