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

const AddTaskForm = () => {
  return (
    <Formik
      initialValues={{ title: "", description: "", userId: "" }}
      validate={(values) => {
        const errors: {
          title?: string;
          description?: string;
          userId?: string;
        } = {};
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
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
        console.log(values);
      }}
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

export default AddTaskForm;
