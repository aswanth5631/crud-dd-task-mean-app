In this DevOps task, you need to build and deploy a full-stack CRUD application using the MEAN stack (MongoDB, Express, Angular 15, and Node.js). The backend will be developed with Node.js and Express to provide REST APIs, connecting to a MongoDB database. The frontend will be an Angular application utilizing HTTPClient for communication.  

The application will manage a collection of tutorials, where each tutorial includes an ID, title, description, and published status. Users will be able to create, retrieve, update, and delete tutorials. Additionally, a search box will allow users to find tutorials by title.

## Project setup

### Node.js Server

cd backend

npm install

You can update the MongoDB credentials by modifying the `db.config.js` file located in `app/config/`.

Run `node server.js`

### Angular Client

cd frontend

npm install

Run `ng serve --port 8081`

You can modify the `src/app/services/tutorial.service.ts` file to adjust how the frontend interacts with the backend.

Navigate to `http://localhost:8081/`

Step-by-step procedure done for this project

1. Launced an ec2 instance in (Aws) with ubuntu os allowed security 22-SSH , 80-Frontend , 8080-backend , 9090 for jenkins
2. ssh into it and installed docker Node.js, angular and nginx, mongodb and jenkins
3. created a dockerfile as: Backend
   dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
4. created a dockerfile as: Frontend
   ```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/angular-15-crud/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

5. In docker-compose.yml changed the username ang github repository and port number
6. Created image from the docker file
7. Pushes the image to the dockerhub
8. Builded the image to containers
9. installed and configured jenkins as portno:9090 as 8080 was assainged to backend
10. Installed the plugins which i needed git,github,docker pipeline,stageview plugins etc..
11. created credentials for dockerhub and privatekey
12. created a job and assigns
                           Checkout code from Github
                           Build backend image
                           Build frontend image
                           Docker login
                           Pushes images to dockerhub
                           And deploy using docker compose
13. Created a pipeline script as following
      pipeline {
agent any

stages {

stage('Clone Repo') {
steps {
git 'https://github.com/aswanth5631/crud-dd-task-mean-app.git'
}
}

stage('Build Backend') {
steps {
dir('backend') {
sh 'docker build -t aswanth5631/mean-backend:latest .'
}
}
}

stage('Build Frontend') {
steps {
dir('frontend') {
sh 'docker build -t aswanth5631/mean-frontend:latest .'
}
}
}

stage('Docker Login') {
steps {
withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
sh 'echo $PASS | docker login -u $USER --password-stdin'
}
}
}

stage('Push Images') {
steps {
sh 'docker push aswanth5631/mean-backend:latest'
sh 'docker push aswanth5631/mean-frontend:latest'
}
}

stage('Deploy') {
steps {
sh 'docker-compose down || true'
sh 'docker-compose up -d'
}
}
}
}

14. (faced some errors and succusfulling debugged the pipeline till deployment
Although the pipeline was succesfully runned but faced some issues on ending 
Due to time constraints, I regret that I was not able to complete the project in a fully professional manner.
here are the screenshots:



