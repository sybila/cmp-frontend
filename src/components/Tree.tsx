import React, { useCallback, useState, useContext } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled, { css } from "styled-components/macro";
import { rem } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Box, Flex, Text } from "rebass/styled-components";

export type TreeItemBase = {
  id: number;
  caption: string;
  icon?: IconProp;
};
export type TreeItem = {
  children?: TreeItem[];
} & TreeItemBase;

export type TreeProps = {
  data: TreeItem[];
  defaultExpanded?: Set<number>;
};

export type TreeNodeProps = {
  children?: React.ReactNode;
} & TreeItemBase;

type TreeContextType = {
  expanded: Set<number>;
  toggleExpand: (id: number) => void;
};

const TreeContext = React.createContext<TreeContextType>(null);

// const getTreePath = () => {};

const constructBranch = ({ children, ...node }: TreeItem) => {
  return (
    <TreeNode {...node}>
      {children?.map((child) => {
        return constructBranch(child);
      })}
    </TreeNode>
  );
};

const NodeExpand = styled.span(
  ({ theme }) => css`
    width: ${rem(theme.custom.sizes["size-2"])};
  `
);

const TreeNode = ({ caption, icon, children, id }: TreeNodeProps) => {
  const { toggleExpand, expanded } = useContext(TreeContext);
  const isLeaf = !children;
  const isExpanded = expanded.has(id);
  return (
    <Box as="div">
      <Flex as="div" pr={2} pl={isLeaf ? 2 : 4}>
        {!isLeaf && (
          <NodeExpand onClick={() => toggleExpand(id)}>
            <FontAwesomeIcon icon={isExpanded ? faAngleDown : faAngleRight} />
          </NodeExpand>
        )}
        <Text color="text" fontSize={1}>
          {caption}
        </Text>
        {icon && <FontAwesomeIcon icon={icon} />}
      </Flex>
      {isExpanded ? children : null}
    </Box>
  );
};

const Tree = ({ data, defaultExpanded }: TreeProps) => {
  const [expanded, setExpanded] = useState(
    defaultExpanded ? defaultExpanded : new Set<number>()
  );

  const handleToggleExpand = useCallback(
    (id: number) => {
      const cloned = new Set(expanded);
      if (cloned.has(id)) cloned.delete(id);
      else cloned.add(id);
      setExpanded(cloned);
    },
    [expanded]
  );

  return (
    <TreeContext.Provider
      value={{ expanded, toggleExpand: handleToggleExpand }}
    >
      <Box>{data.map((node) => constructBranch(node))}</Box>
    </TreeContext.Provider>
  );
};

export default Tree;
