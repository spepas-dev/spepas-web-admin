import { Document, Image, Page, pdf, StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import React from 'react';

import logoSrc from '@/assets/svgs/blue-guard.svg';

// PDF Styles using StyleSheet API from React PDF with default fonts
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica' // Using default PDF font
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerContent: {
    flex: 1
  },
  logoContainer: {
    width: 120,
    height: 40,
    marginRight: 20
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold', // Using default bold font
    color: '#1f2937',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10
  },
  metadata: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 15
  },
  tableContainer: {
    marginTop: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 25,
    alignItems: 'center'
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d5db',
    minHeight: 30,
    alignItems: 'center'
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: '#1f2937',
    paddingHorizontal: 5,
    paddingVertical: 4
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold', // Using default bold font
    color: '#374151',
    paddingHorizontal: 5,
    paddingVertical: 4
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10
  }
});

// PDF Document Component using proper JSX syntax
const TablePDFDocument: React.FC<{
  headers: string[];
  rows: string[][];
  title: string;
  exportDate: string;
  totalRecords: number;
}> = ({ headers, rows, title, exportDate, totalRecords }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Generated on {exportDate}</Text>
          <Text style={styles.metadata}>
            Total Records: {totalRecords} | Columns: {headers.length}
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logoSrc} />
        </View>
      </View>

      {/* Table Section */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          {headers.map((header, index) => (
            <Text key={index} style={styles.tableHeaderCell}>
              {header}
            </Text>
          ))}
        </View>

        {/* Table Rows */}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            {row.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.tableCell}>
                {cell || '-'}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Footer */}
      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} | Generated by Bluguard AML`}
        fixed
      />
    </Page>
  </Document>
);

// Types for data structure
export type TableData = Record<string, unknown>;

// Export function for PDF generation
export const generatePDF = async (
  headers: string[],
  rows: string[][],
  options?: {
    title?: string;
    filename?: string;
  }
) => {
  try {
    const title = options?.title || 'Data Export';
    const filename = options?.filename || `export_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    const exportDate = format(new Date(), "PPP 'at' p");
    const totalRecords = rows.length;

    // Create PDF document using proper JSX
    const doc = <TablePDFDocument headers={headers} rows={rows} title={title} exportDate={exportDate} totalRecords={totalRecords} />;

    // Generate PDF blob using pdf() function as documented
    const blob = await pdf(doc).toBlob();

    // Download the file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
};
