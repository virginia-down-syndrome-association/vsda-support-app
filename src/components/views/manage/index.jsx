import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import { constituents, prospectiveConstituents } from '../../../constants/layerConfig'
import { addEditorWidget } from '@/utilities/maps'
import { useSelector } from 'react-redux'
import './style.scss'

const participantInfos = {
  formTemplate: { // autocasts to FormTemplate
    elements: [{ // autocasts to Field Elements
      type: 'field',
      fieldName: 'CF_FamilyID',
      label: 'Family ID'
    }, {
      type: 'field',
      fieldName: 'ConstituentNumber',
      label: 'Constituent Number'
    }, {
      type: 'field',
      fieldName: 'SpecialInstructions',
      label: 'Special Instructions'
    }, {
      type: 'field',
      fieldName: 'Birthdate',
      label: 'Date of Birth'
    }, {
      type: 'field',
      fieldName: 'Sex',
      label: 'Sex'
    }]
  }
}

const prospectiveParticipantInfos = {
  formTemplate: { // autocasts to FormTemplate
    elements: [{ // autocasts to Field Elements
      type: 'field',
      fieldName: 'name',
      label: 'Name of Submitter'
    }, {
      type: 'field',
      fieldName: 'Description',
      label: 'Description'
    }, {
      type: 'field',
      fieldName: 'relationship',
      label: 'Relationship to Participant'
    }, {
      type: 'field',
      fieldName: 'Status',
      label: 'Status'
    }]
  }
}

const createInfoFactory = (info, layer) => {
  return {
    info,
    ...layer
  }
}

const initManageEditor = (view) => {
  view.map.loadAll().then(() => {
    const layerInfos = []
    view.map.editableLayers.forEach((layer) => {
      switch (layer.parsedUrl) {
      case constituents.props.url:
        layerInfos.push(createInfoFactory(participantInfos, layer))
        break
      case prospectiveConstituents.props.url:
        layerInfos.push(createInfoFactory(prospectiveParticipantInfos, layer))
        break
      }
    })
    addEditorWidget(view, layerInfos)
  })
}

export default function Manage (props) {
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (view?.ready) {
      view.when(function (v) {
        initManageEditor(v)
      })
    }
  }, [view])

  const mapProps = {
    basemap: 'gray-vector',
    portalItem: {
      id: '2a6fb55037d84b5b8fd0499489e93ebe'
    }
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height full-width' columns='two' divided>
          <Grid.Column className='gridColumn' width='5'>
            Sidebar goes here.
          </Grid.Column>
          <Grid.Column className='ManageMap__container' width='11'>
            <MapViewComponent
              isWebMap={true}
              mapProps={mapProps}
              mapViewProps={{}}
              mapConsumer='manage'
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  )
}
