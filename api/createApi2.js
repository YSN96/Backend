const models = require("../db/db");
const express = require("express");
const data_router = express.Router();
const mysql = require("mysql");

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on("error", (err) => {
  console.log("Re-connecting lost conn: ");
  conn = mysql.createConnection(models.mysql);
});

// DATABASE CREATE

// TABLA USUARIOS
const crearTablaUsuario = `
CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  roles VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  edad INT NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  poblacion VARCHAR(50) NOT NULL,
  provincia VARCHAR(50) NOT NULL,
  pais VARCHAR(50) NOT NULL,
  codigopostal INT NOT NULL,
  genero VARCHAR(50) NOT NULL,
  mobile INT NOT NULL
);
`;

conn.query(crearTablaUsuario, (err, results, fields) => {
  if (err) {
    console.error("Tabla de usuario ya creada");
    return;
  }
  console.log("Tabla de usuarios creada exitosamente");
});

// TABLA CONCEPTO
const crearTablaConcepto = `
CREATE TABLE IF NOT EXISTS concepto (
  id_concepto BIGINT PRIMARY KEY UNIQUE,
  estado BOOLEAN NOT NULL,
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);
`;

conn.query(crearTablaConcepto, (err, results, fields) => {
  if (err) {
    console.error("Tabla de concepto ya creada");
    return;
  }
  console.log("Tabla de Concepto creada exitosamente");
});

// TABLA ARTICULOS
const crearTablaArticulos = `
CREATE TABLE IF NOT EXISTS articulos (
  id_articulo INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  archivo_imagen VARCHAR(100) NOT NULL
);
`;

conn.query(crearTablaArticulos, (err, results, fields) => {
  if (err) {
    console.error("Tabla de articulos ya creada");
    return;
  }
  console.log("Tabla de Articulos creada exitosamente");
});

// TABLA CARRITO
const crearTablaCarrito = `
CREATE TABLE IF NOT EXISTS carrito (
  id_carrito INT PRIMARY KEY AUTO_INCREMENT,
  id_concepto BIGINT UNIQUE,
  FOREIGN KEY (id_concepto) REFERENCES concepto (id_concepto)
);
`;

conn.query(crearTablaCarrito, (err, results, fields) => {
  if (err) {
    console.error("Tabla de carrito ya creada");
    return;
  }
  console.log("Tabla de Carrito creada exitosamente");
});
// TABLA CARRITO_ARTICULOS
const crearTablaCarritoArticulos = `
CREATE TABLE IF NOT EXISTS carrito_articulos (
  id_carrito INT,
  id_articulo INT,
  PRIMARY KEY (id_carrito, id_articulo),
  FOREIGN KEY (id_carrito) REFERENCES carrito (id_carrito),
  FOREIGN KEY (id_articulo) REFERENCES articulos (id_articulo)
);
`;

conn.query(crearTablaCarritoArticulos, (err, results, fields) => {
  if (err) {
    console.error("Tabla de carrito_articulos ya creada");
    return;
  }
  console.log("Tabla de Carrito_Articulos creada exitosamente");
});

module.exports = data_router;
