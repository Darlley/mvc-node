# SOLID + MVC

Princípios que todo programador deveria conhecer.

# SOLID

## MVC

**View**

Request HTTP/Json

**Controller**

Controller recebe a requisição e envia para o serviço.

**Model**

- Service (Regras)

A camada de serviço descreve regras e controle de fluxo, persistencia no banco de dados, etc, ela faz uso de entidade e repositorio

- Repository

No rempositorio é responsavel pela conexão com o banco de dados.

Em transições entre camadas (controller para service, service para repository) enviamos o DTO.

## PASSO A PASSO

- Vamos começar pelas entities

Entidade de Product é uma class com os métodos:

1. constructor
1. create
1. getters (id, name, price, quantity)
1. increaseStock
1. sell

- Repositories

Repositorio são cnotratos, na prática o ProductRepository é uma interface TypeScript com os métodos que o product vvai ter (save, list, update, find).

Note que até o momento não nos preocupamos com framework, ele é apenas um detalhe.

- Services

O ProductService também é uma interface que descreve quais métodos a aplicação vai ter (sell, buy, list).

## Agora vamos implementar!

- implementation

A nossa classe ProductServiceImplementation implementa os métodos da ProductService. Ela recebe o ProductRepository no construtor, e quando ela e a forma de se criar uma nova instancia dela é invocanto o método build com o ProductRepository.

## PRISMA

```
$ npm install prisma -D
$ npx prisma init
$ npx prisma db push
$ npx prisma studio
$ npm install @prisma/client - D
```

com isto criamos o nosso ProductRepositoryPrisma. Agora se trocarmos o Prisma pelo TypeORM, Drizzle, ou qualquer outro ORM, o nosso ProductServiceImplementation jamais saberá por que estipulamos um contrato de que qualquer ORM deve se adaptar ao ProductRepository.

## EXPRESS

Nosso ProductController vai depender do Express.

```
$ npm install express
$ npm install @types/express -D
```


// interface api.ts 
```ts
export interface Api {
  start(port: number): Promise<void>
}
```

// implementation api.express.ts
```ts
import express, { Express, Request, Response } from 'express'
import { Api } from '../api'

export class ApiExpress implements Api {
  private app: Express

  private constructor(app: Express) {
    this.app = app
  }

  public static build(): Api {
    const app = express()
    app.use(express.json())
    return new ApiExpress(app)
  }

  public addGetRoute(path: string, handle: (request: Request, response: Response) => Promise<void>): void {
    this.app.get(path, handle)
  }
  
  public addPostRoute(path: string, handle: (request: Request, response: Response) => Promise<void>): void {
    this.app.post(path, handle) 
  }

  public async start(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`)
    })
  }
}
```