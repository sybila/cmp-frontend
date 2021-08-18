import InlineInput from "components/InlineInput";
import { Dataset, InitialValue } from "models/Model";
import React, { useEffect, useMemo } from "react";
import { Field, Form, useForm, useFormState } from "react-final-form";
import { Box, Flex, Text } from "rebass";

type Props = {
  selectedDataset: Dataset;
  onChange: (x: Record<string, any>) => void;
};

type SectionProps = {
  name: string;
  values: InitialValue[];
  id: string;
};

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
