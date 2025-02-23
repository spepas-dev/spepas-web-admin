import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Wrench, Users, Hammer, Cog } from "lucide-react"
import { GoroDialog } from "./goroDialog"
import { GoroTable } from "./goroTable"
import { Card, CardContent } from "@/components/ui/card"

export interface Goro {
  User_ID: string
  Specialties: string[][]
}

export default function GorosPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [goros, setGoros] = useState<Goro[]>([])

  const handleAddGoros = async (newGoros: Goro[]) => {
    // Handle API call here
    console.log(newGoros)
    setGoros([...goros, ...newGoros])
    setIsDialogOpen(false)
  }

  const stats = [
    {
      title: "Total goro",
      value: goros.length,
      icon: Wrench,
      description: "Active goro in system",
      trend: "+3.2%",
      trendUp: true
    },
    {
      title: "Specialties",
      value: new Set(goros.flatMap(g => g.Specialties.flat())).size,
      icon: Hammer,
      description: "Different specializations",
      trend: "+2.4%",
      trendUp: true
    },
    {
      title: "Average Skills",
      value: goros.length ? Math.round(goros.reduce((acc, g) => acc + g.Specialties.flat().length, 0) / goros.length) : 0,
      icon: Cog,
      description: "Skills per mechanic",
      trend: "+1.8%",
      trendUp: true
    },
    {
      title: "Pending Approvals",
      value: "5",
      icon: Users,
      description: "goro awaiting approval",
      trend: "+0.9%",
      trendUp: false
    }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">Dashboard</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/user-management" className="hover:text-[#4A36EC]">User Management</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Goro</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Goro</h1>
          <p className="text-sm text-gray-600">
            Manage goro and their specialties
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goro
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
        <GoroTable goros={goros} />
      </motion.div>

      <GoroDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddGoros}
      />
    </div>
  )
}
