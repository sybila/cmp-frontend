import React, { useCallback, useMemo } from "react";
import { AnalysisInput as AnalysisInputType } from "models/Analysis";
import { Form, Field, useField } from "react-final-form";
import { Box, Button, Flex, Text } from "rebass/styled-components";
import { Input, Label, Checkbox } from "@rebass/forms";
import * as Yup from "yup";
import { validateFormValues } from "utils/formValidators";

type Props = {
  inputs: AnalysisInputType[];
  onSubmit: (vals: FormValues) => void;
};

type FormValues = Record<string, unknown>;

type AnalysisInputProps = {
  input: AnalysisInputType;
};

const validationFactory = (inputs: AnalysisInputType[]) => {
  return validateFormValues(
    inputs.reduce((schema, { name, type }) => {
      let validationType: string;

      if (type === "int" || type === "float") validationType = "number";
      else if (type === "bool") validationType = "boolean";
      else if (type === "string") validationType = "string";
      else {
        console.error(`Provided analysis input type does not exist: ${type}`);
        return schema;
      }

      return schema.concat(
        Yup.object().shape({ [name]: Yup[validationType]() })
      );
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
          <Checkbox name={name} {...field.input} />
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
          {...field.input}
        />
        {message}
      </Box>
    );
  }

  console.error(`Provided analysis input type does not exist: ${type}`);
  return null;
};

const AnalysisSettings = ({ inputs, onSubmit }: Props) => {
  const validationSchema = useMemo(() => validationFactory(inputs), [inputs]);

  return (
    <Form onSubmit={onSubmit} validate={validationSchema}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {inputs.map((input, i) => (
            <AnalysisInput key={input.key + i} input={input} />
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
