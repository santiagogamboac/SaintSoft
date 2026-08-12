# Plan de Mejoras — Modo Oscuro Corporativo

## Objetivo
Crear una experiencia de modo oscuro profesional y corporativa usando únicamente tonos de azul y grises azulados, sin fondos claros que rompan la coherencia visual.

## Paleta de Colores Dark Mode

### Variables CSS (globals.css)
```css
.dark {
  /* Fondo principal: azul muy oscuro corporativo */
  --background: #0f1729;
  --foreground: #e8edf5;
  
  /* Primarios más brillantes para dark mode */
  --primary: #4a90ff;
  --primary-dark: #3b82f6;
  --primary-light: #6ba3ff;
  --secondary: #38bdf8;
  
  /* Escala de grises azulados para dark mode */
  --gray-50: #1a2332;   /* Más oscuro */
  --gray-100: #1e2838;
  --gray-200: #243041;
  --gray-300: #2d3b52;
  --gray-400: #4a5f7f;
  --gray-500: #6b7fa3;
  --gray-600: #8fa3c4;
  --gray-700: #b3c3db;
  --gray-800: #d4dfe9;
  --gray-900: #e8edf5;  /* Más claro */
}
```

## Cambios Aplicados por Componente

### 1. **Services.tsx**
- ✅ Fondo sección: `dark:bg-slate-900`
- ✅ Tarjetas: `dark:bg-slate-800/40` con `dark:border-slate-700/50`
- ✅ Sombras: `dark:shadow-lg dark:shadow-black/20`
- ✅ Sin fondos blancos/claros en dark mode

### 2. **Benefits.tsx**
- ✅ Fondo sección: `dark:bg-slate-800`
- ✅ Tarjetas: `dark:bg-slate-800/40` con bordes `dark:border-slate-700/50`
- ✅ Stats bar: mismo tratamiento oscuro

### 3. **CaseStudies.tsx**
- ✅ Tarjetas: `dark:bg-slate-800/40`
- ✅ Bordes: `dark:border-slate-700/50`
- ✅ Sombras hover: `dark:hover:shadow-black/40`

### 4. **Technologies.tsx**
- ✅ Fondo sección: `dark:bg-slate-800`
- ✅ Pills tecnologías: `dark:bg-slate-800/60`
- ✅ Feature cards: `dark:bg-slate-800/40`

### 5. **Testimonials.tsx**
- ✅ Fondo sección: `dark:bg-slate-800`
- ✅ Tarjetas: `dark:bg-slate-800/40`

### 6. **Contact.tsx**
- ✅ Fondo sección: `dark:bg-slate-800`
- ✅ Formulario: `dark:bg-slate-800/40`
- ✅ Inputs: `dark:bg-slate-900/50` con `dark:border-slate-700/50`

### 7. **FAQ.tsx**
- ✅ Tarjetas: `dark:bg-slate-800/40`
- ✅ Hover: `dark:hover:bg-slate-700/30`

### 8. **Hero.tsx**
- ✅ Gradiente base: `dark:from-slate-900 dark:via-slate-800 dark:to-slate-900`
- ✅ Fade inferior: `dark:from-slate-900`

### 9. **CTA.tsx**
- ✅ Fondo: `dark:from-slate-800 dark:via-slate-900 dark:to-slate-950`

### 10. **Footer.tsx**
- ✅ Fondo: `dark:bg-slate-950`

### 11. **Stats.tsx**
- ✅ Fondo: `dark:bg-slate-950`
- ✅ Números: `dark:text-blue-300`

## Principios de Diseño Aplicados

### Jerarquía Visual
1. **Fondo principal**: `slate-900` (#0f1729)
2. **Secciones alternas**: `slate-800` (#1e2838)
3. **Tarjetas/Cards**: `slate-800/40` (semi-transparente)
4. **Inputs**: `slate-900/50`
5. **Bordes**: `slate-700/50`

### Contraste y Legibilidad
- Texto principal: `#e8edf5` (gris azulado muy claro)
- Texto secundario: `foreground/60` o `foreground/50`
- Primarios: azules brillantes (`#4a90ff`, `#38bdf8`)
- Sombras: `black/20` o `black/40` para profundidad

### Consistencia
- Todos los fondos usan la escala `slate-*`
- Todos los bordes usan `slate-700/50`
- Todas las sombras usan `black/*` con opacidad
- Sin fondos blancos o claros en dark mode

## Resultado Final

✅ **Paleta 100% azul**: Sin naranjas, verdes, morados, rojos  
✅ **Dark mode corporativo**: Grises azulados profesionales  
✅ **Sin fondos claros**: Todo oscuro y coherente  
✅ **Contraste adecuado**: Tarjetas distinguibles del fondo  
✅ **Legibilidad**: Textos claros sobre fondos oscuros  
✅ **Profundidad**: Sombras sutiles para jerarquía visual

## Verificación

```bash
# Sin errores de TypeScript
npx tsc --noEmit

# Sin colores no azules
grep -r "purple\|green\|orange\|red\|pink\|yellow" components/
# → Sin resultados
```
