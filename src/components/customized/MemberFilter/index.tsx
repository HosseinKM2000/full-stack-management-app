"use client";
import { Field } from "<components>/ui/field";
import { setSubmittingType } from "<store>/types/global";
import { useStore } from "<store>/utils/store";
import { searchMember } from "<store>/utils/validation/admin";
import { Button, Input, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import { RiArrowRightLine } from "react-icons/ri";

const Filter = () => {
  const updateMembers = useStore((state) => state.updateMembers);

  const onSubmit = async (
    values: { text: string },
    { setSubmitting }: { setSubmitting: setSubmittingType }
  ) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
    try {
      const response = await fetch(`/api/members?username=${values.text}`);
      const result = await response.json();
      updateMembers(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ text: "" }}
      validate={searchMember}
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
          <Stack gap="3" maxW="lg">
            <Field orientation="vertical" label="">
              {errors.text && touched.text && errors.text}
              <Input
                placeholder="Value for search !"
                name="text"
                width={"96"}
                padding={"2"}
                value={values.text}
                onChange={handleChange}
              />
            </Field>
            <Button
              type="submit"
              colorPalette="blue"
              variant="outline"
              disabled={isSubmitting}
            >
              Search <RiArrowRightLine />
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default Filter;
