export const MapConfig = {
  extent: {
    xmin: -83.675395,
    xmax: -75.242266,
    ymin: 36.540738,
    ymax: 39.466012
  },
  minZoom: 6,
  viewBounds: {
    xmin: -84.675395,
    xmax: -74.242266,
    ymin: 35.540738,
    ymax: 40.466012
  }
}

export const agolItemsPublic = {
  rest: {
    states: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized_Boundaries/FeatureServer/0'
  }
}

export const agolItems = {
  rest: {
    constituents: 'https://services3.arcgis.com/eyU1lVcSnKSGItET/arcgis/rest/services/constituent/FeatureServer/0',
    counties: 'https://services3.arcgis.com/eyU1lVcSnKSGItET/ArcGIS/rest/services/Virginia_Counties/FeatureServer/0',
    prospects: 'https://services3.arcgis.com/eyU1lVcSnKSGItET/arcgis/rest/services/service_5daa3300ea4c4079b217d0c54716dd84/FeatureServer/0'
  },
  webmaps: {
    plan: null,
    research: {
      id: 'aa52ca4c4b5448699b1f838d58cb20a7'
    },
    manage: {
      id: '2a6fb55037d84b5b8fd0499489e93ebe'
    },
    edit: null
  }
}
