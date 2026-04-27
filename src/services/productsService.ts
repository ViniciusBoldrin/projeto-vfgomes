import api from './api'
import type { Product, ProductFormData } from '../types/product'

export const productsService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products')
    return response.data
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get<string[]>('/products/categories')
    return response.data
  },

  async getByCategory(category: string): Promise<Product[]> {
    const response = await api.get<Product[]>(`/products/category/${category}`)
    return response.data
  },

  async create(data: ProductFormData): Promise<Product> {
    const response = await api.post<Product>('/products', data)
    return response.data
  },

  async update(id: number, data: ProductFormData): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, data)
    return response.data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  },
}
