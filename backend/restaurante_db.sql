-- Crear base de datos
CREATE DATABASE IF NOT EXISTS restaurante_db;
USE restaurante_db;

-- Tabla Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'empleado', 'admin') DEFAULT 'cliente'
);

-- Tabla Categoria
CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla Producto
CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen TEXT,
    tipo VARCHAR(255) DEFAULT 'producto',
    categoriaId INT NOT NULL,
    FOREIGN KEY (categoriaId) REFERENCES Categoria(id)
);

-- Tabla Mesa
CREATE TABLE Mesa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT UNIQUE NOT NULL,
    capacidad INT NOT NULL,
    estado VARCHAR(255) DEFAULT 'disponible'
);

-- Tabla MedioPago
CREATE TABLE MedioPago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    detalles TEXT
);

-- Tabla Pedido
CREATE TABLE Pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(255) DEFAULT 'pendiente',
    total DECIMAL(10,2) DEFAULT 0.00,
    usuarioId INT NOT NULL,
    mesaId INT,
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id),
    FOREIGN KEY (mesaId) REFERENCES Mesa(id)
);

-- Tabla DetallePedido
CREATE TABLE DetallePedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedidoId INT NOT NULL,
    productoId INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedidoId) REFERENCES Pedido(id),
    FOREIGN KEY (productoId) REFERENCES Producto(id)
);

-- Tabla Factura
CREATE TABLE Factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    pedidoId INT UNIQUE NOT NULL,
    metodoPagoId INT NOT NULL,
    FOREIGN KEY (pedidoId) REFERENCES Pedido(id),
    FOREIGN KEY (metodoPagoId) REFERENCES MedioPago(id)
);

-- Tabla Carrito
CREATE TABLE Carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId INT UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

-- Tabla ItemCarrito
CREATE TABLE ItemCarrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carritoId INT NOT NULL,
    productoId INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (carritoId) REFERENCES Carrito(id) ON DELETE CASCADE,
    FOREIGN KEY (productoId) REFERENCES Producto(id)
);

-- Base de datos lista para usar sin datos de prueba