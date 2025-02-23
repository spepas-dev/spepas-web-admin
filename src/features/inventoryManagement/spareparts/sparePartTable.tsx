import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SparePart } from "./index"

interface SparePartTableProps {
  spareParts: SparePart[]
}

export function SparePartTable({ spareParts }: SparePartTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Part Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Description</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Car Brand ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spareParts.map((part, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700">{part.name}</TableCell>
              <TableCell className="text-gray-700">{part.description}</TableCell>
              <TableCell className="text-gray-700">{part.carBrand_ID}</TableCell>
            </TableRow>
          ))}
          {spareParts.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={3} 
                className="text-center text-gray-500 py-8"
              >
                No spare parts added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 