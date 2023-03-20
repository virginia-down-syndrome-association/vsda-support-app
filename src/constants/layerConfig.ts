import type SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer'

export type FeatureLayerConfig = {
  props: {
    renderer?: SimpleRenderer
    url: string
    id: string
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
    id: 'constituents'
  }
}
