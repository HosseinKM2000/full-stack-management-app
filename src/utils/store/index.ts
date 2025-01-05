import { memberFormValueType } from "<store>/utils/types/admin";
import { create } from "zustand";

type State = {
  members: memberFormValueType[];
};

type Action = {
  updateMembers: (members: State["members"]) => void;
};

const useStore = create<State & Action>((set) => ({
  members: [],
  updateMembers: (members: memberFormValueType[]) => set({ members }),
}));

export { useStore };

