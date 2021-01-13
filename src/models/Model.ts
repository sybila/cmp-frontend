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

export interface EntityPartial {
  id: number;
  name: string;
}

export interface RulePartial {
  id: number;
  equation: string;
}

export interface ModelCompartmentPartial extends EntityPartial {}
export interface ModelCompartment extends ModelCompartmentPartial {
  sbmlId: string;
  sboTerm: string;
  notes: string;
  annotation: string;
  spatialDimensions: number;
  size: number;
  isConstant: number;
}

export interface ModelCompartmentExtended extends ModelCompartment {
  species: SpeciesPartial[];
  reactions: any[]; // TODO: Add interface for Reaction
  rules: RulePartial[];
  unitDefinitions: any[]; // TODO: Add interface for UnitDefinition
}

export interface ReactionItemPartial extends EntityPartial {}
export interface SpeciesPartial extends EntityPartial {}
export interface Species {
  id: number;
  name: string;
  metaId: string;
  sbmlId: string;
  sboTerm: string;
  annotation: string;
  notes: string;
  initialExpression: string;
  hasOnlySubstanceUnits: boolean;
  isConstant: boolean;
  boundaryCondition: string;
  reactionItems: ReactionItemPartial[];
  rules: RulePartial[];
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
