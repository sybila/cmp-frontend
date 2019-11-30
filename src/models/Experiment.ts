import { schema, normalize } from "normalizr";

export interface ExperimentPartial {
    id: number,
    name: string,
    description: string,
    protocol: string,
    started: Date,
    inserted: Date,
    status: string
}

export interface Experiment extends ExperimentPartial {
  
}

export const experimentNormalize = (experiments: any[]) => {
  const expSchema = new schema.Entity("experiments", undefined, {
    idAttribute: "id"
  });

  let normalized = normalize(experiments.map(i => i as ExperimentPartial), [expSchema]);
  return {
    byId: normalized.entities.experiments,
    all: normalized.result
  };
};
