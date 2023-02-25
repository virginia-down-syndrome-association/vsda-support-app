
import { Divider } from 'semantic-ui-react'
import TabControllerDisclaimer from '../molecules/DataDisclaimer'
import TabController from './TabController'

import '../style.scss'

export default function ExploreDataSidepane (props) {
  return (
    <>
      <h2> View Program Participants across VA </h2>
      <Divider />
      <div className='tab__container'>
        <TabControllerDisclaimer />
        <TabController />
      </div>
    </>
  )
}
