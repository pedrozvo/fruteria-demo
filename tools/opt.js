const sharp=require('sharp');const fs=require('fs');
(async()=>{for(const n of fs.readdirSync('../originales').filter(x=>/\.jpe?g$/i.test(x))){
await sharp('../originales/'+n).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:80}).toFile('../assets/img/'+n.replace(/\.jpe?g$/i,'.webp'));}})();
