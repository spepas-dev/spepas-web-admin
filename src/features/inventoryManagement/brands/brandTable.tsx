import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Brand } from "."

interface BrandTableProps {
  brands: Brand[]
}

export function BrandTable({ brands }: BrandTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Brand Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Manufacturer ID</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700">{brand.name}</TableCell>
              <TableCell className="text-gray-700">{brand.manufacturer_ID}</TableCell>
              <TableCell className="text-gray-700">{brand.type}</TableCell>
            </TableRow>
          ))}
          {brands.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={3} 
                className="text-center text-gray-500 py-8"
              >
                No brands added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 