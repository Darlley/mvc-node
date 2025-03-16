import express, { Express, Request, Response } from 'express'
import { Api } from '../api'

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express()
    app.use(express.json())
    return new ApiExpress(app)
  }

  public addGetRoute(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.get(path, handler);
  }

  public addPostRoute(path: string, handle: (request: Request, response: Response) => void): void {
    this.app.post(path, handle)
  }

  public async start(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`)
    })
  }
}