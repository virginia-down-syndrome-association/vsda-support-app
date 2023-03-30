import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Item, Message } from 'semantic-ui-react'
import { updateConstituentFilter } from '@/utilities/filters'
import CountySelector from '../atoms/CountySelector'
import SexSelector from '../atoms/SexSelector'
import AgeSelector from '../atoms/AgeSelector'
import '../style.scss'

export default function DataFilters (props) {
  // filters should both interact with map AND update local data
  const filters = useSelector(state => state.filters)
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (filters && view) {
      updateConstituentFilter(view)
    }
  }, [filters, view])
  // call updateConstituentFilter when things change

  return (
    <div className='dataFilter__container'>
      <Message info>
        <Message.Header>Use the filters below to find specific results.</Message.Header>
      </Message>
      <Item.Group>
        <Item>
          <Item.Content>
            {/* <Item.Header as='a'>Filter participants by county</Item.Header> */}
            <Item.Meta>Filter participants by county</Item.Meta>
            <Item.Description>
              <CountySelector />
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Meta>Filter participants by sex</Item.Meta>
            <Item.Description>
              <SexSelector />
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            {/* <Item.Header as='a'>Filter participants by age</Item.Header> */}
            <Item.Meta>Filter participants by age</Item.Meta>
            <Item.Description>
              <AgeSelector />
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
}
