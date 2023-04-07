import { Tab } from 'semantic-ui-react'
import '../style.scss'

const MedicalCard = () => {
  return (
    <div className="tabContent__container">
      MedicalCard
    </div>
  )
}

const AdvocacyCard = () => {
  return (
    <div className="tabContent__container">
      Advocacy Card
    </div>
  )
}

const ParticipationCard = () => {
  return (
    <div className="tabContent__container">
      Participation Card
    </div>
  )
}
const ProfileCard = () => {
  return (
    <div className="tabContent__container">
      Profile Card
    </div>
  )
}

export default function TabController () {
  const panes = [
    {
      menuItem: {
        key: 'active-queue1',
        icon: 'user circle outline',
        content: 'Profile'
      },
      render: () => ProfileCard()
    },
    {
      menuItem: {
        key: 'filters-item',
        content: 'Medical',
        icon: 'filter',
        className: 'first-item'
      },
      render: () => MedicalCard()
    },
    {
      menuItem: {
        key: 'active-queue',
        icon: 'user circle outline',
        content: 'Advocacy'
      },
      render: () => AdvocacyCard()
    },
    {
      menuItem: {
        key: 'active-queue1',
        icon: 'user circle outline',
        content: 'Participation'
      },
      render: () => ParticipationCard()
    }

  ]

  return (
    <Tab
      className='tab__container'
      panes={panes}
    />
  )
}
