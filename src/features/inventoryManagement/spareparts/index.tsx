import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Wrench, Car, ClipboardList, Package } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { SparePartTable } from "./sparePartTable"
import { SparePartDialog } from "./sparePartDialog"

export interface SparePart {
  name: string
  description: string
  carBrand_ID: string
}

export default function SparePartsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [spareParts, setSpareParts] = useState<SparePart[]>([])

  const handleAddSpareParts = async (newSpareParts: SparePart[]) => {
    // Handle API call here
    console.log(newSpareParts)
    setSpareParts([...spareParts, ...newSpareParts])
    setIsDialogOpen(false)
  }

  const stats = [
    {
      title: "Total Parts",
      value: spareParts.length,
      icon: Wrench,
      description: "Active spare parts in system",
      trend: "+4.3%",
      trendUp: true
    },
    {
      title: "Car Brands",
      value: new Set(spareParts.map(p => p.carBrand_ID)).size,
      icon: Car,
      description: "Compatible car brands",
      trend: "+2.7%",
      trendUp: true
    },
    {
      title: "Categories",
      value: "12",
      icon: ClipboardList,
      description: "Part categories",
      trend: "+1.5%",
      trendUp: true
    },
    {
      title: "In Stock",
      value: "1,234",
      icon: Package,
      description: "Available inventory",
      trend: "-0.8%",
      trendUp: false
    }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">Dashboard</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/inventory" className="hover:text-[#4A36EC]">Inventory</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Spare Parts</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Spare Parts</h1>
          <p className="text-sm text-gray-600">
            Manage spare parts and their specifications
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Spare Part
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
        <SparePartTable spareParts={spareParts} />
      </motion.div>

      <SparePartDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddSpareParts}
      />
    </div>
  )
}
