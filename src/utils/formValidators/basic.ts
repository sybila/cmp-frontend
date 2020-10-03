const required = (value) => (value ? undefined : "This field is required");

const email = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : "Invalid email";

export default {
  required,
  email,
};
