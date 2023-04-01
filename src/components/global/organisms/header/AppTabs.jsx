/* Imports */
import * as React from 'react'
import { Menu } from 'semantic-ui-react'
// router
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'

export default function NavTabs () {
  // router
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  /* state */
  // local
  const [activeTab, setActiveTab] = React.useState(path)

  /* methods */
  const handleChange = (event, newValue) => {
    const { name } = newValue
    setActiveTab(name)
    navigate(`/${name}`)
  }

  return (
    <>
      <div className="app-tabs__container">
        <Menu.Item
          name='overview'
          active={activeTab === 'overview'}
          onClick={handleChange}
          color='blue'
        />
        <Menu.Item
          name='plan'
          active={activeTab === 'plan'}
          onClick={handleChange}
          color='blue'
        />
        <Menu.Item
          name='research'
          active={activeTab === 'research'}
          onClick={handleChange}
          color='blue'
        />
        <Menu.Item
          name='manage'
          active={activeTab === 'manage'}
          onClick={handleChange}
          color='blue'
        />
        <Menu.Item
          name='edit'
          active={activeTab === 'edit'}
          onClick={handleChange}
          color='blue'
        />
      </div>
    </>
  )
}
