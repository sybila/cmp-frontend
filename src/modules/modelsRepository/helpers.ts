import { ReactionItemPartial } from "models/Model";
import { ModelCompartment, Species as SpeciesModel } from "models/Model";
import { TreeItem } from "components/Tree";

export const sortReactionItems = (reactionItems: ReactionItemPartial[]) =>
  reactionItems.reduce<
    [Array<ReactionItemPartial>, Array<ReactionItemPartial>]
  >(
    ([rs, ps], item) => {
      return item.type === "reactant"
        ? [[...rs, item], [...ps]]
        : [[...rs], [...ps, item]];
    },
    [[], []]
  );

export const createEquationSide = (reactionItems: ReactionItemPartial[]) => {
  return reactionItems
    .map(
      ({ alias, stoichiometry }) =>
        `${alias}${stoichiometry > 1 ? `\\times${stoichiometry}` : ""}`
    )
    .join(" + ");
};

export const makeReactionEquation = (
  reactionItems: ReactionItemPartial[],
  isReversible: boolean
): string => {
  const [reactants, products] = sortReactionItems(reactionItems);

  const leftSide = createEquationSide(reactants);
  const rightSide = createEquationSide(products);
  return `${leftSide} ${
    isReversible ? "\\longleftrightarrow" : "\\longrightarrow"
  } ${rightSide}`;
};

export const reactionItemToTreeItem = (item: ReactionItemPartial): TreeItem => {
  return {
    id: item.id,
    caption: item.alias,
  };
};

export enum TreeItemComponent {
  Specie,
  Compartment,
}

export const speciesToTreeItem = (species: SpeciesModel): TreeItem => {
  return {
    id: species.id,
    caption: species.name,
    meta: TreeItemComponent.Specie,
  };
};

export const transformCompartmentToTreeItem = (
  compartment: ModelCompartment,
  species: SpeciesModel[]
): TreeItem => {
  return {
    id: compartment.id,
    caption: compartment.name,
    children: species ? species.map(speciesToTreeItem) : [],
    meta: TreeItemComponent.Compartment,
  };
};
