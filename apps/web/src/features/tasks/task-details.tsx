import { useContext, useEffect, useState } from "react";
import { TaskSelectionContext } from "./task-selection-context";
import { useQuery } from "@tanstack/react-query";
import { incompleteTasksQueryOptions } from "./task-queries";
import { ClipboardList, UserRound, X } from "lucide-react";
import { formatFullReadableDate } from "../../shared/calendar-date";
import { Button } from "../../shared/ui/button";
import { useCompleteTask, useIsCompletingTask } from "./complete-task";
import { Loader } from "@mantine/core";
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import type { TaskModel } from "./types";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskFormSchema, type TaskFormValues } from "./task-form-schema";
import type { TaskApiDto, UpdateTaskInput } from "./api/types";
import { updateTask } from "./api/mock-task-api";

export function TaskDetails() {
  const { selectedTaskId } = useContext(TaskSelectionContext);

  if (selectedTaskId === null) return null;

  return (
    <SelectedTaskDetails
      key={selectedTaskId}
      selectedTaskId={selectedTaskId}
    />
  );
}

function SelectedTaskDetails({
  selectedTaskId
  }: { selectedTaskId: string }) {
  
  // Hooks
  const tasksQuery = useQuery(incompleteTasksQueryOptions);
  const completion = useCompleteTask();
  const { closeTask } = useContext(TaskSelectionContext);
  const selectedTask = tasksQuery.data?.find((task) => task.taskId === selectedTaskId) ?? null;
  const isCompleting = useIsCompletingTask(selectedTask?.taskId || null);
  const isBlocked = selectedTask?.isBlocked;
  const canComplete = !!selectedTask?.capabilities.canComplete;
  const completable = !isCompleting && canComplete && !isBlocked;
  const [isEditing, setIsEditing] = useState(false);
  
  if (selectedTaskId === null) return null;

  function handleCompleteTask() {
    if (!completable) {
      return;
    }

    completion.mutate({
      taskId: selectedTask.taskId,
      taskTitle: selectedTask.title
    });
  }

  return (
    isEditing
    ? <EditTaskDetailsComponent
        selectedTask={ selectedTask }
        completable={ completable }
        isCompleting={ isCompleting }
        onClose={ () => { closeTask(); } }
        onSave={ (updateTaskInput) => updateTask(updateTaskInput) }
        onView={ () => { setIsEditing(false); } }
      />
    : <ViewTaskDetailsComponent
        selectedTask={ selectedTask }
        completable={ completable }
        isCompleting={ isCompleting }
        completionFailure={ completion.isError && completion.variables?.taskId === selectedTaskId }
        onClose={ () => { closeTask(); } }
        onComplete={ handleCompleteTask }
        onEdit={ () => { setIsEditing(true); } }
     />
  );
}

type ViewTaskDetailsComponentProps = {
  selectedTask: TaskModel | null,
  completable: boolean,
  isCompleting: boolean,
  completionFailure: boolean,
  onClose: () => void,
  onComplete: () => void,
  onEdit: () => void
}

