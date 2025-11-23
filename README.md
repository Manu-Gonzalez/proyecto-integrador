# Proyecto Integrador - Restaurante Frontend

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Nav/
│   │   │       ├── Nav.jsx
│   │   │       └── Nav.css
│   │   └── ui/
│   │       ├── Btn-primary.jsx
│   │       ├── Btn-primary.module.css
│   │       ├── Btn-secondary.jsx
│   │       ├── Btn-secondary.module.css
│   │       ├── Card.jsx
│   │       ├── Card.module.css
│   │       ├── Input.jsx
│   │       └── Input.module.css
│   ├── pages/
│   │   ├── Landing/
│   │   │   ├── Landing.jsx
│   │   │   ├── Landing.css
│   │   │   └── components/
│   │   │       ├── Hero.jsx
│   │   │       ├── Hero.css
│   │   │       ├── Home.jsx
│   │   │       ├── ProductoMenu.jsx
│   │   │       ├── Services.jsx
│   │   │       ├── Services.css
│   │   │       ├── Contact.jsx
│   │   │       └── Contact.css
│   │   ├── Login/
│   │   ├── About.jsx
│   │   ├── Menu.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   └── menuData.js
│   ├── context/
│   │   └── CartContext.jsx
│   ├── App.jsx
│   └── main.jsx
└── public/
    ├── hamburguesas/
    ├── bebidas/
    ├── milanesas/
    ├── postres/
    ├── poster-hamburguesas.png
    ├── poster-bebidas.png
    ├── poster-milanesas.png
    └── poster-postres.png
```

## Arquitectura de Componentes

### 📁 `/components`

#### Layout Components
- **Nav/**: Navegación principal
  - `Nav.jsx`: Componente de navegación con enlaces y carrito
  - `Nav.css`: Estilos específicos para la navegación

#### UI Components (Reutilizables)
- **Btn-primary**: Botón principal con fondo morado y hover suave
- **Btn-secondary**: Botón con borde, fondo transparente y animación de relleno de izquierda a derecha
- **Card**: Tarjeta con sombra y bordes redondeados
- **Input**: Campo de entrada con estilos consistentes y focus personalizado

### 📁 `/pages`

#### Landing Page (Modular)
- **Landing.jsx**: Componente principal que orquesta la página de inicio
- **components/**: Componentes específicos de la landing
  - **Hero.jsx**: Sección principal con título, descripción y botones CTA
  - **Home.jsx**: Componente de bienvenida
  - **ProductoMenu.jsx**: Tarjetas de categorías con posters interactivos
  - **Services.jsx**: Sección de servicios
  - **Contact.jsx**: Información de contacto

#### Otras Páginas
- **Menu.jsx**: Página de menú con filtros por categoría y carrito
- **Login/**: Página de autenticación con formulario
- **About.jsx**: Página informativa sobre el restaurante
- **NotFound.jsx**: Página 404 personalizada

### 📁 `/styles`
- **global.css**: Variables CSS, reset, clases utilitarias y tipografía base

### 📁 `/data`
- **menuData.js**: Datos estáticos del menú y categorías

### 📁 `/context`
- **CartContext.jsx**: Context API para manejo del estado del carrito

## Características Implementadas

### 🎨 UI/UX
- ✅ Sistema de componentes reutilizables con CSS Modules
- ✅ Tarjetas de categorías con posters y efectos hover
- ✅ Animaciones CSS suaves (botones, hover, transiciones)
- ✅ Diseño responsive y modular
- ✅ Variables CSS para consistencia de colores

### ⚡ Funcionalidad
- ✅ Navegación entre páginas con React Router
- ✅ Context API para carrito de compras
- ✅ Filtros dinámicos en el menú
- ✅ Gestión de estado local y global
- ✅ Componentes controlados y no controlados

### 🏗️ Arquitectura
- ✅ Separación de responsabilidades (UI, Pages, Logic)
- ✅ Componentes modulares y reutilizables
- ✅ CSS Modules para encapsulación de estilos
- ✅ Estructura escalable y mantenible

## Tecnologías y Herramientas

- **React 18**: Biblioteca principal para UI
- **React Router**: Navegación SPA
- **CSS Modules**: Estilos encapsulados
- **CSS Variables**: Sistema de diseño consistente
- **Vite**: Bundler y servidor de desarrollo
- **Context API**: Manejo de estado global

## Patrones de Diseño Utilizados

- **Component Composition**: Composición de componentes reutilizables
- **CSS Modules**: Encapsulación de estilos por componente
- **Context Pattern**: Compartir estado entre componentes
- **Custom Hooks**: Lógica reutilizable (CartContext)
- **Atomic Design**: Separación entre UI components y Pages