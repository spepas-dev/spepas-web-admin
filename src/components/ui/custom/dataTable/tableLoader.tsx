// import React, { useState } from "react";
// import { motion } from "framer-motion";
import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

type TableLoaderProps = {
  rows?: number;
  columns?: number;
};

export const TableLoader = ({ rows = 5, columns = 7 }: TableLoaderProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        {[...Array(columns)].map((_, index) => (
          <TableHead key={index}>
            <Skeleton className="h-4 w-full" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(rows)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(columns)].map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
