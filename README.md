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