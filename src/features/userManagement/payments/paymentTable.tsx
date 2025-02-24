import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PaymentAccount } from "."

interface PaymentTableProps {
  accounts: PaymentAccount[]
}

// Mock user data - replace with actual data from your API
const userMap = {
  "4298e2e3-4215-4884-9bb1-3fc7d9695e49": { name: "James Baako", email: "james@example.com" },
}

const getModeColor = (mode: string) => {
  const colors = {
    WALLET: 'bg-blue-100 text-blue-800',
    BANK: 'bg-green-100 text-green-800',
    CARD: 'bg-purple-100 text-purple-800',
  }
  return colors[mode as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export function PaymentTable({ accounts }: PaymentTableProps) {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-[#4A36EC] font-semibold">Account Holder</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Account Details</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Provider</TableHead>
            <TableHead className="text-[#4A36EC] font-semibold">Payment Mode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">{account.name}</span>
                  <span className="text-gray-500 text-sm">
                    {userMap[account.User_ID as keyof typeof userMap]?.email || 'Unknown User'}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">
                <div className="flex flex-col">
                  <span className="font-medium">{account.accountNumber}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-gray-100">
                  {account.provider}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getModeColor(account.mode)}>
                  {account.mode}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {accounts.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={4} 
                className="text-center text-gray-500 py-8"
              >
                No payment accounts registered yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 