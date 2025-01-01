"use client";
import { memberFormValueType } from "<store>/types/admin";
import { setSubmittingType } from "<store>/types/global";
import { addMember } from "<store>/utils/validation/admin";
import { Button, Input, Stack, StatLabel, StatRoot } from "@chakra-ui/react";
import { Formik } from "formik";
import style from "../AddTaskForm/index.module.css";

const AddMemberForm = () => {
  return (
    <Formik
      initialValues={{ userName: "", email: "", password: "" }}
      validate={addMember}
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
        <form className={style.add_task_form} onSubmit={handleSubmit}>
          <Stack gap="4">
            <StatRoot>
              <StatLabel color={"yellow.400"}>
                {" "}
                {errors.userName && touched.userName && errors.userName}
              </StatLabel>
            </StatRoot>
            <Input
              placeholder="User Name"
              name="userName"
              variant="outline"
              size={"lg"}
              className={style.input_padding}
              value={values.userName}
              onChange={handleChange}
            />
            <StatRoot>
              <StatLabel color={"yellow.400"}>
                {" "}
                {errors.email && touched.email && errors.email}
              </StatLabel>
            </StatRoot>
            <Input
              placeholder="Email"
              name="email"
              variant="outline"
              type="email"
              size={"lg"}
              className={style.input_padding}
              value={values.email}
              onChange={handleChange}
            />

            <StatRoot>
              <StatLabel color={"yellow.400"}>
                {" "}
                {errors.password && touched.password && errors.password}
              </StatLabel>
            </StatRoot>
            <Input
              placeholder="Password"
              name="password"
              variant="outline"
              type="password"
              size={"lg"}
              className={style.input_padding}
              value={values.password}
              onChange={handleChange}
            />
            <Button
              background={"cyan.emphasized"}
              _hover={{ background: "cyan.focusRing" }}
              variant="subtle"
              size={"lg"}
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

const onSubmit = async (
  values: memberFormValueType,
  { setSubmitting }: { setSubmitting: setSubmittingType }
) => {
  setTimeout(() => {
    setSubmitting(false);
  }, 1000);
  console.log(values);

  try {
    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default AddMemberForm;
