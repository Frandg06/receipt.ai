# 🧾 **Split My Receipt**

¡Digitaliza tu ticket, asigna cada producto a su comprador y reparte el total al instante!

<p align="center">
  <img src="docs/screenshot.png" width="420" alt="Captura de pantalla de Split My Receipt">
</p>

---

## ✨ ¿En qué consiste?

Split My Receipt es una aplicación **100 % Front‑End (React + TypeScript)** que:

1. **Lee tu ticket** con OCR en el navegador usando la api de OpenAi.
2. **Lista automáticamente** cada línea (producto, precio, cantidad).
3. Te permite **asignar** uno o varios usuarios a cada producto.
4. **Calcula en tiempo real** lo que debe pagar cada persona.
5. **Persiste** los datos en _localStorage_ usando zustand

---

## 🚀 Características

| Función | Detalles |
| --- | --- |
| 📸 **OCR en cliente** | Tesseract.js con ajustes heurísticos para tickets españoles (Mercadona, Carrefour, Dia…). |
| ⚡ **Re‑cálculo instantáneo** | Estado global con **Zustand**; cualquier cambio actualiza totales al momento. |
| 👫 **Gestor de usuarios** | Avatar, nombre y subtotal individual visibles en todo momento. |
| 🛒 **Edición de productos** | Añadir, borrar o corregir línea, precio o cantidad manualmente. |
| 💾 **Persistencia offline** | Todo se guarda en `localStorage`; al recargar, sigues donde lo dejaste. |
| 🌗 **UI accesible y responsive** | Tailwind CSS + DaisyUI; modo claro/oscuro automático. |

---

## 📦 Stack técnico

| Capa              | Tecnología                                                          |
| ----------------- | ------------------------------------------------------------------- |
| **Framework**     | [React](https://react.dev/) + [Vite](https://vitejs.dev/)           |
| **Lenguaje**      | TypeScript                                                          |
| **Estado global** | [Zustand](https://github.com/pmndrs/zustand) (`persist` middleware) |
| **OCR**           | [OpenAi]                                                            |
| **Estilos**       | Tailwind CSS + DaisyUI                                              |

> **Sin servidor, sin bases de datos, sin despliegues complicados.**  
> Todo ocurre en el navegador.

---

## 🛠️ Instalación y uso local

```bash
# 1. Clona el repositorio
git clone https://github.com/tu‑usuario/split‑my‑receipt.git
cd split‑my‑receipt

# 2. Instala dependencias
pnpm install        # o npm/yarn

# 3. Arranca el modo desarrollo
pnpm dev            # abre http://localhost:5173
```

Añade tus compañeros de compra.  
Asigna productos → ¡totales al instante!

### 🗂️ Estructura de carpetas

```
.
├─ src
│  ├─ components      # Dropdown, UserList, ProductRow…
│  ├─ hooks           # useReceiptStore (Zustand)
│  ├─ ocr             # Wrapper de Tesseract.js + post‑procesado
│  └─ pages           # Pantalla principal
├─ public
│  └─ samples         # Tickets de ejemplo
└─ docs               # Capturas y documentación
```

### 📅 Roadmap

- Exportar reparto a CSV/PDF.
- Compartir enlace con estado en la URL (deep‑link).
- Reconocer IVA y propinas.

¿Alguna idea? ¡Envíame un issue o PR! 🙌

## 🤝 Contribuir

1. Fork y crea tu rama: `git checkout -b feature/mi‑mejora`
2. Envía un Pull Request claro y descriptivo.

## 📝 Licencia

Distribuido bajo la MIT License. Consulta el archivo LICENSE para más información.

---

_Made with ☕ + React + TypeScript + un poco de matemáticas._