function ViewTaskDetailsComponent({
  selectedTask,
  completable,
  isCompleting,
  completionFailure,
  onClose,
  onComplete,
  onEdit
}: ViewTaskDetailsComponentProps) {
  return (
    <section aria-label="Selected task" className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-(--color-surface) text-left text-(--color-text-secondary)">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-(--color-border-default) px-6 py-2">
        <span className="text-xs text-(--color-text-muted)">Task details</span>
        <button
          type="button"
          onClick={ onClose }
          aria-label="Close task details"
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
        >
          <X size={20} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </div>

      <header className="max-h-[40%] shrink-0 overflow-y-auto border-b border-(--color-border-default) bg-(--color-selected) px-6 py-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold text-(--color-action-primary)">
          <ClipboardList size={15} aria-hidden="true" />
          <span>Viewing task</span>
        </div>
        <h2 className="m-0! font-(family-name:--sans)! text-2xl! leading-snug! font-bold! tracking-[-0.01em] text-(--color-text-primary) wrap-anywhere">
          {selectedTask?.title ?? 'Task details'}
        </h2>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
        {/* Next step: replace these placeholders with the selected task's values. */}
        <div className="pb-4 border-b border-(color:--color-border-default)">
          <Button
            className="text-sm!"
            disabled={ !completable }
            onClick={ onComplete }
            aria-busy={ isCompleting }
          >
            <span className="relative inline-flex items-center justify-center">
              <span className={isCompleting ? "opacity-0" : ""}>
                Mark complete
              </span>

              {isCompleting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Loader
                    aria-hidden="true"
                    color="currentColor"
                    type="dots"
                    size={24}
                    h={12}
                  />
                </span>
              )}
            </span>
          </Button>
          <Button className="text-sm! ml-3" variant="secondary" onClick={ onEdit }>Edit task</Button>
          {
            completionFailure && (
              <p
                role="alert"
                className="mt-3 mb-0 text-sm text-(--color-status-danger)"
              >
                Couldn't complete this task. Try again.
              </p>
            )
          }
        </div>
        <dl className="mt-4 m-0 pb-4 grid grid-cols-2 gap-x-5 gap-y-5 text-sm">
          <div className="min-w-0">
            <dt className="mb-1.5 text-xs text-(--color-text-muted)">Assigned to</dt>
            <dd className="m-0 flex min-h-7 items-center gap-2 text-(--color-text-primary)">
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-(--color-selected) text-(--color-action-primary)">
                <UserRound size={15} aria-hidden="true" />
              </span>
              <span className="wrap-anywhere">{ selectedTask?.assignee.displayName }</span>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-1.5 text-xs text-(--color-text-muted)">Project</dt>
            <dd className="m-0 flex min-h-7 items-center text-(--color-text-primary) wrap-anywhere">{ selectedTask?.project?.title || '—' }</dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-1.5 text-xs text-(--color-text-muted)">Planned for</dt>
            <dd className="m-0 text-(--color-text-primary)">{ selectedTask?.scheduledDate ? formatFullReadableDate(selectedTask?.scheduledDate) : '—' }</dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-1.5 text-xs text-(--color-text-muted)">Due by</dt>
            <dd className="m-0 text-(--color-text-primary)">{ selectedTask?.dueDate ? formatFullReadableDate(selectedTask?.dueDate) : '—' }</dd>
          </div>
        </dl>
        {
          selectedTask?.instructions
          ? (
              <div className="pt-4 text-sm border-t border-(color:--color-border-default)">
                <h3 className="m-0! font-(family-name:--sans)! text-xl! leading-snug! font-bold! tracking-[-0.01em] text-(--color-text-primary) wrap-anywhere">What needs doing</h3>
                <div className="mt-3">
                  {
                    renderToReactElement({
                      extensions: [StarterKit],
                      content: selectedTask.instructions,
                    })
                  }
                </div>
              </div>
            )
          : null
        }
      </div>
    </section>
  );
}

type EditTaskDetailsComponentProps = {
  selectedTask: TaskModel | null,
  completable: boolean,
  isCompleting: boolean,
  onClose: () => void,
  onSave: (input: UpdateTaskInput) => Promise<TaskApiDto>,
  onView: () => void
}

// Temporary
const memberOptions = [
  { householdMemberId: 'member-alex', displayName: 'Alex' },
  { householdMemberId: 'member-jordan', displayName: 'Jordan' },
];

const projectOptions = [
  {
    projectId: 'project-update-kitchen-lighting',
    title: 'Update kitchen lighting',
  },
  {
    projectId: 'project-finish-home-office',
    title: 'Finish home office',
  },
];

