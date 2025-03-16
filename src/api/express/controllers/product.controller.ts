import { Request, Response } from "express";
import { ProductRepositoryPrisma } from "../../../repositories/product/prisma/product.repository.prisma";
import { ProductServiceImplementation } from "../../../services/product/implementation/product.implementation";
import { prisma } from "../../../util/prisma.util";
import { Product, ProductProps } from "../../../entities/product";

export class ProductController {

  private constructor () {}

  public static build() {
    return new ProductController();
  }

  public async create(request: Request, response: Response) {
    const { name, price } = request.body
    const aRepository = ProductRepositoryPrisma.build(prisma)
    const aService = ProductServiceImplementation.build(aRepository)

    const output = await aService.create(name, price)
    const data: ProductProps = {
      id: output.id,
      name,
      price,
      quantity: output.quantity
    }

    if(!output) response.status(400).json({ message: 'Error to create product' }).send()

    return response.status(201).json(data).send()
  }

  public async list(request: Request, response: Response) {
    const aRepository = ProductRepositoryPrisma.build(prisma)
    const aService = ProductServiceImplementation.build(aRepository)
    const output = await aService.list()

    if(!output) response.status(400).json({ message: 'Error to list products' }).send()

    return response.status(200).json(output).send()
  }

  public async buy(request: Request, response: Response) {
    const { id } = request.params
    const { quantity } = request.body

    const aRepository = ProductRepositoryPrisma.build(prisma)
    const aService = ProductServiceImplementation.build(aRepository)
    const output = await aService.buy(id, quantity)

    const data = {
      id: output.id,
      quantity: output.quantity
    }

    if(!output) response.status(400).json({ message: 'Error to buy product' }).send()

    return response.status(200).json(data).send()
  }

  public async sell(request: Request, response: Response) {
    const { id } = request.params
    const { quantity } = request.body

    const aRepository = ProductRepositoryPrisma.build(prisma)
    const aService = ProductServiceImplementation.build(aRepository)
    const output = await aService.sell(id, quantity)

    const data = {
      id: output.id,
      quantity: output.quantity
    }

    if(!output) response.status(400).json({ message: 'Error to sell product' }).send()

    return response.status(200).json(data).send()
  }

}