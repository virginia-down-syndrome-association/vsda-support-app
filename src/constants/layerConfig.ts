import type SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer'

export type FeatureLayerConfig = {
  renderer: SimpleRenderer
  featureLayerId: string
  url: string
}

export const constituents: FeatureLayerConfig = {
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
  featureLayerId: 'constituents',
  url: 'https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/constituents/FeatureServer/0',
}
