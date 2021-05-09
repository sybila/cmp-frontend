import { Input } from "@rebass/forms";
import { Dataset, InitialValue } from "models/Model";
import React from "react";
import { Form } from "react-final-form";
import { Box, Flex, Text } from "rebass";

type Props = {
  selectedDataset: Dataset;
};

type SectionProps = {
  name: string;
  values: InitialValue[];
};

const ValuesSection = ({ name, values }: SectionProps) => {
  return (
    <Box pl={12} mt={12}>
      <Text fontSize={16} sx={{ textTransform: "uppercase" }}>
        {name}
      </Text>
      <Box pl={12}>
        {values.map((item) => (
          <Flex alignItems="center" justifyContent="space-between" mb={2}>
            <Text fontSize={14} key={`initial-comp-${item.id}`}>
              <Text as="span" fontWeight="bold">
                {item.alias}
              </Text>{" "}
              ={" "}
            </Text>
            <Input
              name={item.alias}
              type="text"
              sx={{ width: "50%", display: "inline-block" }}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

const InitialValues = ({ selectedDataset }: Props) => {
  return (
    <Form onSubmit={() => {}}>
      {(props) => (
        <form>
          <Text fontWeight="bold" fontSize={18}>
            Initial values
          </Text>
          <ValuesSection
            name="Compartments"
            values={selectedDataset.initialValues.compartments}
          />
          <ValuesSection
            name="Species"
            values={selectedDataset.initialValues.species}
          />
          <ValuesSection
            name="Parameters"
            values={selectedDataset.initialValues.parameters}
          />
        </form>
      )}
    </Form>
  );
};

export default InitialValues;
