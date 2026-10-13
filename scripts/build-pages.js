import {mkdirSync,readFileSync,writeFileSync,copyFileSync,cpSync} from 'node:fs';
// GitHub Pages 정적 빌드: 서버 없이 브라우저 저장 모드로 동작한다.
mkdirSync('dist',{recursive:true});
cpSync('public/fonts','dist/fonts',{recursive:true});
cpSync('public/assets','dist/assets',{recursive:true});
import {createHash} from 'node:crypto';
// 배포마다 파일 내용 해시로 캐시를 무효화한다 (GitHub Pages는 캐시 헤더를 제어할 수 없음).
const v=createHash('sha1').update(['public/app.js','public/pixels.js','public/style.css','game.js','data.js'].map(f=>readFileSync(f)).join('')).digest('hex').slice(0,8);
copyFileSync('public/style.css','dist/style.css');
copyFileSync('public/pixels.js','dist/pixels.js');
writeFileSync('dist/data.js',readFileSync('data.js','utf8'));
writeFileSync('dist/game.js',readFileSync('game.js','utf8').replace("from './data.js'",`from './data.js?v=${v}'`));
writeFileSync('dist/app.js',readFileSync('public/app.js','utf8').replace("from './game.js'",`from './game.js?v=${v}'`).replace("from './data.js'",`from './data.js?v=${v}'`).replace("from './pixels.js'",`from './pixels.js?v=${v}'`));
writeFileSync('dist/index.html',readFileSync('public/index.html','utf8').replace('<html lang="ko">','<html lang="ko" data-mode="local">').replace(/\?v=\d+/g,'?v='+v));
writeFileSync('dist/.nojekyll','');
console.log('GitHub Pages static build: dist/');
