import React from 'react';
import { Grid } from 'semantic-ui-react'

export default function Research(props) {
  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height' columns='two' divided>
          <Grid.Column className="first-col" width="7">
            First Column
          </Grid.Column>
          <Grid.Column className="second-col"width="9">
            Second Column
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
}
