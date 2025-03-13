import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Users, UserPlus, UserCheck, ShieldAlert } from "lucide-react"
import { UserDialog } from "./userDialog"
import { UserTable } from "./userTable"
import { Card, CardContent } from "@/components/ui/card"

export interface User {
  email: string
  password: string
  name: string
  phoneNumber: string
  user_type: 'BUYER' | 'SELLER' | 'ADMIN'
}

export default function UsersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const handleAddUsers = async (newUsers: User[]) => {
    // Handle API call here
    console.log(newUsers)
    setUsers([...users, ...newUsers])
    setIsDialogOpen(false)
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      description: "Active users in system",
      trend: "+5.2%",
      trendUp: true
    },
    {
      title: "New Users",
      value: "24",
      icon: UserPlus,
      description: "Users added this month",
      trend: "+2.4%",
      trendUp: true
    },
    {
      title: "Verified Users",
      value: users.filter(u => u.user_type !== 'BUYER').length,
      icon: UserCheck,
      description: "Verified account status",
      trend: "+1.8%",
      trendUp: true
    },
    {
      title: "Admin Users",
      value: users.filter(u => u.user_type === 'ADMIN').length,
      icon: ShieldAlert,
      description: "Users with admin access",
      trend: "+0.5%",
      trendUp: true
    }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">Dashboard</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/access-control" className="hover:text-[#4A36EC]">Access Control</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Users</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Users</h1>
          <p className="text-sm text-gray-600">
            Manage system users and their access levels
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <UserTable users={users} />
      </motion.div>

      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddUsers}
      />
    </div>
  )
}
