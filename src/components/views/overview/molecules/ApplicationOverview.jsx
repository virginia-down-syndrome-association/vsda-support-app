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
                <b>Explore Page</b>
              </a>{' '}
              enables you to see real-time recommendations on where to go and how long it might take.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Description className='list-description'>
              <a>
                <b>Research Page</b>
              </a>{' '}
               provides some fun insights into where we're going and how. 
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </React.Fragment>
  );
}
