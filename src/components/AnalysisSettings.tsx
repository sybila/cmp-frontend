import React, { useCallback, useMemo } from "react";
import {
  AnalysisInput as AnalysisInputType,
  AnalysisInputGroup,
} from "models/Analysis";
import { Form, Field, useField } from "react-final-form";
import { Box, Button, Flex, Text } from "rebass/styled-components";
import { Label, Checkbox } from "@rebass/forms";
import Input from "components/primitives/Input";
import * as Yup from "yup";
import { validateFormValues } from "utils/formValidators";
import Disclosure from "./Disclosure";

type Props = {
  inputGroups: AnalysisInputGroup[];
  onSubmit: (vals: FormValues) => void;
};

type FormValues = Record<string, unknown>;

type AnalysisInputProps = {
  input: AnalysisInputType;
};

const isNumberType = (type: AnalysisInputType["type"]) => {
  return type === "int" || type === "float";
};

const validationFactory = (inputs: AnalysisInputType[]) => {
  return validateFormValues(
    inputs.reduce((schema, { name, type, unsigned, required }) => {
      let validationType: string;

      if (isNumberType(type)) validationType = "number";
      else if (type === "bool") validationType = "boolean";
      else if (type === "string") validationType = "string";
      else if (type == "ExperimentId") validationType = "number";
      else if (type == "VariableId") validationType = "number";
      else {
        console.error(`Provided analysis input type does not exist: ${type}`);
        return schema;
      }

      let inputSchema: Yup.AnySchema = Yup[validationType]();
      if (isNumberType(type) && unsigned)
        inputSchema = (inputSchema as Yup.NumberSchema).positive();

      if (required) inputSchema = inputSchema.required();

      return schema.concat(Yup.object().shape({ [name]: inputSchema }));
    }, Yup.object().shape({}))
  );
};

const AnalysisInput = ({
  input: { name, description, type },
}: AnalysisInputProps) => {
  const field = useField(name);
  const {
    meta: { error, touched },
  } = field;

  const message = (
    <>
      <Text fontSize={12}>{description}</Text>
      {error && touched && (
        <Text fontSize={12} color="red">
          {error}
        </Text>
      )}
    </>
  );

  if (type === "bool") {
    return (
      <Box mb={16}>
        <Label mb={10}>
          <Checkbox name={name} {...field.input} checked={field.input.value} />
          {name}
        </Label>
        {message}
      </Box>
    );
  }

  if (type === "int" || type === "float" || type === "string") {
    return (
      <Box mb={16}>
        <Label htmlFor={name} mb={10}>
          {name}
        </Label>
        <Input
          type={type === "string" ? "text" : "number"}
          name={name}
          mb={10}
          $fullWidth
          {...field.input}
        />
        {message}
      </Box>
    );
  }

  if (type === "ExperimentId" || type === "VariableId") {
    return (
      <Box mb={16}>
        <Label htmlFor={name} mb={10}>
          {name}
        </Label>
        <Input $fullWidth type="number" name={name} mb={10} {...field.input} />
        {message}
      </Box>
    );
  }

  console.error(`Provided analysis input type does not exist: ${type}`);
  return null;
};

const Group = ({ inputs, expandable, name }: AnalysisInputGroup) => {
  const renderedInputs = inputs.map((input, i) => (
    <AnalysisInput key={input.key + i} input={input} />
  ));

  if (expandable)
    return (
      <Disclosure
        caption={name.toUpperCase()}
        noContent="There are no inputs in this group."
      >
        <Box mt={10}>{renderedInputs}</Box>
      </Disclosure>
    );
  return <Box>{renderedInputs}</Box>;
};

const AnalysisSettings = ({ inputGroups, onSubmit }: Props) => {
  const flattenedInputs = useMemo(
    () =>
      inputGroups.reduce<AnalysisInputType[]>(
        (acc, { inputs }) => [...acc, ...inputs],
        []
      ),
    [inputGroups]
  );

  const initialValues = useMemo(() => {
    return flattenedInputs.reduce<Record<string, string | number | boolean>>(
      (acc, { defaultValue, name }) => ({ ...acc, [name]: defaultValue }),
      {}
    );
  }, [flattenedInputs]);

  const validationSchema = useMemo(
    () => validationFactory(flattenedInputs),
    [flattenedInputs]
  );

  return (
    <Form
      onSubmit={onSubmit}
      validate={validationSchema}
      initialValues={initialValues}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {inputGroups.map(({ name, expandable, inputs }, i) => (
            <Group
              key={name + i}
              inputs={inputs}
              expandable={expandable}
              name={name}
            />
          ))}
          <Flex justifyContent="flex-end">
            <Button type="submit">Execute</Button>
          </Flex>
        </form>
      )}
    </Form>
  );
};

export default AnalysisSettings;
