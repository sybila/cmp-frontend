import InlineInput from "components/InlineInput";
import Message from "components/Message";
import Pager from "components/Pager";
import { ApiStates, useApi } from "hooks/useApi";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Box, Flex, Heading } from "rebass/styled-components";
import groupsApi from "services/api/groups";
import Group from "./Group";

const GroupsPage = () => {
  const [groups, loadingState] = useApi<any[]>(
    useCallback(() => groupsApi.getAllGroups(), [])
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
            />
          </Box>
        </Flex>
        {groups && (
          <Pager countOnPage={6}>
            {groups.map((group) => (
              <Group name={group.name} />
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
