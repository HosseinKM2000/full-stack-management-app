import { formValueType } from "<store>/types/admin";

export const addTask = (values: formValueType) => {
  const errors: formValueType = {};
  if (!values.title) {
    errors.title = "Title is Required !";
  } else if (values.title.length === 0) {
    errors.title = "Please Enter a Title !";
  } else if (!values.description) {
    errors.description = "Please Enter a Description !";
  } else if (values.description.length === 0) {
    errors.description = "Please Enter a Description !";
  } else if (!values.userId) {
    errors.userId = "Please Enter a userId !";
  }
  return errors;
};
