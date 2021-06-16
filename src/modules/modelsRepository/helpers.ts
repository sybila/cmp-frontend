import { ReactionItemPartial, SpeciesPartial } from "models/Model";
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
        `${
          stoichiometry > 1 ? `\\mathit{${stoichiometry}}` : ""
        }\\mathrm{${alias}}`
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

export const speciesToTreeItem = (
  species: SpeciesPartial,
  parentId: number
): TreeItem => {
  return {
    id: species.id,
    caption: species.name,
    meta: { type: TreeItemComponent.Specie, parentId },
  };
};

export const transformCompartmentToTreeItem = (
  compartment: ModelCompartment
): TreeItem => {
  return {
    id: compartment.id,
    caption: compartment.name,
    children: compartment.species
      ? compartment.species.map((specie) =>
          speciesToTreeItem(specie, compartment.id)
        )
      : [],
    meta: { type: TreeItemComponent.Compartment },
  };
};
