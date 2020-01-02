import { schema, normalize } from "normalizr";

export interface ExperimentPartial {
  id: number;
  name: string;
  description: string;
  protocol: string;
  started: Date;
  inserted: Date;
  status: string;
}

export interface Experiment extends ExperimentPartial {
  userId: number;
  experimentsInRelation: any[];
  models: any[];
  bioquantities: any[];
  organism: any[];
  devices: any[];
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
  notes?: ExperimentNote[];
  values?: ExperimentVariableValue[];
}

export type ExperimentVariableValue = {
  id: number;
  time: number;
  value: number;
};

export const experimentNormalize = (experiments: any[]) => {
  const expSchema = new schema.Entity("experiments", undefined, {
    idAttribute: "id"
  });

  let normalized = normalize(
    experiments.map(i => i as ExperimentPartial),
    [expSchema]
  );
  return {
    byId: normalized.entities.experiments,
    all: normalized.result
  };
};
