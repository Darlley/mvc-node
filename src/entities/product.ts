import { randomUUID } from "crypto";

export type ProductProps = {
  id: string,
  name: string;
  price: number;
  quantity: number;
}

export class Product {
  private constructor(readonly props: ProductProps) {}

  public static create({ name, price }: Pick<ProductProps, 'name' | 'price'>) {
    const product = new Product({
      id: randomUUID().toString(),
      name,
      price,
      quantity: 0
    })

    return product
  }

  public static with ({ id, name, price, quantity }: ProductProps) {
    return new Product({ id, name, price, quantity })
  }

  get id () {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get quantity() {
    return this.props.quantity
  }

  public buy(amount: number) {
    if (amount >= 0) {
      this.props.quantity += amount
    }
  }

  public sell(amount: number){
    if(this.props.quantity < amount) throw new Error('Sem estoque suficiente')

    this.props.quantity -= amount
  }
}