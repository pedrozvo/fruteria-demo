# La Palestina · Frutería y abarrotes en Coyhaique

Maqueta de sitio web informativo (landing page) para **La Palestina**, frutería y local de abarrotes ubicado en Av. Ogana 1029, Coyhaique, Chile. Construida con **HTML, CSS y JavaScript puros**, sin frameworks ni dependencias en tiempo de ejecución, optimizada para carga rápida, accesibilidad (WCAG AA) y adaptación móvil.

- **Demo en vivo**: https://pedrozvo.github.io/fruteria-demo/

---

## Qué incluye la página

- **Hero con video de fondo**: reproducción automática silenciada en bucle (`hero.mp4` H.264 SDR 8 bits y respaldo `hero.webm` VP9), poster de carga y control discreto de pausa/reproducción cuando el sistema tiene activada la preferencia de movimiento reducido (`prefers-reduced-motion`).
- **Venta al detalle y al por mayor (`#venta`)**: accesos directos a WhatsApp con mensajes precargados diferenciados para compras del hogar y consultas por volumen.
- **Catálogo por categorías y productos destacados (`#productos`)**:
  - Grilla de 6 categorías con íconos SVG y contenedor de imagen preparado para futuras fotografías (*Frutas y verduras frescas*, *Abarrotes*, *Lácteos*, *Frutos secos*, *Alimento para mascotas* y *Productos para la comunidad extranjera*).
  - Selección de frutas y verduras destacadas y galería del local con visor ampliado (`<dialog>` lightbox).
- **Quiénes somos (`#historia`)**: presentación del local con fotografía en arco y elementos de identidad cultural sutil (rama de olivo y nombre bilingüe español/árabe en tipografía *Amiri*).
- **Visítanos (`#visitanos`)**: dirección, acciones rápidas (WhatsApp, Cómo llegar en Google Maps y llamada telefónica), tabla de horarios con indicador dinámico **Abierto ahora / Cerrado** calculado según el huso horario de Chile (`America/Santiago`), fotografía de fachada y mapa interactivo.
- **Barra móvil y botón flotante**: barra fija inferior de acciones rápidas en pantallas móviles y botón flotante de WhatsApp en escritorio.
- **SEO y datos estructurados**: metadatos Open Graph / Twitter Card, datos estructurados Schema.org (`GroceryStore`) y directiva `noindex, nofollow` mientras permanece como demostración.

---

## Estructura de carpetas

```text
.
├── index.html                  # Documento principal (HTML5 semántico, SVG inline y JSON-LD)
├── README.md                   # Documentación del proyecto
├── .gitignore                  # Exclusión de archivos originales pesados y herramientas locales
└── assets/
    ├── css/
    │   └── style.css           # Estilos, variables de paleta, layout responsivo y accesibilidad
    ├── js/
    │   └── main.js             # Menú móvil, control de video, lightbox, estado horario y animaciones
    ├── img/                    # Fotografías optimizadas en WebP, imagen Open Graph, logo y favicon
    └── video/
        ├── hero.mp4            # Video del hero en H.264 High (8 bits SDR, faststart)
        └── hero.webm           # Respaldo del video del hero en WebM (VP9)
```

*(Las carpetas locales `/originales/` y `/tools/`, junto con los archivos fuente `.MOV` y `.JPG`, están excluidos del repositorio mediante `.gitignore`).*

---

## Cómo verla en local

Al tratarse de un sitio estático sin paso de compilación, basta con servir la raíz del proyecto desde cualquier servidor HTTP local:

```bash
# Opción 1: con Python 3
python -m http.server 8080

# Opción 2: con Node.js (npx serve)
npx serve -l 8080 .
```

Luego abre `http://localhost:8080` en el navegador.

---

## Publicación en GitHub Pages

El proyecto se despliega automáticamente en **GitHub Pages** desde la rama `main` (raíz `/`) mediante el flujo `pages-build-deployment` de GitHub Actions cada vez que se realiza un `git push origin main`.

---

## Derechos y aviso legal

Las fotografías, el logo y los datos pertenecen a La Palestina y se usan con fines de demostración.

© La Palestina. **Todos los derechos reservados.** No se otorga licencia abierta sobre el código, las imágenes ni la identidad visual contenidos en este repositorio.
