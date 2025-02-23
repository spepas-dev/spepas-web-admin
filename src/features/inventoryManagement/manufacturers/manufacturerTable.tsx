import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Manufacturer } from "."

interface ManufacturerTableProps {
  manufacturers: Manufacturer[]
}

export function ManufacturerTable({ manufacturers }: ManufacturerTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manufacturers.map((manufacturer, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700">{manufacturer.name}</TableCell>
              <TableCell className="text-gray-700">{manufacturer.country}</TableCell>
            </TableRow>
          ))}
          {manufacturers.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={2} 
                className="text-center text-gray-500 py-8"
              >
                No manufacturers added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 