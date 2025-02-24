import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Factory, Globe, Car, Settings } from "lucide-react"
import { ManufacturerDialog } from "./manufacturerDialog"
import { ManufacturerTable } from "./manufacturerTable"
import { Card, CardContent } from "@/components/ui/card"

export interface Manufacturer {
  name: string
  country: string
}

export default function ManufacturersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])

  const handleAddManufacturers = async (newManufacturers: Manufacturer[]) => {
    // Handle API call here
    console.log(newManufacturers)
    setManufacturers([...manufacturers, ...newManufacturers])
    setIsDialogOpen(false)
  }

  const stats = [
    {
      title: "Total Manufacturers",
      value: manufacturers.length,
      icon: Factory,
      description: "Active manufacturers in the system",
      trend: "+2.5%",
      trendUp: true
    },
    {
      title: "Countries",
      value: new Set(manufacturers.map(m => m.country)).size,
      icon: Globe,
      description: "Countries represented",
      trend: "+1.2%",
      trendUp: true
    },
    {
      title: "Vehicle Models",
      value: "234",
      icon: Car,
      description: "Associated vehicle models",
      trend: "+5.4%",
      trendUp: true
    },
    {
      title: "Parts Categories",
      value: "56",
      icon: Settings,
      description: "Available part categories",
      trend: "+3.1%",
      trendUp: true
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
        <span className="text-[#4A36EC] font-medium">Manufacturers</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Manufacturers</h1>
          <p className="text-sm text-gray-600">
            Manage car manufacturers in the system
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Manufacturer
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
        <ManufacturerTable manufacturers={manufacturers} />
      </motion.div>

      <ManufacturerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddManufacturers}
      />
    </div>
  )
}