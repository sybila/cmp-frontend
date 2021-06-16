const required = (value) => (value ? undefined : "This field is required");

const email = (value) =>
  !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? undefined
    : "Invalid email";

const notSameAs = (checkValue: string) => (value: string) =>
  !checkValue || !value || value.toLowerCase() !== checkValue.toLowerCase()
    ? undefined
    : "Value cannot be the same as your current.";

export default {
  required,
  email,
  notSameAs,
};
