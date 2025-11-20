import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from '../config';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de ventas con productos, pedidos y clientes',
    },
    servers: [
      {
        url: `http://localhost:${PORT || 3000}/v1`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            nombre: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            rol: {
              type: 'string',
              enum: ['cliente', 'empleado', 'admin'],
            },
          },
        },
        UsuarioCreate: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            nombre: {
              type: 'string',
              minLength: 2,
              maxLength: 50,
            },
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 8,
            },
            rol: {
              type: 'string',
              enum: ['cliente', 'empleado', 'admin'],
            },
          },
        },
        UsuarioLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
            },
          },
        },
        Producto: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            nombre: {
              type: 'string',
            },
            precio: {
              type: 'number',
              format: 'float',
            },
            imagen: {
              type: 'string',
              nullable: true,
            },
            categoriaId: {
              type: 'integer',
            },
            categoria: {
              $ref: '#/components/schemas/Categoria',
            },
          },
        },
        ProductoCreate: {
          type: 'object',
          required: ['nombre', 'precio', 'categoriaId'],
          properties: {
            nombre: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
            },
            precio: {
              type: 'number',
              format: 'float',
              minimum: 0,
            },
            imagen: {
              type: 'string',
            },
            categoriaId: {
              type: 'integer',
            },
          },
        },
        Categoria: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            nombre: {
              type: 'string',
            },
            productos: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Producto',
              },
            },
          },
        },
        CategoriaCreate: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: {
              type: 'string',
              minLength: 1,
              maxLength: 50,
            },
          },
        },
        Pedido: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            fecha: {
              type: 'string',
              format: 'date-time',
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'confirmado', 'entregado', 'cancelado'],
            },
            total: {
              type: 'number',
              format: 'float',
            },
            usuarioId: {
              type: 'integer',
            },
            usuario: {
              $ref: '#/components/schemas/Usuario',
            },
            detalles: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/DetallePedido',
              },
            },
          },
        },
        PedidoCreate: {
          type: 'object',
          required: ['usuarioId', 'detalles'],
          properties: {
            usuarioId: {
              type: 'integer',
            },
            detalles: {
              type: 'array',
              items: {
                type: 'object',
                required: ['productoId', 'cantidad'],
                properties: {
                  productoId: {
                    type: 'integer',
                  },
                  cantidad: {
                    type: 'integer',
                    minimum: 1,
                  },
                },
              },
            },
          },
        },
        DetallePedido: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            pedidoId: {
              type: 'integer',
            },
            productoId: {
              type: 'integer',
            },
            cantidad: {
              type: 'integer',
            },
            subtotal: {
              type: 'number',
              format: 'float',
            },
            producto: {
              $ref: '#/components/schemas/Producto',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/v1/*.ts', './src/app/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);