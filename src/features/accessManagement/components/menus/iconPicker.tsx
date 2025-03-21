import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import * as Icons from "lucide-react"
import { Search, Icon } from "lucide-react"

interface IconPickerProps {
  value?: string
  onChange?: (value: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("")
  const [selectedIcon, setSelectedIcon] = useState(value)

  // Get all icons from lucide-react
  const iconList = Object.entries(Icons)
    .filter(([name]) => name !== "createLucideIcon" && name !== "default")
    .map(([name]) => name)

  // Filter icons based on search
  const filteredIcons = iconList.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    setSelectedIcon(value)
  }, [value])

  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName)
    onChange?.(iconName)
  }

  // Get the selected icon component
  const SelectedIcon = selectedIcon ? Icons[selectedIcon as keyof typeof Icons] : null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start"
        >
          {SelectedIcon ? (
            <>
              <Icon className="w-4 h-4 mr-2" />
              {selectedIcon}
            </>
          ) : (
            "Select icon"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-3 border-b">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-4 gap-2 p-3">
            {filteredIcons.map((iconName) => {
              const Icon = Icons[iconName as keyof typeof Icons]
              return (
                <Button
                  key={iconName}
                  variant="ghost"
                  className={`h-12 w-12 p-0 ${
                    selectedIcon === iconName ? "bg-[#4A36EC]/10 text-[#4A36EC]" : ""
                  }`}
                  onClick={() => handleSelectIcon(iconName)}
                  title={iconName}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 