import { schema, normalize } from "normalizr";

export interface Model {
  id: number;
  name: string;
  sbmlId: string;
  sboTerm: string;
  notes: string;
  annotation: string;
  userId: number;
  approvedId: number;
  status: string;
  description: string;
}

export interface ModelCompartmentPartial {
  id: number;
  name: string;
}
export interface ModelCompartment extends ModelCompartmentPartial {
  sbmlId: string;
  sboTerm: string;
  notes: string;
  annotation: string;
  spatialDimensions: number;
  size: number;
  isConstant: number;
}

export const modelNormalize = (models: any[]) => {
  const modelsSchema = new schema.Entity("models", undefined, {
    idAttribute: "id",
  });

  let normalized = normalize(
    models.map((i) => i as Model),
    [modelsSchema]
  );
  return {
    byId: normalized.entities.models,
    all: normalized.result,
  };
};
