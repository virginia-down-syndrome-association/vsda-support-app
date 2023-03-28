// import esri = __esri;
// types and variables

// consituent types
export type SexType = 'male' | 'female' | 'all' | 'other'

// prospective consituent types
export type OutreachMethod = 'email' | 'phone'
export type ResidencyStatus = 'va_resident' | 'incoming_resident' | 'potential_resident'
export type Relationships = 'parent' | 'grandparent' | 'sibling' | 'other' | 'extendedFamily' | 'self'
export type InterestLevel = 'yes_vsda' | 'yes_vsda_affliate' | 'no'

type FeatureLayerField = {
  name: string
  alias: string | null
  dataType: string
  domain: string | null
  editable: boolean
  allowNull: boolean
  length: number | null
  default: string | number | null
  numberFormat?: 'numeric' | null
}

type FeatureLayer = {
  url: string
  name: string
  id: number
  schema: FeatureLayerField[]
}

export type {
  FeatureLayer,
  FeatureLayerField
}
