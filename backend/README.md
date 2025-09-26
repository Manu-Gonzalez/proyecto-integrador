# Backend

Este proyecto backend está configurado con TypeScript, utiliza path-aliases y sigue la Arquitectura Limpia (Clean Architecture) con patrón Repository e inyección de dependencias.

## Arquitectura Limpia

El proyecto está estructurado en capas siguiendo los principios de Clean Architecture:

### Capas

- **Domain**: Contiene las entidades de negocio y reglas de negocio puras. No depende de frameworks externos.
  - `entities/`: Interfaces o clases que representan entidades del dominio (ej. User).
  - `repositories/`: Interfaces para el acceso a datos (patrón Repository).

- **Application**: Contiene los casos de uso (Use Cases) que orquestan la lógica de aplicación.
  - `use-cases/`: Clases que implementan la lógica de negocio, inyectando repositories.
  - `services/`: Servicios de aplicación si es necesario.

- **Infrastructure**: Implementaciones concretas de las interfaces definidas en Domain.
  - `database/`: Configuración de base de datos.
  - `repositories/`: Implementaciones de repositories (ej. con Prisma).

- **Presentation**: Adaptadores de entrada (controladores, rutas) para Express.
  - `controllers/`: Controladores que manejan las solicitudes HTTP.
  - `routes/`: Definición de rutas y middlewares.

- **Shared**: Utilidades compartidas por todas las capas.
  - `types/`: Tipos TypeScript compartidos.
  - `utils/`: Funciones utilitarias.
  - `container.ts`: Configuración del contenedor de inyección de dependencias.

### Dependencias

Las dependencias fluyen hacia adentro: Presentation → Application → Domain ← Infrastructure.

## Path-Aliases

- `@/*`: Apunta a la raíz del proyecto (./*)
- `@domain/*`: Capa Domain (./src/domain/*)
- `@application/*`: Capa Application (./src/application/*)
- `@infrastructure/*`: Capa Infrastructure (./src/infrastructure/*)
- `@presentation/*`: Capa Presentation (./src/presentation/*)
- `@shared/*`: Capa Shared (./src/shared/*)

### Ejemplo de uso

```typescript
import type { User } from '@domain/entities/user';
import { CreateUserUseCase } from '@application/use-cases/create-user-use-case';
import { PrismaUserRepository } from '@infrastructure/repositories/prisma-user-repository';
```

## Inyección de Dependencias

Se utiliza `tsyringe` para inyección de dependencias. Los servicios se registran en `src/shared/container.ts`.

Ejemplo de uso en un controlador:

```typescript
@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase
  ) {}
}
```

## Scripts

- `pnpm run dev`: Ejecuta el proyecto en modo desarrollo con tsx.
- `pnpm run build`: Compila el proyecto a JavaScript.
- `pnpm run start`: Ejecuta el proyecto compilado.

## Configuración

- `tsconfig.json`: Configurado con `baseUrl`, `paths`, decorators habilitados y módulos ESM.
- `package.json`: Configurado como módulo ESM con `type: "module"`.