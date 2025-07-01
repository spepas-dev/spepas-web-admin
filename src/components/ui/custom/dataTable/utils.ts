import { Column } from '@tanstack/react-table';
import { format } from 'date-fns';

import { generatePDF, type TableData } from './PDF';

// Add export utilities
const downloadFile = (data: string, filename: string, mimeType = 'text/csv;charset=utf-8;') => {
  const blob = new Blob([data], { type: mimeType });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const formatDataForExport = (data: TableData[], columns: Column<any, unknown>[]) => {
  // Filter out system columns and action columns from export
  const exportColumns = columns.filter((col) => {
    const columnId = col.id?.toLowerCase();
    const hasAccessorKey = 'accessorKey' in col.columnDef && col.columnDef.accessorKey;
    return col.id !== 'select' && col.id !== 'expand' && columnId !== 'action' && columnId !== 'actions' && hasAccessorKey;
  });

  // Create headers
  const headers = exportColumns.map((col) => {
    const headerResult = col.columnDef?.header;
    if (typeof headerResult === 'function') {
      try {
        // Create a proper header context
        const headerContext = {
          column: col,
          header: {
            column: col,
            colSpan: 1,
            getContext: () => headerContext
          } as any,
          table: col.table
        };
        const result = headerResult(headerContext);

        // Check if result has props.title structure
        if (result && typeof result === 'object' && 'props' in result) {
          const propsResult = result as { props?: { title?: string } };
          if (propsResult.props?.title) {
            return propsResult.props.title;
          }
        }
        if (typeof result === 'string') {
          return result;
        }
      } catch (e) {
        console.warn('Error processing header function:', e);
      }
    }
    if (typeof headerResult === 'string') {
      return headerResult;
    }

    // Safe access to accessorKey
    const accessorKey = 'accessorKey' in col.columnDef ? col.columnDef.accessorKey : undefined;
    return accessorKey || col.id || '';
  });

  // Format data rows
  const rows = data.map((row) => {
    return exportColumns.map((col) => {
      const accessorKey = 'accessorKey' in col.columnDef ? col.columnDef.accessorKey : undefined;
      if (!accessorKey || typeof accessorKey !== 'string') {
        return '';
      }

      const value = accessorKey.split('.').reduce((obj: Record<string, unknown>, key: string) => {
        return obj?.[key] as Record<string, unknown>;
      }, row);
      return value?.toString() || '';
    });
  });

  return { headers: headers as string[], rows: rows as string[][] };
};

export const exportToExcel = (
  data: TableData[],
  columns: Column<any, unknown>[],
  options?: {
    title?: string;
    filename?: string;
  }
) => {
  const { headers, rows } = formatDataForExport(data, columns);
  const filename = options?.filename || `export_${format(new Date(), 'yyyy-MM-dd')}.xls`;

  // Create a simple Excel-compatible CSV
  const excelContent = [headers.join('\t'), ...rows.map((row) => row.join('\t'))].join('\n');

  downloadFile(excelContent, filename);
};

// PDF export function that uses the generatePDF from PDF.tsx
export const exportToPDF = async (
  data: TableData[],
  columns: Column<any, unknown>[],
  options?: {
    title?: string;
    filename?: string;
  }
) => {
  try {
    const { headers, rows } = formatDataForExport(data, columns);

    await generatePDF(headers, rows, options);
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error(`Failed to generate PDF export: ${error instanceof Error ? error.message : String(error)}`);
  }
};
