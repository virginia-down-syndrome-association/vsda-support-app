import { Item, Icon } from 'semantic-ui-react'
import '../style.scss'

export default function CountyOverviewLegend (props) {
  return (
    <>
      <div className='legend__container'>
        <Item.Group divided>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' className="vsda" /> </Item.Content>
            <Item.Content content='Virginia Down Syndrome Association' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' className="dsanrv" /> </Item.Content>
            <Item.Content content='Down Syndrome Association of New River Valley ' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' className="dsar" /> </Item.Content>
            <Item.Content content='Down Syndrome Association of Roanake ' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' className="dsahr" /> </Item.Content>
            <Item.Content content='Down Syndrome Association of Hampton Roads' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' className="dsanv" /> </Item.Content>
            <Item.Content content='Down Syndrome Association of Northern Virginia' verticalAlign='middle' />
          </Item>
          <Item>
            <Item.Content verticalAlign='middle'> <Icon name='circle' className="other" /> </Item.Content>
            <Item.Content content='Other/Unknown' verticalAlign='middle' />
          </Item>
        </Item.Group>
      </div>

    </>
  )
}
