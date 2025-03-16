import { Product } from "../../../entities/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { BuyOutputDto, CreateOutputDto, ListOutputDto, ProductService, SellOutputDto } from "../product.service";

export class ProductServiceImplementation implements ProductService {

  private constructor(readonly repository: ProductRepository) { }

  public static build(repository: ProductRepository) {
    return new ProductServiceImplementation(repository)
  }

  public async create(name: string, price: number): Promise<CreateOutputDto> {
    const aProduct = await Product.create({ name, price })
    await this.repository.save(aProduct)

    return {
      id: aProduct.id,
      quantity: aProduct.quantity
    }
  }


  public async sell(id: string, quantity: number): Promise<SellOutputDto> {
    const aProduct = await this.repository.find(id)

    if (!aProduct) throw new Error("Product not found")

    aProduct.sell(quantity)

    await this.repository.update(aProduct)

    return {
      id: aProduct.id,
      quantity: aProduct.quantity
    }
  }

  public async buy(id: string, quantity: number): Promise<BuyOutputDto> {
    const aProduct = await this.repository.find(id)

    if (!aProduct) throw new Error("Product not found")

    aProduct.buy(quantity)

    await this.repository.update(aProduct)

    return {
      id: aProduct.id,
      quantity: aProduct.quantity
    }
  }

  public async list(): Promise<ListOutputDto> {
    const aProducts = await this.repository.list()
    const products = aProducts.map(product => ({
      id: product.id,
      quantity: product.quantity,
      name: product.name,
      price: product.price
    }))

    return { products }
  }
}