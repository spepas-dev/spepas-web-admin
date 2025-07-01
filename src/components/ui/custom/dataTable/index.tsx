import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
  //   ColumnFiltersState,
  //   SortingState,
  VisibilityState
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
// import { rankItem } from "@tanstack/match-sorter-utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { DataTableToolbar } from './dataTableToolbar';
import { DataTablePagination } from './pagination';

// Define which columns are searchable
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumns?: string[]; // Array of column ids to search
  placeholder?: string; // Custom placeholder for search input
  tableStyle?: string;
  tableHeaderClassName?: string;
  tableHeadClassName?: string;
  tableRowClassName?: string;
  expandable?: boolean; // Whether rows can be expanded
  renderExpandedContent?: (row: Row<TData>) => React.ReactNode; // Function to render expanded content
  loading?: boolean; // Whether the table is in loading state
}

// Fuzzy search filter function
// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value);

//   // Store the ranking info
//   addMeta({ itemRank });

//   // Return if the item should be filtered in/out
//   return itemRank.passed;
// };

// Global filter function that searches across multiple columns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalFilterFn: FilterFn<any> = (row, columnId, value) => {
  const searchableColumns = (columnId as string).split(',');

  // Check if any of the searchable columns contain the search value
  const matches = searchableColumns.some((column) => {
    const cellValue = row.getValue(column);
    if (cellValue == null) {
      return false;
    }

    return String(cellValue).toLowerCase().includes(String(value).toLowerCase());
  });

  return matches;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  placeholder = 'Search all columns...',
  tableStyle = 'border-collapse',
  tableHeaderClassName,
  tableHeadClassName,
  tableRowClassName,
  expandable = false,
  renderExpandedContent,
  loading = false
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});

  // Add expand/collapse column if expandable
  const enhancedColumns = React.useMemo(() => {
    if (!expandable) {
      return columns;
    }

    const expandColumn: ColumnDef<TData, TValue> = {
      id: 'expand',
      header: '',
      cell: ({ row }) => {
        const isExpanded = expandedRows[row.id];
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedRows((prev) => ({
                ...prev,
                [row.id]: !prev[row.id]
              }));
            }}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        );
      },
      size: 40
    };

    return [expandColumn, ...columns];
  }, [columns, expandable, expandedRows]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      //   sorting,
      columnVisibility,
      rowSelection,
      globalFilter // Use globalFilter instead of columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    // onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: globalFilterFn,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  const handleRowClick = (rowId: string) => {
    if (expandable) {
      setExpandedRows((prev) => ({
        ...prev,
        [rowId]: !prev[rowId]
      }));
    }
  };

  return (
    <div className={'space-y-4'}>
      <DataTableToolbar table={table} placeholder={placeholder} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className={cn('overflow-x-auto', tableStyle)}>
        <Table className="border-collapse">
          <TableHeader className={tableHeaderClassName}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={tableHeadClassName}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {enhancedColumns.map((column, columnIndex) => (
                    <TableCell key={`loading-cell-${index}-${columnIndex}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(expandable && 'cursor-pointer hover:bg-muted/50 transition-colors', tableRowClassName)}
                    onClick={() => handleRowClick(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                  {expandable && expandedRows[row.id] && renderExpandedContent && (
                    <TableRow>
                      <TableCell colSpan={enhancedColumns.length} className="p-0">
                        <div className="border-t bg-muted/30 p-4">{renderExpandedContent(row)}</div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={enhancedColumns.length} className="h-24 text-center text-gray-500 py-8">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
