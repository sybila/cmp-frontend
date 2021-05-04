import { setIn } from "final-form";
import basic from "./basic";
import * as Yup from "yup";

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

// To be passed to React Final Form
export const validateFormValues = (schema: Yup.AnySchema) => async (values) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};

export default {
  composeValidators,
  basic,
};
