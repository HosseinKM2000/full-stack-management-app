"use client";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "<store>/components/ui/select";
import { memberFormValueType, taskFormValueType } from "<store>/utils/types/admin";
import { setSubmittingType } from "<store>/utils/types/global";
import { addTask } from "<store>/utils/validation/admin";
import {
  Button,
  createListCollection,
  Input,
  Stack,
  StatLabel,
  StatRoot,
  Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import style from "./index.module.css";

const AddTaskForm = () => {
  const [members, setMembers] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/members");
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const data = await response.json();
      const formattedMembers = data.map((member: memberFormValueType) => ({
        label: member.userName,
        value: member.id,
      }));
      setMembers(formattedMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]); // Fallback to an empty list in case of error
    } finally {
      setLoading(false);
    }
  };

  const memberCollection = createListCollection({
    items: members,
  });

  if (loading) {
    return <p>Loading ...</p>;
  }

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
                {errors.userId && touched.userId && errors.userId}
              </StatLabel>
            </StatRoot>
            <SelectRoot
              collection={memberCollection}
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
                {memberCollection.items.map((member) => (
                  <SelectItem item={member} key={member.value}>
                    {member.label}
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
