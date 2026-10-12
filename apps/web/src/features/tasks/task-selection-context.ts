import { createContext } from "react";

export type TaskSelectionContextValue = {
  selectedTaskId: string | null;
  selectTask: (taskId: string) => void;
  closeTask: (taskId?: string) => void;
};

export const TaskSelectionContext = createContext<TaskSelectionContextValue>({
  selectedTaskId: null,
  selectTask: () => {},
  closeTask: () => {},
});