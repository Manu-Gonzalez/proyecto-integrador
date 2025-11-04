# Arquitectura del Sistema

## Patrones Implementados

### Repository Pattern
- Abstracción de acceso a datos
- Interfaces para cada repositorio
- Implementaciones con Prisma

### Dependency Injection
- Container personalizado
- Registro de dependencias
- Resolución automática

### Clean Architecture
- Separación por capas
- Modelos de dominio
- Servicios de aplicación
- Controladores de presentación

## Endpoints API

### Usuarios
- `POST /api/v1/users/register` - Registro
- `POST /api/v1/users/login` - Login
- `GET /api/v1/users` - Listar usuarios (auth)

### Productos
- `GET /api/v1/productos` - Listar productos (público)
- `GET /api/v1/productos/:id` - Obtener producto (público)
- `POST /api/v1/productos` - Crear producto (auth)
- `PUT /api/v1/productos/:id` - Actualizar producto (auth)
- `DELETE /api/v1/productos/:id` - Eliminar producto (auth)

### Categorías
- `GET /api/v1/categorias` - Listar categorías (público)
- `GET /api/v1/categorias/:id` - Obtener categoría (público)
- `POST /api/v1/categorias` - Crear categoría (auth)
- `PUT /api/v1/categorias/:id` - Actualizar categoría (auth)
- `DELETE /api/v1/categorias/:id` - Eliminar categoría (auth)

### Pedidos
- `GET /api/v1/orders` - Listar pedidos (auth)
- `POST /api/v1/orders` - Crear pedido (auth)
- `PUT /api/v1/orders/:id/estado` - Cambiar estado (auth)