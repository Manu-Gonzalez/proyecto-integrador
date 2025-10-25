
# Evaluacion backend

## Actividad

Diseñe un sistema de ventas mediante pedidos que pueda manejar productos, pedidos y clientes, aplicando impuestos, descuentos y calculando el total.

El sistema de ventas y clientes solo deberia poder ser accedido por alguien autenticado, mientras que a la lista de los productos deberia poder acceder cualquier persona que quisice consultar los productos a la venta. El sistema de autenticacion deberia ser manejado unicamente por el backend mediante cookies y JWT.

Se evaluara si siguio las formas y estructura del proyecto, ademas de cumplir con los requisitos y los tests ya hechos.


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


## Requisitos de la aplicacion

- Sistema de autenticacion que pueda
	1. Registrar un usuario (empleado).
	2. Autenticar un usuario.
	3. Verificar quien accede a la aplicacion y limitar su acceso.

- Un modulo que se encargue de manejar productos. Con las siguientes funcionalidades.
	1. Listar productos con paginado sin autenticacion.
	2. Agregar productos si se esta autenticado.
	3. Eliminar productos si se esta autenticado.
	4. Editar productos estando autenticado.

- Funcionalidad para obtener detalles de un cliente especifico y sus pedidos pendientes.

- Modulo para el manejo de los pedidos accesible unicamente con autenticacion. Debera tener las siguientes funcionalidades.
	1. Agregar un pedido el cual iniciara con estado pendiente.
	2. Poder cambiar el estado del pedido a pagado.
	3. Poder cambiar el estado de un pedido a entregado.
	4. Poder cancelar el pedido.
	5. Listar los pedidos en sus diferentes estados.