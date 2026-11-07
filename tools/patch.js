const fs=require('fs');let h=fs.readFileSync('../index.html','utf8');
const wa='https://wa.me/56973490781?text=Hola%2C%20quisiera%20consultar%20por%20fruta';
h=h.split('https://wa.me/[NÚMERO CON CÓDIGO DE PAÍS]').join(wa);
h=h.replace('<html lang="es">','<html lang="es-CL">').split('[CIUDAD]').join('Coyhaique');
h=h.replace('content="es_LA"','content="es_CL"');
h=h.replace('content="assets/img/Frontis.webp"','content="https://pedrozvo.github.io/fruteria-demo/assets/img/Frontis.webp"');
h=h.replace('<meta name="twitter:card" content="summary_large_image">','<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="https://pedrozvo.github.io/fruteria-demo/assets/img/Frontis.webp">\n<meta property="og:url" content="https://pedrozvo.github.io/fruteria-demo/">');
h=h.replace(/<link rel="icon"[^>]*>/,`<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">`);
// historia
h=h.replace(/<p class="eyebrow">Nuestra historia<\/p>\s*<h2>[^<]*<\/h2>\s*<p>\[TEXTO[^<]*<\/p>\s*<p>\[TEXTO[^<]*<\/p>/,
`<p class="eyebrow">La Palestina</p>
      <h2>Quiénes somos</h2>
      <p>Somos la frutería de tu barrio en Coyhaique: fruta fresca y atención cercana.</p>`);
h=h.replace('<li><a href="#historia">Historia</a></li>','<li><a href="#historia">Quiénes somos</a></li>');
// visitanos
const days=[['Lunes','9:00 a.m.–8:00 p.m.'],['Martes','9:00 a.m.–8:00 p.m.'],['Miércoles','9:00 a.m.–8:00 p.m.'],['Jueves','9:00 a.m.–8:00 p.m.'],['Viernes','9:00 a.m.–8:00 p.m.'],['Sábado','9:00 a.m.–8:00 p.m.'],['Domingo','9:30 a.m.–2:30 p.m.']];
h=h.replace(/<ul class="info">[\s\S]*?<\/ul>/,`<ul class="info">
          <li><strong>Dirección</strong> Av. Ogana 1029, Coyhaique, Chile</li>
          <li><strong>Horario</strong>
            <table class="hours"><tbody>${days.map(d=>`<tr><th scope="row">${d[0]}</th><td>${d[1]}</td></tr>`).join('')}</tbody></table>
          </li>
        </ul>`);
h=h.replace(/src="https:\/\/www.google.com\/maps[^"]*"/,'src="https://www.google.com/maps?q=Av.%20Ogana%201029%2C%20Coyhaique%2C%20Chile&output=embed"');
// footer
h=h.replace(/<footer[\s\S]*?<\/footer>/,`<footer class="footer">
  <ul class="social">
    <li><a href="https://www.instagram.com/la.palestina/" target="_blank" rel="noopener">Instagram @la.palestina</a></li>
    <li><a href="https://www.facebook.com/ComercialLaPalestina/" target="_blank" rel="noopener">Facebook</a></li>
  </ul>
  <p>© <span id="year">2026</span> La Palestina. Todos los derechos reservados.</p>
</footer>`);
// json-ld
const ld={"@context":"https://schema.org","@type":"FruitShop","name":"La Palestina","url":"https://pedrozvo.github.io/fruteria-demo/","image":"https://pedrozvo.github.io/fruteria-demo/assets/img/Frontis.webp","telephone":"+56973490781","address":{"@type":"PostalAddress","streetAddress":"Av. Ogana 1029","addressLocality":"Coyhaique","addressCountry":"CL"},"sameAs":["https://www.instagram.com/la.palestina/","https://www.facebook.com/ComercialLaPalestina/"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"09:00","closes":"20:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"09:30","closes":"14:30"}]};
h=h.replace('</head>',`<script type="application/ld+json">${JSON.stringify(ld)}</script>\n</head>`);
fs.writeFileSync('../index.html',h);
fs.writeFileSync('../assets/img/favicon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#007A3D"/><text x="32" y="46" font-family="Georgia,serif" font-weight="700" font-size="40" text-anchor="middle" fill="#FAF7F0">P</text></svg>`);
let c=fs.readFileSync('../assets/css/style.css','utf8');
c=c.replace('background:#25D366','background:#007A3D;border:2px solid #fff');
c+=`
.hours{border-collapse:collapse;width:100%;margin-top:.25rem}
.hours th,.hours td{padding:.2rem 0;text-align:left;font-weight:400}
.hours th{width:40%}
.social{list-style:none;padding:0;display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-bottom:.75rem}
.footer a{text-decoration:underline;text-underline-offset:3px}
.nav a:focus-visible,.footer a:focus-visible,.btn:focus-visible{outline-color:#fff}
.wa-float:focus-visible{outline:3px solid var(--deep);outline-offset:3px}
`;
fs.writeFileSync('../assets/css/style.css',c);
