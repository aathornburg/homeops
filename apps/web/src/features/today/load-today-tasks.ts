import { fetchIncompleteTasks } from "../tasks/api/mock-task-api";
import { mapTaskApiDtoToTaskModel } from "../tasks/api/task-api-mapper";
import type { TaskApiDto } from "../tasks/api/types";
import type { TaskModel } from "../tasks/types";
import { mapTaskToTodayTaskProjection } from "./task-mapper";
import type { TodayTaskProjection } from "./types";

export async function loadTodayTasks(): Promise<TodayTaskProjection[]> {
  const tasks: TaskApiDto[] = await fetchIncompleteTasks();
  const taskModels: TaskModel[] = tasks.map(mapTaskApiDtoToTaskModel);
  return taskModels.map(mapTaskToTodayTaskProjection);
}