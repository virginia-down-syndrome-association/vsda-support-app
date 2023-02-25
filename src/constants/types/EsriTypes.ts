// import esri = __esri;

type FeatureLayerField = {
  name: string,
  alias: string | null
  dataType: string,
  domain: string | null,
  editable: boolean,
  allowNull: boolean,
  length: number | null,
  default: string | number | null,
  numberFormat?: 'numeric' | null,
}

type FeatureLayer = {
  url: string,
  name: string,
  id: number,
  schema: Array<FeatureLayerField>,
}

export type {
  FeatureLayer,
  FeatureLayerField
}