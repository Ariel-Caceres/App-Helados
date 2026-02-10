# 📊 Sales & Purchases Manager

Aplicación web para la **gestión de ventas, compras y resúmenes financieros**, pensada para negocios pequeños/medianos que necesitan llevar control de ingresos, gastos y ganancias de forma clara y simple.

La app está integrada con un **backend en Node.js**, utiliza **Firebase Firestore** como base de datos y está **deployeada en Render**.

---

## 🚀 Funcionalidades

- 📦 Registro de **ventas**
- 🛒 Registro de **compras**
- 📅 **Resumen mensual** de:
  - total de ventas
  - total de compras
  - ganancias o dinero a recuperar
- 📊 Panel de resumen con métricas claras
- 🔍 Filtro por producto
- 📶 Soporte **online / offline**
- 🕒 Visualización de datos históricos
- 📱 Interfaz responsive

---

## 🌐 Backend & Base de datos

La aplicación consume una API REST desarrollada con:

- **Node.js**
- **Firebase Firestore** como base de datos NoSQL
- Endpoints para:
  - ventas
  - compras
  - consultas por mes
  - historial de registros

El backend se encarga de:

- persistencia de datos
- validación básica
- entrega de información histórica

---

## ☁️ Deploy

- **Frontend**: Deployeado en **Render**
- **Backend**: Deployeado en **Render**
- **Base de datos**: Firebase Firestore

La app está preparada para funcionar tanto con datos locales (offline) como con datos persistidos cuando hay conexión.

---

## 📶 Modo Online / Offline

- **Offline**:
  - la aplicación funciona con datos locales
  - permite seguir registrando ventas y compras

- **Online**:
  - sincroniza y consume datos desde el backend
  - muestra información histórica completa
  - permite ver resúmenes mensuales reales

La transición entre modos es automática.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- **React**
- **TypeScript**
- **React Router**
- **Vite**
- CSS / Tailwind (según implementación)

### Backend

- **Node.js**
- **Firebase Firestore**

### Infraestructura

- **Render** (deploy)

---

## 🎯 Objetivo del proyecto

Este proyecto fue creado con el objetivo de:

- construir una app real de gestión
- trabajar con integración frontend–backend
- manejar datos históricos y resúmenes financieros
- mejorar el diseño de flujos de negocio
- practicar despliegue en producción

---

## 📷 Screenshots

_(podés agregar capturas de la app acá)_

---

## ✨ Autor

Desarrollado por **[Tu nombre]**  
💻 Frontend Developer  
📍 React · TypeScript · Node.js

---

## 📝 Notas

El proyecto continúa en desarrollo y se le irán agregando mejoras y refactors a medida que evoluciona.
