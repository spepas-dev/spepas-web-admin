export interface Brand {
  id: string
  name: string
  description?: string
  logo?: string
  website?: string
  manufacturerId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateBrandDTO {
        name: string
        manufacturer_ID: string
        type: 'CAR' | 'TRUCK' | 'MOTORCYCLE'
}


export interface UpdateBrandDTO extends Partial<CreateBrandDTO> {
  // Additional fields specific to updates can go here
}

export interface BrandFilters {
  search?: string
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
  manufacturerId?: string
  isActive?: boolean
}

export interface BrandStats {
  totalProducts: number
  activeProducts: number
  discontinuedProducts: number
}

// Response types
export interface BrandListResponse {
  data: Brand[]
  total: number
  page: number
  limit: number
} 