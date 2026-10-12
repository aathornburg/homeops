import { useIsMutating, useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask, undoCompleteTask } from "./api/mock-task-api";
import { useContext } from "react";
import { TaskSelectionContext } from "./task-selection-context";
import { incompleteTasksQueryOptions } from "./task-queries";
import { notifications } from "@mantine/notifications";
import { TodayCompletedNoticeComponent } from "../today/today-completed-notice";
import { Check } from "lucide-react";

type CompleteTaskInput = {
  taskId: string;
  taskTitle: string;
};

export function useCompleteTask() {
  const { closeTask } = useContext(TaskSelectionContext);
  const queryClient = useQueryClient();

  async function handleUndo(taskId: string, notificationId: string) {
    await undoCompleteTask(taskId);
    notifications.hide(notificationId);

    await queryClient.invalidateQueries({
      queryKey: incompleteTasksQueryOptions.queryKey,
    });
  }

  return useMutation({
    mutationKey: ['tasks', 'complete'],
    mutationFn: ({ taskId }: CompleteTaskInput) =>
      completeTask(taskId),
    onSuccess: (_result, { taskId, taskTitle }) => {
      closeTask(taskId);

      const notificationId = crypto.randomUUID();
      notifications.show({
        id: notificationId,
        message: (
          <TodayCompletedNoticeComponent
            taskTitle={ taskTitle }
            onUndo={ () => handleUndo(taskId, notificationId) }
          />
        ),
        autoClose: false,
        color: 'var(--color-status-success)',
        icon: (
          <Check
            size={18}
            color="var(--color-action-on-primary)"
            aria-hidden="true"
          />
        ),
        radius: 'md',
      });

      return queryClient.invalidateQueries({
        queryKey: incompleteTasksQueryOptions.queryKey,
      });
    }
  });
}

export function useIsCompletingTask(taskId: string | null) {
  // Mutation Key aligns our is mutating check to just 'tasks', 'complete' mutations
  const pendingCount = useIsMutating({
    mutationKey: ['tasks', 'complete'],
    predicate: (mutation) => {
      // Confirms that the taskId for the given mutation matches with what's passed in
      const completeTaskInput = mutation.state.variables as CompleteTaskInput

      return completeTaskInput?.taskId === taskId;
    }
  });

  return pendingCount > 0;
}