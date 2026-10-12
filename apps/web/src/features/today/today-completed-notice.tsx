import { useState } from "react";
import { Button } from "../../shared/ui/button";

type TodayCompletedNoticeProps = {
  taskTitle: string;
  onUndo: () => Promise<void>;
}

export function TodayCompletedNoticeComponent(todayCompletedNoticeProps: TodayCompletedNoticeProps) {
  const [isUndoing, setIsUndoing] = useState(false);
  const [undoError, setUndoError] = useState<string | null>(null);

  async function undoTask() {
    if (isUndoing) {
      return;
    }

    setUndoError(null);
    setIsUndoing(true);

    await todayCompletedNoticeProps.onUndo()
      .catch(() => {
        setUndoError('We\'re having trouble with this right now');
      })
      .finally(() => {
        setIsUndoing(false);
      });
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex flex-col">
        <span className="font-semibold text-(--color-text-primary)">Task completed</span>
        <span>{ todayCompletedNoticeProps.taskTitle }</span>
        {
          undoError ? <span role="alert" className="text-(color:--color-status-danger)">{ undoError }</span> : null
        }
      </div>
      <Button
        disabled={ isUndoing ? true : undefined }
        onClick={ undoTask }
      >
        { isUndoing ? 'Undoing...' : 'Undo' }
      </Button>
    </div>
  );
}