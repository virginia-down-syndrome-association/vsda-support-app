import * as React from 'react'
import AppHeader from '@/components/global/organisms/header/AppHeader'
import './Layout.css'

export default function Layout (props) {
  return (
    <React.Fragment>
      <AppHeader className="header" />
      <div className="view__container">
        {props.children}
      </div>
    </React.Fragment>
  )
}
