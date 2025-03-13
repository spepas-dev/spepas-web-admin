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
import { Rider } from "."

interface RiderTableProps {
  riders: Rider[]
  onLocationSelect: (location: { lat: number; lng: number }) => void
}

// Mock user data - replace with actual data from your API
const userMap = {
  "8c66228b-9527-490b-a174-b15cb557100b": { name: "John Rider", email: "john@example.com" },
  "9c66228b-9527-490b-a174-b15cb557100c": { name: "Jane Rider", email: "jane@example.com" },
}

export function RiderTable({ riders, onLocationSelect }: RiderTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">License Number</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Rider Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Location</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riders.map((rider, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700 font-medium">
                {rider.licenseNumber}
              </TableCell>
              <TableCell className="text-gray-700">
                {userMap[rider.User_ID as keyof typeof userMap]?.name || 'Unknown User'}
              </TableCell>
              <TableCell className="text-gray-700">
                <Badge variant="secondary">
                  {`${rider.latitude.toFixed(4)}, ${rider.longitude.toFixed(4)}`}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-[#4A36EC]/10"
                  onClick={() => onLocationSelect({
                    lat: rider.latitude,
                    lng: rider.longitude
                  })}
                >
                  <MapPin className="w-4 h-4 mr-2 text-[#4A36EC]" />
                  View on Map
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {riders.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={4} 
                className="text-center text-gray-500 py-8"
              >
                No riders added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 