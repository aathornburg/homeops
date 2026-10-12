import { queryOptions } from '@tanstack/react-query';
import { fetchIncompleteTasks } from './api/mock-task-api';
import { mapTaskApiDtoToTaskModel } from './api/task-api-mapper';

export const incompleteTasksQueryOptions = queryOptions({
  queryKey: ['tasks', 'incomplete'],
  queryFn: async () => {
    const taskDtos = await fetchIncompleteTasks();
    return taskDtos.map(mapTaskApiDtoToTaskModel);
  },
});