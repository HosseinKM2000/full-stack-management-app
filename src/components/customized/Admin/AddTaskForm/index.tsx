"use client";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "<store>/components/ui/select";
import {
  Button,
  createListCollection,
  Input,
  Stack,
  StatLabel,
  StatRoot,
  Textarea,
} from "@chakra-ui/react";
import style from "./index.module.css";
import { Formik } from "formik";
import { addTask } from "<store>/utils/validation/admin";
import { taskFormValueType } from "<store>/types/admin";
import { setSubmittingType } from "<store>/types/global";

const AddTaskForm = () => {
  return (
    <Formik
      initialValues={{ title: "", description: "", userId: "" }}
      validate={addTask}
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
                {errors.title && touched.title && errors.title}
              </StatLabel>
            </StatRoot>
            <Input
              placeholder="Title"
              name="title"
              variant="outline"
              size={"lg"}
              className={style.input_padding}
              value={values.title}
              onChange={handleChange}
            />

            <StatRoot>
              <StatLabel color={"yellow.400"}>
                {" "}
                {errors.description &&
                  touched.description &&
                  errors.description}
              </StatLabel>
            </StatRoot>
            <Textarea
              placeholder="Description"
              name="description"
              size="lg"
              height="10rem"
              className={style.input_padding}
              style={{ textAlign: "start" }}
              value={values.description}
              onChange={handleChange}
            />
            <StatRoot>
              <StatLabel color={"yellow.400"}>
                {" "}
                {errors.userId && touched.userId && errors.userId}
              </StatLabel>
            </StatRoot>
            <SelectRoot
              collection={frameworks}
              size="lg"
              width="100%"
              name="userId"
              onChange={handleChange}
            >
              <SelectTrigger>
                <SelectValueText
                  placeholder="Select Member"
                  className={style.input_padding}
                />
              </SelectTrigger>
              <SelectContent className={style.input_padding}>
                {frameworks.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Button
              background={"cyan.emphasized"}
              _hover={{ background: "cyan.focusRing" }}
              variant="subtle"
              size={"lg"}
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

const onSubmit = (
  values: taskFormValueType,
  { setSubmitting }: { setSubmitting: setSubmittingType }
) => {
  setTimeout(() => {
    setSubmitting(false);
  }, 1000);
  console.log(values);
};
export default AddTaskForm;
