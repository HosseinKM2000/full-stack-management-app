"use client";
import { Button } from "<store>/components/ui/button";
import { Field } from "<store>/components/ui/field";
import Auth from "<store>/utils/services/auth";
import { LoginType } from "<store>/utils/types/auth";
import { setSubmittingType } from "<store>/utils/types/global";
import { loginValidation } from "<store>/utils/validation/auth";
import { Input, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

const onSubmit = async (
  values: LoginType,
  { setSubmitting }: { setSubmitting: setSubmittingType }
) => {
  setTimeout(() => {
    setSubmitting(false);
  }, 1000);
  console.log(values);

  const auth = new Auth(values);
  auth.signin().then((response) => {
    if (response) {
      if (response.status && response.status === 201) {
        window.location.href = "http://localhost:3000/";
      } else {
        alert(response);
      }
    } else {
      console.log(response);
    }
  });
};

const Register = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={loginValidation}
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
              Sign in
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default Register;
