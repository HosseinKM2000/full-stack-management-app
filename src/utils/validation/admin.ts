import { memberFormValueType, taskFormValueType } from "<store>/types/admin";

export const addTask = (values: taskFormValueType) => {
  const errors: taskFormValueType = {};
  if (values.title?.length === 0) {
    errors.title = "Title is Required !";
  } else if (values.description?.length === 0) {
    errors.description = "Please Enter a Description !";
  } else if (!values.userId) {
    errors.userId = "Please Enter a userId !";
  }
  return errors;
};

export const addMember = (values: memberFormValueType) => {
  const errors: memberFormValueType = {};
  if (values.userName?.length === 0) {
    errors.userName = "User Name is Required !";
  } else if (values.email?.length === 0) {
    errors.email = "Please Enter a Email !";
  } else if (values.password?.length === 0) {
    errors.password = "Please Enter a userId !";
  }
  return errors;
};

export const searchMember = (values: { text: string }) => {
  const errors: { text?: string } = {};
  if (values.text.length === 0) {
    errors.text = "Please enter anything to search !";
  }
  return errors;
};
