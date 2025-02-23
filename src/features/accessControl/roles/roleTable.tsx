import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Role } from "."

interface RoleTableProps {
  roles: Role[]
}

export function RoleTable({ roles }: RoleTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Role Name</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Description</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Permissions</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Assigned Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="text-gray-700 font-medium">{role.name}</TableCell>
              <TableCell className="text-gray-700">{role.description}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {role.permissions.map(permission => (
                    <Badge 
                      key={permission}
                      variant="outline" 
                      className="bg-[#4A36EC]/10 text-[#4A36EC] border-0"
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {role.users.map(user => (
                    <Badge 
                      key={user}
                      variant="outline" 
                      className="bg-gray-100 text-gray-700 border-0"
                    >
                      {user}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {roles.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={4} 
                className="text-center text-gray-500 py-8"
              >
                No roles added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 