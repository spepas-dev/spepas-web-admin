import { CloudDownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
// import { useTasks } from "../context/tasks-context";

export function DataTableActionButtons() {
  // const { setOpen } = useTasks();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="space-x-1 bg-secondary text-white hover:cursor-not-allowed"
        // onClick={() => setOpen("import")}
        disabled
      >
        <CloudDownloadIcon size={18} /> <span>Export</span>
      </Button>
      {/* <Button className="space-x-1" onClick={() => setOpen("create")}>
        <span>Create</span> <PlusIcon size={18} />
      </Button> */}
    </div>
  );
}
