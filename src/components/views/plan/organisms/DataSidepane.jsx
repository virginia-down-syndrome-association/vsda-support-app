
import { Divider } from 'semantic-ui-react'
import TabControllerDisclaimer from '../molecules/DataDisclaimer'
import TabController from './TabController'

import '../style.scss'

export default function DataSidepane (props) {
  return (
    <>
      <div className='sidepaneHeader__container'>
        <h2> View Program Participants across VA </h2>
        <Divider />
      </div>
      <div className='tab__wrapper'>
        <TabControllerDisclaimer />
        <TabController />
      </div>
    </>
  )
}
