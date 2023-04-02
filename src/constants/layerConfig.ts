import type SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer'

export type FeatureLayerConfig = {
  props: {
    renderer?: SimpleRenderer
    url: string
    id: string
  }
}

export const prospectiveConstituents: FeatureLayerConfig = {
  props: {
    url: 'https://services3.arcgis.com/eyU1lVcSnKSGItET/arcgis/rest/services/service_5daa3300ea4c4079b217d0c54716dd84/FeatureServer/0',
    id: 'prospectiveConstituents'
  }
}

export const constituents: FeatureLayerConfig = {
  props: {
    renderer: {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: '#FFFF00',
        outline: { // autocasts as new SimpleLineSymbol()
          width: 3,
          color: 'gray'
        }
      }
    },
    url: 'https://services3.arcgis.com/eyU1lVcSnKSGItET/arcgis/rest/services/constituent/FeatureServer/0',
    id: 'constituents',
    outFields: ['*']
  }
  // popupTemplate: {
  //   title: "My Popup Title",
  //   content: "My Popup Content", 
  //   actions: [
  //     {
  //       title: "View Participant Information in the Research view",
  //       id: "my-action",
  //       className: "esri-icon-check-mark",
  //       overwriteActions: true,
  //       execute: function () {
  //         console.log("Action clicked!");
  //       }
  //     }
  //   ]
  // }
}
