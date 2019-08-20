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
}

export const modelNormalize = (models: any[]) => {
  const modelsSchema = new schema.Entity("models", undefined, {
    idAttribute: "id"
  });

  let normalized = normalize(models.map(i => i as Model), [modelsSchema]);
  return {
    byId: normalized.entities.models,
    all: normalized.result
  };
};
