# himusic_backend
백엔드
npm init //   
npm install -g nodemon // 서버 변경사항 시 자동 재실행   
실행은 : nodemon app (cmd 이외의 터미널(ex vscode)에서 하려면 https://singa-korean.tistory.com/21 참조)   
npm install amazon-cognito-identity-js-node // only AWS cognito 사용   
npm install dotenv // 환경변수(.env) 사용하기 위함   
npm install axios // 비동기 request   
npm install multer //  s3와 비동기 통신     
npm install multer-s3// s3와 비동기 통신    
npm install moment // timestemp(데이터 끼리 겹치지 않게 이름에 timestemp 추가해줌)   


Server에 배포   
// ncp micro server ( Ubuntu 16 )   
putty로 FE/BE 작동시킴.   
putty 끄면 FE 죽으므로 tmux 이용   
tmux : https://m.blog.naver.com/kimmingul/221339305735배포    
