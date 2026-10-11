import {mkdirSync,readFileSync,writeFileSync,copyFileSync,cpSync} from 'node:fs';
// GitHub Pages 정적 빌드: 서버 없이 브라우저 저장 모드로 동작한다.
mkdirSync('dist',{recursive:true});
cpSync('public/fonts','dist/fonts',{recursive:true});
for(const file of ['app.js','style.css'])copyFileSync('public/'+file,'dist/'+file);
for(const file of ['game.js','data.js'])copyFileSync(file,'dist/'+file);
writeFileSync('dist/index.html',readFileSync('public/index.html','utf8').replace('<html lang="ko">','<html lang="ko" data-mode="local">'));
writeFileSync('dist/.nojekyll','');
console.log('GitHub Pages static build: dist/');
