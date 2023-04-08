import { Statistic } from 'semantic-ui-react'
import '../style.scss'

export default function GeographicStats (props) {
  return (
    <>
      <Statistic className='statistic'>
        <Statistic.Value>2</Statistic.Value>
        <Statistic.Label>External Data Integrations</Statistic.Label>
      </Statistic>
      <Statistic className='statistic'>
        <Statistic.Value>32</Statistic.Value>
        <Statistic.Label>Data layers</Statistic.Label>
      </Statistic>
      <Statistic className='statistic'>
        <Statistic.Value>2</Statistic.Value>
        <Statistic.Label>Platform Administrators</Statistic.Label>
      </Statistic>
    </>
  )
}
