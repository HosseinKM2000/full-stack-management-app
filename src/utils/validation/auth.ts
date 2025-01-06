import { RegisterType } from "../types/auth";

export const registerValidation = (values: RegisterType) => {
  const errors: RegisterType = {};
  if (values.userName?.length === 0) {
    errors.userName = "username is required !";
  } else if (values.email?.length === 0) {
    errors.email = "email is required !";
  } else if (values.password?.length === 0) {
    errors.password = "password is required !";
  }
  return errors;
};
