import { Input } from "@rebass/forms/styled-components";
import { Dataset, InitialValue } from "models/Model";
import { rem } from "polished";
import React, { useEffect, useMemo } from "react";
import { Field, Form, useForm, useFormState } from "react-final-form";
import { Box, Flex, Text } from "rebass";
import styled, { css } from "styled-components/macro";

type Props = {
  selectedDataset: Dataset;
  onChange: (x: Record<string, any>) => void;
};

type SectionProps = {
  name: string;
  values: InitialValue[];
  id: string;
};

const InlineInput = styled(Input)(
  ({ theme }) => css`
  width: auto;
  min-width: ${rem(theme.custom.sizes["size-2"] * 2)};
  display: inline-block;
  border: none;
  border-bottom: 1px solid;
  border-color: ${theme.custom.colors.gray[200]};
  font-size: ${theme.custom.fonts["font-S"]};
  line-height ${rem(theme.custom.sizes["size-2"] * 0.8)};
  padding: ${rem(theme.custom.sizes["size-1"] * 0.25)};
`
);

const ValuesSection = ({ name, id, values }: SectionProps) => {
  return (
    <Box pl={12} mt={12}>
      <Text fontSize={16} sx={{ textTransform: "uppercase" }}>
        {name}
      </Text>
      <Box pl={12}>
        {values.map((item) => (
          <Flex alignItems="center" mb={2}>
            <Text fontSize={14} key={`initial-comp-${item.id}`}>
              <Text as="span" fontWeight="bold">
                {item.alias}
              </Text>{" "}
              ={" "}
            </Text>
            <Field name={`${id}.${item.alias}-${item.id}`}>
              {(props) => <InlineInput {...props.input} type="text" ml={2} />}
            </Field>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

const ChangeHandler = ({
  onChange,
}: {
  onChange?: (vals: Record<string, any>) => void;
}) => {
  const { values, dirty } = useFormState();

  useEffect(() => {
    dirty && onChange && onChange(values);
  }, [values, onChange, dirty]);

  return null;
};

const InitialValues = ({ selectedDataset, onChange }: Props) => {
  const initialValues = useMemo(
    () =>
      selectedDataset
        ? Object.keys(selectedDataset.initialValues).reduce<
            Record<string, number | string | boolean>
          >(
            (acc, key) => ({
              ...acc,
              [key]: selectedDataset.initialValues[key].reduce<
                Record<string, number | string | boolean>
              >(
                (values, val) => ({
                  ...values,
                  [`${val.alias}-${val.id}`]: val.initialValue,
                }),
                {}
              ),
            }),
            {}
          )
        : {},
    [selectedDataset]
  );

  return (
    <Form onSubmit={() => {}} initialValues={initialValues}>
      {(props) => (
        <form>
          <ChangeHandler onChange={onChange} />
          <Text fontWeight="bold" fontSize={18}>
            Initial values
          </Text>
          {Object.keys(selectedDataset.initialValues).map((key) => (
            <ValuesSection
              name={key.toUpperCase()}
              id={key}
              values={selectedDataset.initialValues[key]}
            />
          ))}
        </form>
      )}
    </Form>
  );
};

export default InitialValues;
