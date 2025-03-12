import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Car, Calendar, Factory, Settings } from "lucide-react"
import { ModelDialog } from "./modelDialog"
import { ModelTable } from "./modelTable"
import { Card, CardContent } from "@/components/ui/card"
import { Model } from "../../types"



export default function ModelsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [models, setModels] = useState<Model[]>([])

  const handleAddModels = async (newModels: Model[]) => {
    // Handle API call here
    console.log(newModels)
    setModels([...models, ...newModels])
    setIsDialogOpen(false)
  }

  const stats = [
    {
      title: "Total Models",
      value: models.length,
      icon: Car,
      description: "Active car models in the system",
      trend: "+3.2%",
      trendUp: true
    },
    {
      title: "Latest Year",
      value: models.length > 0 ? Math.max(...models.map(m => m.yearOfMake)) : "-",
      icon: Calendar,
      description: "Most recent model year",
      trend: "+1.5%",
      trendUp: true
    },
    {
      title: "Manufacturers",
      value: new Set(models.map(m => m.carBrand_ID)).size,
      icon: Factory,
      description: "Associated manufacturers",
      trend: "+2.8%",
      trendUp: true
    },
    {
      title: "Parts Categories",
      value: "89",
      icon: Settings,
      description: "Compatible parts categories",
      trend: "+4.1%",
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
        <span className="text-[#4A36EC] font-medium">Models</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Vehicle Models</h1>
          <p className="text-sm text-gray-600">
            Manage vehicle models and their specifications
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Model
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
        <ModelTable models={models} />
      </motion.div>

      <ModelDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddModels}
      />
    </div>
  )
}