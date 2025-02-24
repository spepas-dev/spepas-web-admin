import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Model } from "."

interface ModelTableProps {
  models: Model[]
}

export function ModelTable({ models }: ModelTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Model Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Manufacturer ID</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((model, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700">{model.name}</TableCell>
              <TableCell className="text-gray-700">{model.carBrand_ID}</TableCell>
              <TableCell className="text-gray-700">{model.yearOfMake}</TableCell>
            </TableRow>
          ))}
          {models.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={3} 
                className="text-center text-gray-500 py-8"
              >
                No models added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 