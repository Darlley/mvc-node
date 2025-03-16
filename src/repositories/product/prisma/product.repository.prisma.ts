import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../product.repository";
import { Product, ProductProps } from "../../../entities/product";

export class ProductRepositoryPrisma implements ProductRepository {
  private constructor (readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ProductRepositoryPrisma(prisma)
  }  

  async save(product: ProductProps): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }

    await this.prisma.product.create({ data })
  }

  async list(): Promise<Product[]> {
    const aProducts = await this.prisma.product.findMany()

    const products: Product[] = aProducts.map(aProduct => {
      return Product.with(aProduct)
    })
    return products
  }
  async update(product: ProductProps): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }
    await this.prisma.product.update({
      where: { id: product.id },
      data
    })
  }
  async find(id: string): Promise<Product | null> {
    const aProduct = await this.prisma.product.findUnique({
      where: { id }
    })

    if(!aProduct){
      return null
    }

    const product = Product.with(aProduct)
    return product
  }
}