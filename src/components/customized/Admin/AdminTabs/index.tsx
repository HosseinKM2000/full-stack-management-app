import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuUser } from "react-icons/lu";
import AddTaskForm from "../AddTaskForm";
import AddMemberForm from "../AddMemberForm";

const AdminTabs = () => {
  return (
    <Tabs.Root
      defaultValue="add-task"
      size={"lg"}
      justify={"center"}
      fitted={true}
    >
      <Tabs.List>
        <Tabs.Trigger value="members">
          <LuUser />
          Members
        </Tabs.Trigger>
        <Tabs.Trigger value="add-task">
          <LuFolder />
          Add Task
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">
        <AddMemberForm />
      </Tabs.Content>
      <Tabs.Content value="add-task">
        <AddTaskForm />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default AdminTabs;
