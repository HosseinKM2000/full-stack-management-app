"use client";
import { Button } from "<store>/components/ui/button";
import { Field } from "<store>/components/ui/field";
import { RegisterType } from "<store>/utils/types/auth";
import { setSubmittingType } from "<store>/utils/types/global";
import { registerValidation } from "<store>/utils/validation/auth";
import { Input, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

const onSubmit = async (
  values: RegisterType,
  { setSubmitting }: { setSubmitting: setSubmittingType }
) => {
  setTimeout(() => {
    setSubmitting(false);
  }, 1000);
  console.log(values)
//   try {
//     const response = await fetch(``);
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
};

const Register = () => {
  return (
    <Formik
      initialValues={{ userName: "", email: "", password: "" }}
      validate={registerValidation}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        isSubmitting,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Stack
            gap="8"
            mx={"auto"}
            mt={"20"}
            maxW="sm"
            css={{ "--field-label-width": "96px" }}
          >
            {errors.userName && touched.userName && errors.userName}
            <Field orientation="horizontal" label="User Name">
              <Input
                size={"lg"}
                p={"2"}
                placeholder="username"
                flex="1"
                name="userName"
                value={values.userName}
                onChange={handleChange}
              />
            </Field>
            {errors.email && touched.email && errors.email}
            <Field orientation="horizontal" label="Email">
              <Input
                size={"lg"}
                p={"2"}
                placeholder="me@example.com"
                flex="1"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Field>
            {errors.password && touched.password && errors.password}
            <Field orientation="horizontal" label="Password">
              <Input
                size={"lg"}
                p={"2"}
                placeholder="1a*2b$3c4d"
                flex="1"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </Field>
            <Button variant="outline" type="submit" disabled={isSubmitting}>
              Send
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default Register;
