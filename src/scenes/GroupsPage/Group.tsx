import React from "react";
import { Box, Text } from "rebass/styled-components";

type Props = {
  name: string;
};

const Group = ({ name }: Props) => {
  return (
    <Box className="box">
      <Text fontWeight="bold">{name}</Text>
    </Box>
  );
};

export default Group;
