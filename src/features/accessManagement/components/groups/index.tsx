import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Users, Menu, Shield, FolderTree } from "lucide-react"
import { GroupDialog } from "./groupDialog"
import { GroupTable } from "./groupTable"
import { Card, CardContent } from "@/components/ui/card"
// import { MenuItem, MenuGroup } from "../menus"
// import { Permission } from "../permissions"
// import { GroupListItem } from "../../types"

export interface Group {
  id: string
  name: string
  description: string
  users: string[]
  menuGroups: string[]  // MenuGroup IDs
  menuItems: string[]   // MenuItem IDs
  permissions: string[] // Permission IDs
  createdAt: string
  updatedAt: string
}

export default function GroupsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [groups, setGroups] = useState<Group[]>([])

  const handleAddGroup = async (newGroup: Group) => {
    try {
      // Handle API call here
      setGroups([...groups, newGroup])
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Failed to add group:', error)
    }
  }

  const stats = [
    {
      title: "Total Groups",
      value: groups.length,
      icon: Users,
      description: "Active groups",
      trend: "+2.5%",
      trendUp: true
    },
    {
      title: "Menu Access",
      value: new Set(groups.flatMap(g => [...g.menuGroups, ...g.menuItems])).size,
      icon: Menu,
      description: "Assigned menus",
      trend: "+1.8%",
      trendUp: true
    },
    {
      title: "Permissions",
      value: new Set(groups.flatMap(g => g.permissions)).size,
      icon: Shield,
      description: "Total permissions",
      trend: "+3.2%",
      trendUp: true
    },
    {
      title: "Menu Groups",
      value: new Set(groups.flatMap(g => g.menuGroups)).size,
      icon: FolderTree,
      description: "Assigned groups",
      trend: "+1.5%",
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
        <span className="text-[#4A36EC] font-medium">Groups</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Groups</h1>
          <p className="text-sm text-gray-600">
            Manage user groups and their access rights
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Group
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
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

      {/* Group Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <GroupTable groups={groups} />
      </motion.div>

      {/* Add/Edit Dialog */}
      <GroupDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddGroup}
      />
    </div>
  )
} 