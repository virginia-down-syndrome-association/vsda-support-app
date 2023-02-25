import * as React from 'react';
import { List } from 'semantic-ui-react'

import '../index.css'

export default function ApplicationOverview(props) {
  return (
    <React.Fragment>
      <List>
        <List.Item>
          <List.Content>
            <List.Description className='list-description'>
              <a>
                <b>Virginia Down Syndrome Association</b>
              </a>{' '}
              is an organization that offers our members lifelong care and support across Virginia including 52 counties and 16 cities,
              stretching from our home base in Richmond to Charlottesville, Williamsburg, Fredericksburg, the Central Shenandoah Valley 
              and all the way down to the Virginia State Border.
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </React.Fragment>
  );
}
