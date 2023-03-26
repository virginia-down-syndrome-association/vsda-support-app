import { Item, Icon } from 'semantic-ui-react'
import { serviceAreaColorScale } from './CountyOverview'
import '../style.scss'

export default function CountyOverviewLegend (props) {
  return (
    <>
      <div className='legend__container'>
        <Item.Group divided>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' color={serviceAreaColorScale.vdsa} /> </Item.Content>
            <Item.Content content='Virginia Down Syndrome Association' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' color={serviceAreaColorScale.dsanrv} /> </Item.Content>
            <Item.Content content='Down Syndrome Association of New River Valley ' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' color={serviceAreaColorScale.dsar} /> </Item.Content>
            <Item.Content content='Down Syndrome Association of Roanake ' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' color={serviceAreaColorScale.dsahr} /> </Item.Content>
            <Item.Content content='Down Syndrome Association of Hampton Roads' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' color={serviceAreaColorScale.dsanv} /> </Item.Content>
            <Item.Content content='Down Syndrome Association of Northern Virginia' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' color={serviceAreaColorScale.other} /> </Item.Content>
            <Item.Content content='Other/Unknown' verticalAlign='middle' />
          </Item>
        </Item.Group>
      </div>

    </>
  )
}
