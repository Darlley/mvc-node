// métodos que temos na nossa aplicação (regras de negócio)

import { ProductProps } from "../../entities/product"

export type SellOutputDto = {
  id: string, 
  amount: number
}

export type BuyOutputDto = {
  id: string, 
  amount: number
}

export type ListOutputDto = {
  products: ProductProps[]
}

export interface ProductService {
  sell(id: string, amount: number): Promise<SellOutputDto>
  buy(id: string, amount: number): Promise<BuyOutputDto>
  list(): Promise<ListOutputDto>
}