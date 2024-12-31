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
  Textarea,
} from "@chakra-ui/react";
import style from "./index.module.css";

const AddTaskForm = () => {
  return (
    <form className={style.add_task_form}>
      <Stack gap="4">
        <Input
          placeholder="Title"
          variant="outline"
          size={"lg"}
          className={style.input_padding}
        />
        <Textarea
          placeholder="Description"
          size="lg"
          height="10rem"
          className={style.input_padding}
          style={{ textAlign: "start" }}
        />
        <SelectRoot collection={frameworks} size="lg" width="100%">
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
        >
          Add
        </Button>
      </Stack>
    </form>
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