function EditTaskDetailsComponent({
  selectedTask,
  onClose,
  onView,
  onSave
}: EditTaskDetailsComponentProps) {
  const [saveError, setSaveError] = useState<string | null>(null);

  const taskFormSchema = createTaskFormSchema(
    memberOptions.map((member) => member.householdMemberId),
    projectOptions.map((project) => project.projectId)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: selectedTask?.title ?? '',
      assigneeId: selectedTask?.assignee.householdMemberId ?? '',
      projectId: selectedTask?.project?.projectId ?? '',
      scheduledDate: selectedTask?.scheduledDate ?? '',
      dueDate: selectedTask?.dueDate ?? '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedTask?.instructions ?? '',
    shouldRerenderOnTransaction: true,
  });

  // Any time editor or isSubmitting changes, update if the editor is editable
  useEffect(() => {
    editor?.setEditable(!isSubmitting, false);
  }, [editor, isSubmitting]);

  async function onValidSubmit(values: TaskFormValues) {
    if (!selectedTask || !editor) return;

    setSaveError(null);

    const input: UpdateTaskInput = {
      taskId: selectedTask.taskId,
      title: values.title,
      assigneeId: values.assigneeId,
      projectId: values.projectId === '' ? null : values.projectId,
      scheduledDate:
        values.scheduledDate === '' ? null : values.scheduledDate,
      dueDate: values.dueDate === '' ? null : values.dueDate,
      instructions: editor.isEmpty ? null : editor.getJSON(),
    };

    try {
      await onSave(input);
    } catch {
      setSaveError("Couldn't save your changes. Try again.");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValidSubmit)}
      aria-labelledby="edit-task-heading"
      aria-busy={isSubmitting}
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-(--color-surface) text-left text-(--color-text-secondary) relative isolate"
    >
      {isSubmitting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-xs">
          <div role="status" className="flex flex-col items-center gap-2">
            <Loader aria-hidden="true" type="dots" />
            <span className="text-sm">Saving changes…</span>
          </div>
        </div>
      )}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-(--color-border-default) px-6 py-2">
        <span className="text-xs text-(--color-text-muted)">Task details</span>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onClose}
          aria-label="Close task details"
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
        >
          <X size={20} strokeWidth={1.7} aria-hidden="true" />
        </button>

      </div>

      <header className="shrink-0 border-b border-(--color-border-default) bg-(--color-selected) px-6 py-5">
        <h2 id="edit-task-heading" className="m-0! font-(family-name:--sans)! text-2xl! leading-snug! font-bold! tracking-[-0.01em] text-(--color-text-primary)">
          Edit task
        </h2>
        <p className="mb-0 mt-2 text-sm leading-relaxed">Keep the details clear for whoever takes this on.</p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
        {/* Presentation scaffold: enable fields when draft state is connected. */}
        <fieldset disabled={isSubmitting} className="m-0 min-w-0 border-0 p-0">
          <legend className="sr-only">Task details</legend>
          <label htmlFor="edit-task-title" className="mb-2 block text-sm font-bold text-(--color-text-primary)">Task name</label>
          <input
            id="edit-task-title"
            type="text"
            {...register('title')}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'edit-task-title-error' : undefined}
            className="min-h-11 w-full rounded-lg border border-(--color-border-default) bg-(--color-surface) px-3 py-2.5 text-base text-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-100"
          />
          {errors.title && (
            <p
              id="edit-task-title-error"
              role="alert"
              className="mt-1 text-sm text-(--color-status-danger)"
            >
              {errors.title.message}
            </p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
            <div className="min-w-0">
              <label htmlFor="edit-task-assignee" className="mb-2 block text-sm font-bold text-(--color-text-primary)">Assigned to</label>
              <select
                id="edit-task-assignee"
                {...register('assigneeId')}
                aria-invalid={Boolean(errors.assigneeId)}
                aria-describedby={errors.assigneeId ? 'edit-task-assignee-error' : undefined}
                className="min-h-11 w-full min-w-0 rounded-lg border border-(--color-border-default) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-100"
              >
                {
                  memberOptions.map((member) => (
                    <option key={member.householdMemberId} value={member.householdMemberId}>{member.displayName}</option>
                  ))
                }
              </select>
              {errors.assigneeId && (
                <p
                  id="edit-task-assignee-error"
                  role="alert"
                  className="mt-1 text-sm text-(--color-status-danger)"
                >
                  {errors.assigneeId.message}
                </p>
              )}
            </div>
            <div className="min-w-0">
              <label htmlFor="edit-task-project" className="mb-2 block text-sm font-bold text-(--color-text-primary)">Project</label>
              <select
                id="edit-task-project"
                {...register('projectId')}
                aria-invalid={Boolean(errors.projectId)}
                aria-describedby={errors.projectId ? 'edit-task-project-error' : undefined}
                className="min-h-11 w-full min-w-0 rounded-lg border border-(--color-border-default) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-100"
              >
                {
                  projectOptions.map((project) => (
                    <option key={project.projectId} value={project.projectId}>{project.title}</option>
                  ))
                }
                <option value="">No project</option>
              </select>
              {errors.projectId && (
                <p
                  id="edit-task-project-error"
                  role="alert"
                  className="mt-1 text-sm text-(--color-status-danger)"
                >
                  {errors.projectId.message}
                </p>
              )}
            </div>
            <div className="min-w-0">
              <label htmlFor="edit-task-planned" className="mb-2 block text-sm font-bold text-(--color-text-primary)">Planned for</label>
              <input
                id="edit-task-planned"
                type="date"
                {...register('scheduledDate')}
                aria-invalid={Boolean(errors.scheduledDate)}
                aria-describedby={errors.scheduledDate ? 'edit-task-scheduled-date-error' : undefined}
                className="min-h-11 w-full min-w-0 rounded-lg border border-(--color-border-default) bg-(--color-surface) px-2 py-2.5 text-sm text-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-100"
              />
              {errors.scheduledDate && (
                <p
                  id="edit-task-scheduled-date-error"
                  role="alert"
                  className="mt-1 text-sm text-(--color-status-danger)"
                >
                  {errors.scheduledDate.message}
                </p>
              )}
            </div>
            <div className="min-w-0">
              <label htmlFor="edit-task-due" className="mb-2 block text-sm font-bold text-(--color-text-primary)">Due by</label>
              <input
                id="edit-task-due"
                type="date"
                {...register('dueDate')}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'edit-task-due-date-error' : undefined}
                className="min-h-11 w-full min-w-0 rounded-lg border border-(--color-border-default) bg-(--color-surface) px-2 py-2.5 text-sm text-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-100"
              />
              {errors.dueDate && (
                <p
                  id="edit-task-due-date-error"
                  role="alert"
                  className="mt-1 text-sm text-(--color-status-danger)"
                >
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <section aria-labelledby="edit-task-instructions" className="mt-7 border-t border-(--color-border-default) pt-6">
          <h3 id="edit-task-instructions" className="m-0! font-(family-name:--sans)! text-base! font-bold! text-(--color-text-primary)">What needs doing</h3>
          <p className="mb-3 mt-1.5 text-sm leading-relaxed">Add helpful details or a short list of steps.</p>
          {/* Replace this preview and toolbar with RichTextEditor when wiring the draft. */}
          <RichTextEditor editor={editor}>
            <fieldset
              disabled={isSubmitting}
              className="m-0 min-w-0 border-0 p-0"
            >
              <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
            </fieldset>

            <RichTextEditor.Content className="rich-text" />
          </RichTextEditor>
        </section>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-(--color-border-default) bg-(--color-surface) px-6 py-4">
        <Button type="button" disabled={isSubmitting} variant="secondary" onClick={onView} className="min-h-11 text-sm!">Cancel</Button>
        {/* Save stays disabled until the update operation is implemented. */}
        <Button type="submit" disabled={isSubmitting} className="min-h-11 text-sm!">Save changes</Button>
        {saveError && <p role="alert">{saveError}</p>}
      </footer>
    </form>
  );
}
