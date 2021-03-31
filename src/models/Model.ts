import { schema, normalize } from "normalizr";
import { Annotation, Expression } from "./GenericTypes";

export interface Model {
  id: number;
  name: string;
  sbmlId: string;
  sboTerm: string;
  notes: string;
  annotations: Annotation[];
  userId: number;
  approvedId: number;
  status: string;
  description: string;
}

export interface ModelDetail extends Model {
  compartments: ModelCompartmentPartial[];
  constraints: any[]; // TODO: add proper type
  events: any[]; // TODO: add proper type
  functionDefinitions: any[]; // TODO: add proper type
  initialAssignments: any[]; // TODO: add proper type
  parameters: any[]; // TODO: add proper type
  reactions: ReactionItemPartial[];
  rules: RulePartial[];
  unitDefinition: UnitDefinitionPartial[];
}

export interface EntityPartial {
  id: number;
  name: string;
}

export interface RulePartial {
  id: number;
  equation: Expression;
}

export interface ModelCompartmentPartial extends EntityPartial {}
export interface ModelCompartment extends ModelCompartmentPartial {
  sbmlId: string;
  sboTerm: string;
  notes: string;
  annotations: Annotation[];
  spatialDimensions: number;
  size: number;
  alias: string;
  isConstant: number;
  species: SpeciesPartial[];
}

export interface ModelCompartmentExtended extends ModelCompartment {
  species: SpeciesPartial[];
  reactions: ReactionPartial[];
  rules: RulePartial[];
  unitDefinitions: any[]; // TODO: Add interface for UnitDefinition
}

export interface ReactionItemPartial extends EntityPartial {
  alias: string;
  stoichiometry: number;
  type: "reactant" | "product" | "modifier";
}
export interface ReactionItem extends ReactionItemPartial {
  sbmlId: string;
  sboTerm: string;
  notes: string;
  value?: number;
}

export interface ReactionItemExtended extends ReactionItem {
  alias: string;
  annotations: Annotation[];
  reactionId?: number;
  specieId?: number;
  parameterId?: number;
}

export interface ReactionPartial extends EntityPartial {
  sbmlId?: string;
  sboTerm?: string;
  notes?: string;
  ontologyTerm?: string | null;
  isReversible: number;
  rate: Expression;
  reactionItems: ReactionItemPartial[];
}

export interface Reaction extends Omit<ReactionPartial, "expression"> {
  alias?: string;
  annotations: Annotation[];
  modelId: number;
  compartmentId?: number;
  reactionItems: ReactionItemPartial[];
  rate: Expression;
  functions: any[];
  parameters: any[];
}

export interface SpeciesPartial extends EntityPartial {}
export interface UnitDefinitionPartial extends EntityPartial {}
export interface Species extends SpeciesPartial {
  alias: string;
  id: number;
  name: string;
  sboTerm?: string;
  annotations: Annotation[];
  notes?: string;
  initialExpression?: string;
  hasOnlySubstanceUnits: number;
  constant: number;
  boundaryCondition: number;
  reactionItems: { id: number; name: string }[];
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
