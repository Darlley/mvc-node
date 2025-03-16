// métodos que temos na nossa aplicação (regras de negócio)

import { ProductProps } from "../../entities/product"

export type SellOutputDto = {
  id: string, 
  quantity: number
}

export type BuyOutputDto = {
  id: string, 
  quantity: number
}

export type ListOutputDto = {
  products: ProductProps[]
}

export interface ProductService {
  sell(id: string, quantity: number): Promise<SellOutputDto>
  buy(id: string, quantity: number): Promise<BuyOutputDto>
  list(): Promise<ListOutputDto>
}