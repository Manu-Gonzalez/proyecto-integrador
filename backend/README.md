
# Sistema de Ventas - Backend

## Descripción

Sistema de ventas mediante pedidos que maneja usuarios, productos, pedidos y facturación con roles de usuario (cliente, empleado, admin).

El sistema utiliza autenticación JWT para proteger endpoints según roles de usuario. Los productos pueden ser consultados públicamente, mientras que la gestión de pedidos requiere autenticación.


## Conocimientos a aplicar

- Desarrollo de una API REST con Express.
- Conocimientos en Typescript relacionados a path alias, tipado fuerte, programacion orientada a objetos.
- Patrones de diseño como repositorio e inyeccion de dependencias.
- Arquitectura de proyectos.
- Autenticacion mediante JWT y cookies.
- Uso de librerias externas.
- Conexion a base de datos y uso de ORM.
- Aplicacion de los principios SOLID (S) responsabilidad unica, (O) abierto a extension cerrado a modificacion, (L) principio de sustitucion, (I) segregacion de interfaces (D) inversion de dependencias.
- Paginacion de datos.
- Extension y manejo de errores.


## Detalles importantes

El proyecto ya tiene las configuraciones basicas de express, typescript, vitest y un contenedor de dependencias basico, esto con el objetivo de no perder el tiempo. Ademas cuenta con una estructura definida, algunos tests de funcionalidad y un modulo de clientes que solo tiene un endpoint para devolver una lista de clientes.

Algunas partes del proyecto contaran con comentarios que aportan consejos sobre algunas practicas y recomendaciones a la hora de llevar adelante un proyecto.

A la hora de hacer un pedido se debe devolver el total de la posible venta, para ello, por ley, se tiene que devolver el total de la venta y cuanto de esa venta es IVA, ademas a los clientes que esten registrados desde x tiempo se les aplica un descuento sobre el total de la venta luego del IVA.


## Módulos Actuales

### Usuarios
- **Modelo**: Usuario con roles (cliente, empleado, admin)
- **Campos**: id, nombre, email, password, rol
- **Funcionalidades**:
  - Registro de usuarios
  - Login con email/password
  - Gestión de roles

### Productos y Categorías
- **Modelos**: Producto, Categoria
- **Campos Producto**: id, nombre, precio, imagen, categoriaId
- **Campos Categoria**: id, nombre
- **Funcionalidades**:
  - CRUD completo de productos con imagen
  - CRUD completo de categorías
  - Consulta de productos por categoría
  - Validación de existencia de imagen
  - Endpoints públicos para consulta

### Pedidos
- **Modelos**: Pedido, DetallePedido
- **Estados**: pendiente, confirmado, entregado, cancelado
- **Funcionalidades**:
  - Crear pedidos con detalles
  - Cambiar estado de pedidos
  - Consultar pedidos por usuario
  - Cálculo automático de totales

### Facturación
- **Modelos**: Factura, MedioPago
- **Funcionalidades**:
  - Generar facturas para pedidos
  - Gestión de medios de pago

## Estructura del Proyecto

```
src/
├── app/
│   ├── users/          # Módulo de usuarios
│   ├── productos/      # Módulo de productos
│   ├── categorias/     # Módulo de categorías
│   └── orders/         # Módulo de pedidos
├── config/             # Configuración de BD
├── routes/             # Rutas de la API
├── shared/             # Utilidades compartidas
└── diContainer/        # Inyección de dependencias
```