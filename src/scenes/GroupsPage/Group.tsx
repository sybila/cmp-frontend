import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useContext } from "react";
import { Flex, Text, Button } from "rebass/styled-components";
import { ThemeContext } from "styled-components";
import useApi from "hooks/useApi";
import groupsApi from "services/api/groups";
import { AxiosResponse } from "axios";
import { ApiResponse } from "models/GenericTypes";

type Props = {
  name: string;
  id: number;
  handleDelete: () => Promise<AxiosResponse<ApiResponse<void>>>;
};

const Group = ({ name, handleDelete }: Props) => {
  const theme = useContext(ThemeContext);

  const [deleteGroup] = useApi.useDelete(handleDelete);

  return (
    <Flex className="box" justifyContent="space-between">
      <Text fontWeight="bold">{name}</Text>
      <Flex alignItems="center">
        <Button type="button" variant="icon" onClick={deleteGroup}>
          <FontAwesomeIcon icon={faTrashAlt} color={theme.colors.danger} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Group;
