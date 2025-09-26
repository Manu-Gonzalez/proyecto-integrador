# Arquitectura Limpia - Estructura del Proyecto

Este documento describe la implementación de Arquitectura Limpia (Clean Architecture) en el proyecto backend, siguiendo los principios de Uncle Bob para crear software mantenible, testable y escalable.

## Visión General

La Arquitectura Limpia organiza el código en capas concéntricas donde las dependencias fluyen hacia adentro. El núcleo contiene las reglas de negocio puras, mientras que las capas externas manejan detalles de implementación.

## Capas de la Arquitectura

### 1. Domain (Dominio)
**Ubicación**: `src/domain/`

Esta es la capa más interna y contiene las reglas de negocio puras. No depende de ningún framework o tecnología externa.

#### Subcarpetas:
- **entities/**: Representaciones de objetos de negocio.
  - Ejemplo: `user.ts` - Define la estructura de un Usuario con sus propiedades y validaciones básicas.
- **repositories/**: Interfaces para acceso a datos.
  - Ejemplo: `user-repository.ts` - Contratos para operaciones CRUD de usuarios.

**Responsabilidades**:
- Definir entidades y value objects.
- Establecer reglas de negocio invariantes.
- Declarar contratos para persistencia.

### 2. Application (Aplicación)
**Ubicación**: `src/application/`

Contiene la lógica de aplicación que orquesta las reglas de negocio. Coordina entre la capa de dominio y las capas externas.

#### Subcarpetas:
- **use-cases/**: Casos de uso que implementan flujos de negocio.
  - Ejemplo: `create-user-use-case.ts` - Lógica para crear un nuevo usuario.
- **services/**: Servicios transversales de aplicación (opcional).

**Responsabilidades**:
- Implementar casos de uso específicos.
- Coordinar operaciones entre múltiples entidades.
- Gestionar transacciones de negocio.

### 3. Infrastructure (Infraestructura)
**Ubicación**: `src/infrastructure/`

Implementaciones concretas de las interfaces definidas en el dominio. Aquí viven los detalles técnicos.

#### Subcarpetas:
- **repositories/**: Implementaciones de repositories.
  - Ejemplo: `prisma-user-repository.ts` - Acceso a datos usando Prisma.
- **database/**: Configuración de conexiones y migraciones.

**Responsabilidades**:
- Implementar persistencia de datos.
- Gestionar conexiones externas (APIs, colas, etc.).
- Adaptar frameworks a las interfaces del dominio.

### 4. Presentation (Presentación)
**Ubicación**: `src/presentation/`

Adaptadores de entrada que convierten datos externos al formato interno de la aplicación.

#### Subcarpetas:
- **controllers/**: Manejadores de solicitudes HTTP.
  - Ejemplo: `user-controller.ts` - Controla endpoints de usuarios.
- **routes/**: Definición de rutas y middlewares.
  - Ejemplo: `user-routes.ts` - Configura rutas Express para usuarios.

**Responsabilidades**:
- Recibir y validar datos de entrada.
- Formatear respuestas para el cliente.
- Gestionar autenticación y autorización.

### 5. Shared (Compartido)
**Ubicación**: `src/shared/`

Utilidades y configuraciones compartidas por todas las capas.

#### Archivos principales:
- **container.ts**: Configuración de inyección de dependencias.
- **types/**: Tipos TypeScript compartidos.
- **utils/**: Funciones utilitarias.

**Responsabilidades**:
- Proporcionar herramientas comunes.
- Configurar contenedores de DI.
- Definir tipos transversales.

## Flujo de Dependencias

```
Presentation → Application → Domain ← Infrastructure
```

- Las flechas indican dirección de dependencias.
- El dominio es el centro y no depende de nada.
- Infrastructure implementa interfaces del dominio.

## Patrones Implementados

### Patrón Repository
- Abstrae el acceso a datos detrás de interfaces.
- Facilita testing con mocks.
- Permite cambiar tecnologías de persistencia sin afectar lógica de negocio.

### Inyección de Dependencias
- Usa `tsyringe` para gestionar dependencias.
- Registra implementaciones en `container.ts`.
- Permite inyección automática en constructores.

## Beneficios de Esta Arquitectura

- **Mantenibilidad**: Cambios en frameworks no afectan reglas de negocio.
- **Testabilidad**: Cada capa se puede testear en aislamiento.
- **Escalabilidad**: Fácil agregar nuevas funcionalidades siguiendo la estructura.
- **Separación de Concerns**: Cada capa tiene responsabilidades claras.

## Convenciones de Nomenclatura

- Interfaces: `IEntityRepository` (opcional, preferimos tipos implícitos).
- Clases: `PascalCase` (ej. `CreateUserUseCase`).
- Archivos: `kebab-case` (ej. `create-user-use-case.ts`).
- Imports: Usar path-aliases (`@domain/*`, `@application/*`, etc.).

## Próximos Pasos

- Implementar validaciones usando bibliotecas como `zod`.
- Agregar logging y monitoreo.
- Configurar tests unitarios e integración.
- Implementar middlewares de autenticación.