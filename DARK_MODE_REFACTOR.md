# Refactorización Completa de Modo Oscuro - Paleta VS Code

## Problema Identificado
El texto aparece en blanco sobre fondos blancos en modo oscuro, causando ilegibilidad total.

## Solución: Paleta VS Code Oscuro

### Colores Base
```css
--background: #1e1e1e (fondo principal)
--foreground: #d4d4d4 (texto principal)
--primary: #569cd6 (azul VS Code)
--primary-light: #6aaee6 (azul claro)
--primary-dark: #4a8cc7 (azul oscuro)
```

### Fondos en Modo Oscuro
- `bg-white` → `bg-white dark:bg-[#2d2d30]`
- `bg-gray-50` → `bg-gray-50 dark:bg-[#252526]`
- `bg-background` → `bg-white dark:bg-[#2d2d30]` (para cards)
- `bg-slate-900` → `bg-slate-900 dark:bg-[#1e1e1e]`

### Texto en Modo Oscuro
- `text-foreground` → `text-gray-900 dark:text-[#ffffff]` (títulos principales)
- `text-gray-900` → `text-gray-900 dark:text-[#ffffff]` (títulos)
- `text-gray-600` → `text-gray-600 dark:text-[#d4d4d4]` (texto body)
- `text-gray-500` → `text-gray-500 dark:text-[#a6a6a6]` (texto muted)
- `text-gray-400` → `text-gray-400 dark:text-[#858585]` (texto disabled)

### Bordes en Modo Oscuro
- `border-gray-200` → `border-gray-200 dark:border-[#3c3c3c]`
- `border-foreground/10` → `border-gray-200 dark:border-[#3c3c3c]`

### Colores Primarios en Modo Oscuro
- `text-primary` → `text-primary dark:text-primary-light`
- `bg-primary/10` → `bg-primary/10 dark:bg-primary/20`
- `hover:text-primary` → `hover:text-primary dark:hover:text-primary-light`

### Sombras en Modo Oscuro
- Agregar `dark:shadow-lg dark:shadow-black/20` a cards
- Agregar `dark:shadow-black/40` a elementos elevados

## Archivos a Actualizar

1. ✅ globals.css - Paleta actualizada
2. ✅ Benefits.tsx - Parcialmente actualizado
3. ⏳ Services.tsx
4. ⏳ Process.tsx
5. ⏳ CaseStudies.tsx
6. ⏳ Contact.tsx
7. ⏳ CTA.tsx
8. ⏳ FAQ.tsx
9. ⏳ Footer.tsx
10. ⏳ Header.tsx
11. ⏳ Hero.tsx
12. ⏳ Stats.tsx
13. ⏳ Technologies.tsx
14. ⏳ Testimonials.tsx
15. ⏳ TrustedBy.tsx
