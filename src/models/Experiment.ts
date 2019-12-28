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
  experimentRelation: any[];
  experimentModels: any[];
  bioQuantities: any[];
  notes: ExperimentNote[];
  variables: ExperimentVariable[];
}

export interface ExperimentNote {
  id: number;
  time: number;
  note: string;
  imgLink: string;
}

export interface ExperimentVariable {
  id: number;
  name: string;
  code: string;
  type: string;
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
