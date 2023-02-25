import * as React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import AppTabs from './AppTabs'
import AppHeaderUser from './AppHeaderUser'
import logo from '@/assets/images/vsda.jpg'
import './AppHeader.css'

export default function AppHeader() {

  return (
    <Menu className="appHeaderMenu" secondary pointing>
      <Menu.Menu position='left'>
        <Menu.Item style={{ paddingLeft: '10px', paddingRight: '0px', alignContent: 'center'}} >
          <Image src={logo} alt='logo' className="appHeaderTabs" size="tiny" />
          <AppTabs  />
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position='right'>
        <Menu.Item>
          <AppHeaderUser />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
