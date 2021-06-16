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
  meta?: any;
  actions?: Array<{ callback: () => void; caption: string }>;
};

export type TreeItem = {
  children?: TreeItem[];
} & TreeItemBase;

export type TreeProps = {
  data: TreeItem[];
  defaultExpanded?: Set<number>;
  onNodeClick?: (id: number, meta: any) => void;
};

export type TreeNodeProps = {
  children?: React.ReactNode;
  depth?: number;
} & TreeItemBase;

type TreeContextType = {
  expanded: Set<number>;
  toggleExpand: (id: number) => void;
  onClick: (id: number, meta: any) => void;
};

const TreeContext = React.createContext<TreeContextType>(null);

const constructBranch = (
  { children, ...node }: TreeItem,
  depth: number = 0
) => {
  return (
    <TreeNode {...node} depth={depth}>
      {children?.length > 0
        ? children?.map((child) => {
            return constructBranch(child, depth + 1);
          })
        : null}
    </TreeNode>
  );
};

const NodeExpand = styled.span(
  ({ theme }) => css`
    width: ${rem(theme.custom.sizes["size-2"])};
  `
);

const TreeNode = ({
  caption,
  icon,
  children,
  id,
  meta,
  actions,
  depth = 0,
}: TreeNodeProps) => {
  const { toggleExpand, expanded, onClick } = useContext(TreeContext);
  const isLeaf = !children;
  const isExpanded = expanded.has(id);
  return (
    <Box as="div" pl={depth === 0 ? 0 : 4}>
      <Flex
        as="div"
        alignItems="center"
        sx={{
          ":hover": {
            backgroundColor: "muted",
          },
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "whiteTer",
        }}
        pr={2}
        height={4}
        py={2}
        pl={!isLeaf ? 2 : 4}
      >
        <Flex
          as="span"
          onClick={() => {
            toggleExpand(id);
          }}
          sx={{ width: "100%" }}
        >
          {!isLeaf && (
            <NodeExpand>
              <FontAwesomeIcon icon={isExpanded ? faAngleDown : faAngleRight} />
            </NodeExpand>
          )}
          {icon && <FontAwesomeIcon icon={icon} />}
          <Text
            color="text"
            fontSize={2}
            onClick={() => {
              onClick && onClick(id, meta);
            }}
            sx={{ cursor: onClick ? "pointer" : "initial", width: "100%" }}
          >
            {caption}
          </Text>
        </Flex>
        {actions && (
          <Box ml="auto">
            {actions.map(({ caption, callback }) => (
              <Text
                fontSize={1}
                key={`actions-caption-${id}-${caption}`}
                color="cyan"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={callback}
              >
                {caption}
              </Text>
            ))}
          </Box>
        )}
      </Flex>
      {isExpanded ? children : null}
    </Box>
  );
};

const Tree = ({ data, defaultExpanded, onNodeClick }: TreeProps) => {
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
      value={{
        expanded,
        toggleExpand: handleToggleExpand,
        onClick: onNodeClick,
      }}
    >
      <Box>{data.map((node) => constructBranch(node))}</Box>
    </TreeContext.Provider>
  );
};

export default Tree;
