import { z } from 'zod';

export function createTaskFormSchema(
  memberIds: readonly string[],
  projectIds: readonly string[],
) {
  const optionalDateSchema = z.union([
    z.literal(''),
    z.iso.date(),
  ]);

  return z.object({
    title: z.string().trim().min(1, 'Enter a task name.'),

    assigneeId: z.string().refine(
      value => memberIds.some(
        memberId => memberId === value
      ),
      'Choose a household member.',
    ),

    projectId: z.string().refine(
      value => value === '' || projectIds.some(
        projectId => projectId === value
      ),
      'Choose an available project.',
    ),

    scheduledDate: optionalDateSchema,
    dueDate: optionalDateSchema,
  });
}

export type TaskFormValues =
  z.infer<ReturnType<typeof createTaskFormSchema>>;