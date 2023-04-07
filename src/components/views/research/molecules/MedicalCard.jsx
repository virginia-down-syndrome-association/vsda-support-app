import { Accordion, Icon } from 'semantic-ui-react'
import '../style.scss'

export default function MedicalCard () {
  const activeIndex = 0
  const handleClick = () => { }
  return (
    <>
      <div>
        <Accordion styled>
          <Accordion.Title
            active={false}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Hospitals
          </Accordion.Title>
          <Accordion.Content active={false}>
            <p>
              There are many breeds of dogs. Each breed varies in size and
              temperament. Owners often select a breed of dog that they find to be
              compatible with their own lifestyle and desires from a companion.
            </p>
          </Accordion.Content>
          <Accordion.Title
            active={false}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Specialists
          </Accordion.Title>
          <Accordion.Content active={false}>
            <p>
              list of specialists
            </p>
          </Accordion.Content>

        </Accordion>
      </div>
    </>
  )
}
