import { Product } from "../../entities/product"

// contratos que a nossa aplicação vai ter com o banco de dados
export interface ProductRepository {
  save(product: Product): Promise<void>
  list(): Promise<Product[]>
  update(product: Product): Promise<void>
  find(id: string): Promise<Product | null>
}