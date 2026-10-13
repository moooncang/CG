// Original 16 × 16 pixel sprites. Rectangles only; shared, limited palettes.
const ink='#303449',gold='#efbd68',goldLight='#ffe6a0',amber='#b77b48',blue='#88bdd5',blueLight='#c4e3ea',purple='#b6a2d9',purpleLight='#e2d2f1',green='#87bda0',greenLight='#c0dec0',paper='#eee3cb',red='#df9197';
const r=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const box=(x,y,w,h,c)=>r(x,y,w,h,ink)+r(x+1,y+1,w-2,h-2,c);
const sprites={
 coin:()=>r(5,1,6,14,ink)+r(2,4,12,8,ink)+r(3,3,10,10,gold)+r(5,2,6,12,gold)+r(4,4,8,8,goldLight)+r(7,4,2,8,amber)+r(5,5,5,2,gold)+r(6,9,5,2,gold)+r(4,4,2,2,'#fff1c8'),
 book:()=>box(2,2,12,12,purple)+r(4,3,2,10,purpleLight)+r(7,4,5,1,paper)+r(7,6,4,1,paper)+r(6,11,7,2,paper)+r(3,13,10,1,ink),
 desk:()=>box(4,1,9,8,blue)+r(5,2,7,5,'#3c6976')+r(6,3,4,1,greenLight)+r(6,5,5,1,green)+r(8,9,2,2,ink)+box(1,10,14,3,amber)+r(2,13,2,3,ink)+r(12,13,2,3,ink)+r(2,11,12,1,goldLight),
 pencil:()=>r(10,1,3,2,ink)+r(9,3,5,2,ink)+r(10,2,2,2,red)+r(8,4,5,2,ink)+r(6,6,5,2,ink)+r(4,8,5,2,ink)+r(2,10,5,3,ink)+r(2,13,3,2,ink)+r(9,4,2,2,gold)+r(7,6,2,2,gold)+r(5,8,2,2,gold)+r(3,10,2,3,paper)+r(2,14,1,1,ink),
 trophy:()=>box(4,1,8,7,gold)+r(2,2,2,6,ink)+r(12,2,2,6,ink)+r(3,7,3,2,gold)+r(10,7,3,2,gold)+r(6,8,4,2,gold)+r(7,10,2,3,amber)+box(4,12,8,3,gold)+r(5,2,2,4,goldLight),
 heart:()=>r(2,3,5,7,ink)+r(9,3,5,7,ink)+r(4,7,8,5,ink)+r(6,11,4,3,ink)+r(3,4,3,5,red)+r(10,4,3,5,red)+r(5,6,6,5,red)+r(7,11,2,2,red)+r(4,4,2,2,'#ffe1d9'),
 bolt:()=>r(8,1,4,3,ink)+r(6,4,5,3,ink)+r(4,7,10,3,ink)+r(7,10,5,3,ink)+r(6,13,3,3,ink)+r(8,2,3,3,goldLight)+r(6,5,4,3,gold)+r(5,8,8,1,gold)+r(8,9,3,3,gold)+r(7,12,2,2,gold),
 bulb:()=>r(5,1,6,1,ink)+box(3,2,10,8,gold)+r(5,10,6,2,gold)+r(6,12,4,1,blueLight)+r(6,14,4,1,blue)+r(5,3,2,3,goldLight)+r(7,7,2,4,amber)+r(0,6,2,1,gold)+r(14,6,2,1,gold),
 coffee:()=>box(2,5,10,8,paper)+box(11,6,4,5,amber)+r(2,13,12,2,ink)+r(3,6,8,2,amber)+r(4,2,1,2,blueLight)+r(8,1,1,3,blueLight)+r(4,9,2,2,'#fff6de'),
 mail:()=>box(1,4,14,10,paper)+r(2,5,2,2,amber)+r(4,7,2,2,amber)+r(6,9,4,1,amber)+r(10,7,2,2,amber)+r(12,5,2,2,amber)+r(10,1,4,4,red)+r(11,2,2,2,'#ffe1d9'),
 chart:()=>r(2,2,1,13,ink)+r(2,14,13,1,ink)+box(4,9,3,5,green)+box(8,6,3,8,blue)+box(12,2,3,12,gold)+r(5,10,1,3,greenLight)+r(9,7,1,6,blueLight),
 star:()=>r(7,1,2,4,goldLight)+r(5,4,6,3,gold)+r(1,6,14,2,gold)+r(4,8,8,2,gold)+r(4,10,3,3,amber)+r(9,10,3,3,amber)+r(3,13,3,1,gold)+r(10,13,3,1,gold)+r(6,6,3,3,goldLight),
 save:()=>box(2,1,12,14,blue)+r(4,2,7,4,paper)+r(9,2,2,3,ink)+box(4,9,8,5,blueLight)+r(6,10,4,1,'#ffffff')+r(6,12,4,1,'#ffffff'),
 moon:()=>r(6,1,5,2,goldLight)+r(3,3,4,3,goldLight)+r(2,6,4,5,gold)+r(4,11,4,3,gold)+r(7,12,5,2,amber)+r(11,9,3,3,gold)+r(7,2,2,2,ink)+r(12,2,1,3,blueLight)+r(11,3,3,1,blueLight),
 flag:()=>r(3,1,2,14,ink)+r(5,2,8,6,red)+r(6,3,5,2,'#f5b3b3')+r(11,7,3,3,amber)+r(1,14,6,1,blue),
 image:()=>box(1,2,14,12,blue)+r(3,4,3,3,goldLight)+r(2,10,3,3,green)+r(4,8,4,5,green)+r(7,6,3,7,greenLight)+r(10,9,4,4,green)+r(2,13,12,1,paper),
 gear:()=>r(6,1,4,14,ink)+r(1,6,14,4,ink)+r(3,3,10,10,ink)+r(5,3,6,10,blue)+r(3,5,10,6,blue)+r(6,6,4,4,ink)+r(7,7,2,2,blueLight),
 check:()=>box(1,1,14,14,green)+r(3,7,2,3,paper)+r(5,9,2,3,paper)+r(7,7,2,3,paper)+r(9,5,2,3,paper)+r(11,3,2,3,paper),
 warning:()=>r(7,1,2,2,goldLight)+r(6,3,4,2,gold)+r(5,5,6,2,gold)+r(4,7,8,2,gold)+r(3,9,10,2,gold)+r(2,11,12,3,amber)+r(7,5,2,5,ink)+r(7,11,2,2,ink),
 package:()=>box(2,4,12,10,amber)+r(2,4,12,3,gold)+r(7,4,2,10,paper)+r(3,11,3,1,goldLight)+r(4,2,8,2,goldLight),
 arrow:()=>r(8,2,2,2,paper)+r(10,4,2,2,paper)+r(2,7,12,2,paper)+r(10,10,2,2,paper)+r(8,12,2,2,paper),
 plus:()=>r(6,2,4,12,greenLight)+r(2,6,12,4,greenLight)+r(7,3,1,10,paper),
 people:()=>box(3,1,6,6,purple)+box(9,3,5,5,blue)+r(2,8,8,6,purple)+r(10,9,4,5,blue)+r(4,2,3,3,purpleLight)+r(3,9,2,4,purpleLight),
 lock:()=>r(4,1,8,6,ink)+r(5,2,6,5,blue)+r(7,3,2,3,ink)+box(2,6,12,9,amber)+r(3,7,10,3,gold)+r(7,9,2,4,ink),
 sword:()=>r(10,1,4,3,blueLight)+r(8,4,4,2,blueLight)+r(6,6,4,2,blue)+r(4,8,4,2,blue)+r(2,8,2,2,gold)+r(4,10,6,2,gold)+r(3,11,2,3,amber)+r(1,14,3,1,purple),
 scroll:()=>box(3,1,10,13,paper)+r(2,1,3,3,gold)+r(11,12,3,3,gold)+r(5,4,6,1,amber)+r(5,7,5,1,amber)+r(5,10,4,1,amber),
 stress:()=>box(3,3,10,10,red)+r(5,2,6,1,red)+r(1,6,2,4,red)+r(13,6,2,4,red)+r(5,5,2,2,paper)+r(9,5,2,2,paper)+r(6,10,4,1,ink)+r(6,8,1,2,ink)+r(10,8,1,2,ink)
};
export function pixel(name,cls=''){const draw=sprites[name]||sprites.star;return `<svg class="pixel-icon ${cls}" data-pixel="${name}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${draw()}</svg>`;}
export const pixelNames=Object.keys(sprites);
