import { Table } from '@tanstack/react-table';
// local imports
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { X } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce'; // Create this custom hook

import { DataTableActionButtons } from './dataTableActionButtons';
import { DataTableViewOptions } from './dataTableViewOption';
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({ table, placeholder, globalFilter, setGlobalFilter }: DataTableToolbarProps<TData>) {
  // Debounce the search input to prevent excessive filtering
  const debouncedSearchValue = useDebounce(globalFilter, 300);

  React.useEffect(() => {
    table.setGlobalFilter(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex items-center">
          <Search className="h-5 w-5 absolute left-3 text-gray-400" />
          <motion.input
            type="text"
            placeholder={placeholder}
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            // initial={{ width: "16rem" }} // w-64 = 16rem
            // whileFocus={{ width: "20.8rem" }} // 16rem + 30%
            // transition={{ duration: 0.2 }}
            className="pl-10 pr-4 py-1 bg-gray-100 border rounded-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        {globalFilter && (
          <Button variant="ghost" onClick={() => setGlobalFilter('')} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <DataTableActionButtons />
      </div>
    </div>
  );
}
