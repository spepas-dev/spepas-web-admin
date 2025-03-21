import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Mechanic } from "."

interface MechanicTableProps {
  mechanics: Mechanic[]
  onLocationSelect: (location: { lat: number; lng: number }) => void
}

// Mock user data - replace with actual data from your API
const userMap = {
  user1: { name: "John Doe", email: "john@example.com" },
  user2: { name: "Jane Smith", email: "jane@example.com" },
}

export function MechanicTable({ mechanics, onLocationSelect }: MechanicTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Shop Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Owner</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Address</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mechanics.map((mechanic, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700 font-medium">
                {mechanic.shop_name}
              </TableCell>
              <TableCell className="text-gray-700">
                {userMap[mechanic.User_ID as keyof typeof userMap]?.name || 'Unknown User'}
              </TableCell>
              <TableCell className="text-gray-700">
                {mechanic.address}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-[#4A36EC]/10"
                  onClick={() => onLocationSelect({
                    lat: mechanic.latitude,
                    lng: mechanic.longitude
                  })}
                >
                  <MapPin className="w-4 h-4 mr-2 text-[#4A36EC]" />
                  View on Map
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {mechanics.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={4} 
                className="text-center text-gray-500 py-8"
              >
                No mechanic shops added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 