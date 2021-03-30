import { ReactionItemPartial } from "models/Model";

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
