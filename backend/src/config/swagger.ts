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
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            profileImage: {
              type: 'string',
              format: 'uri',
            },
            username: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        UserRegister: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            profileImage: {
              type: 'string',
              format: 'uri',
            },
            username: {
              type: 'string',
              minLength: 2,
              maxLength: 50,
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 64,
            },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        Client: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            dni: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            registerAt: {
              type: 'string',
              format: 'date-time',
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
  apis: ['./src/routes/v1/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);