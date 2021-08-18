import InlineInput from "components/InlineInput";
import Message from "components/Message";
import Pager from "components/Pager";
import { ApiStates, useApi } from "hooks/useApi";
import React, { useCallback, useMemo, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Box, Flex, Heading } from "rebass/styled-components";
import { debounce } from "lodash";
import groupsApi from "services/api/groups";
import Group from "./Group";

const GroupsPage = () => {
  const [groups, loadingState] = useApi<any[]>( // TODO: type groups
    useCallback(() => groupsApi.getAllGroups(), [])
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredGroups = useMemo(
    () =>
      groups?.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, groups]
  );

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <section className="section p-b-0">
      <div className="container">
        <Flex mb={6} alignItems="center">
          <Heading fontSize={2} fontWeight="bold">
            Groups
          </Heading>
          <Box sx={{ maxWidth: 200, marginBottom: 1, marginLeft: 4 }}>
            <InlineInput
              placeholder="Search in groups"
              $size="normal"
              $fullWidth
              value={searchQuery}
              onChange={onSearchChange}
            />
          </Box>
        </Flex>
        {filteredGroups && (
          <Pager countOnPage={6}>
            {filteredGroups.map((group) => (
              <Group key={`group-${group.id}`} name={group.name} />
            ))}
          </Pager>
        )}
        {loadingState === ApiStates.REJECTED && (
          <Message type="danger">Failed to load user groups.</Message>
        )}
      </div>
    </section>
  );
};

export default GroupsPage;
