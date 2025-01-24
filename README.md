# Mirlo - Agente Personal

Una aplicación web moderna para gestionar líneas telefónicas con un agente personal inteligente.

## Características Principales

### Gestión de Líneas
- Vista general de todas las líneas telefónicas
- Monitoreo de uso de datos y minutos
- Gestión de equipos asociados
- Recargas y cambios de plan

### Agente Personal con IA
- Gestión inteligente de llamadas
- Configuración personalizada de voz y comportamiento
- Sistema de reglas por palabras clave
- Filtrado de llamadas no deseadas
- Contactos prioritarios
- Integración con calendario

### Eventos y Monitoreo
- Historial detallado de llamadas
- Transcripciones y grabaciones
- Estadísticas de uso
- Sistema de etiquetas
- Exportación de datos

### Notificaciones
- Soporte para múltiples canales:
  - SMS
  - Email
  - Slack
- Resúmenes personalizables

## Tecnologías Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons
- Vite

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── contexts/       # Contextos de React
├── hooks/         # Hooks personalizados
├── pages/         # Componentes de página
├── services/      # Servicios y APIs
├── styles/        # Estilos globales
├── types/         # Definiciones de TypeScript
└── utils/         # Utilidades
```

## Diseño y UI

- Diseño responsivo
- Tema personalizado con variables CSS
- Componentes accesibles
- Soporte para modo oscuro (próximamente)

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```