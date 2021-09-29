import useApi, { ApiStates } from "hooks/useApi";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Field } from "react-final-form";
import { Box, Flex, Heading } from "rebass/styled-components";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import groupsApi from "services/api/groups";
import Modal from "components/Modal";
import Message from "components/Message";
import Pager from "components/Pager";
import Button from "components/primitives/Button";
import InlineInput from "components/InlineInput";
import Input from "components/primitives/Input";
import TextArea from "components/primitives/TextArea";
import Group from "./Group";
import { Label } from "@rebass/forms";
import { validateFormValues } from "utils/formValidators";
import { FormApi } from "final-form";
import UsersPicker from "components/UsersPicker";

const FORM_ADD_GROUP_ID = "add-group-form";

type AddGroupFormValues = {
  name: string;
  description: string;
  users: { value: number; label: string }[];
};

const addFormInitialValues: AddGroupFormValues = {
  name: "",
  description: "",
  users: [],
};

const groupAddValidationSchema = validateFormValues(
  Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    users: Yup.array(),
  })
);

const GroupsPage = () => {
  const [groups, loadingState, refetchGroups] = useApi.useGet<any[]>( // TODO: type groups
    useCallback(() => groupsApi.getAllGroups(), [])
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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

  const onSubmit = useCallback(
    (
      { users, ...rest }: AddGroupFormValues,
      formApi: FormApi<any, AddGroupFormValues>
    ) =>
      groupsApi
        .addGroup({ users: users.map(({ value }) => value), ...rest })
        .then((data) => {
          formApi.reset();
          refetchGroups();
          return data;
        }),
    []
  );
  const [onSubmitCallback, , submitState] = useApi.usePost(onSubmit);

  useEffect(() => {
    if (submitState === ApiStates.FULFILLED) setAddModalOpen(false);
  }, [submitState]);

  const handleDelete = useCallback(
    (id: number) => () =>
      groupsApi
        .deleteGroup(id)
        .then((data) => {
          enqueueSnackbar("Group was successfully deleted.", {
            variant: "success",
          });
          refetchGroups();
          return data;
        })
        .catch((e) => {
          enqueueSnackbar("Failed to delete the group.", { variant: "error" });
          return e;
        }),
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
          <Box ml="auto">
            <Button
              type="button"
              variant="primary"
              $size="normal"
              onClick={() => setAddModalOpen(true)}
            >
              Add Group
            </Button>
          </Box>
        </Flex>
        {filteredGroups && (
          <Pager countOnPage={6}>
            {filteredGroups.map((group) => (
              <Group
                id={group.id}
                key={`group-${group.id}`}
                name={group.name}
                handleDelete={handleDelete(group.id)}
              />
            ))}
          </Pager>
        )}
        {loadingState === ApiStates.REJECTED && (
          <Message type="danger">Failed to load user groups.</Message>
        )}

        <Modal
          title="Add Group"
          isOpen={isAddModalOpen}
          onDismiss={() => setAddModalOpen(false)}
          footer={
            <>
              <Button
                form={FORM_ADD_GROUP_ID}
                type="submit"
                variant="primary"
                $size="normal"
              >
                Submit
              </Button>
            </>
          }
        >
          <Form
            onSubmit={onSubmitCallback}
            validate={groupAddValidationSchema}
            initialValues={addFormInitialValues}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} id={FORM_ADD_GROUP_ID}>
                <Field name="name">
                  {(props) => (
                    <Box mb={16}>
                      <Label htmlFor={props.input.name} mb={10}>
                        Name
                      </Label>
                      <Input type="text" mb={10} $fullWidth {...props.input} />
                    </Box>
                  )}
                </Field>
                <Field name="description">
                  {(props) => (
                    <Box mb={16}>
                      <Label htmlFor={props.input.name} mb={10}>
                        Description
                      </Label>
                      <TextArea mb={10} {...props.input} />
                    </Box>
                  )}
                </Field>
                <Box mb={16}>
                  <Label htmlFor="users" mb={10}>
                    Users
                  </Label>
                  <UsersPicker name="users" />
                </Box>
              </form>
            )}
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default GroupsPage;
