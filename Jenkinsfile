pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-cred'
        DOCKERHUB_REPO = 'aswanth5631'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/aswanth5631/crud-dd-task-mean-app.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKERHUB_REPO/mean-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $DOCKERHUB_REPO/mean-frontend:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $DOCKERHUB_REPO/mean-backend:latest'
                sh 'docker push $DOCKERHUB_REPO/mean-frontend:latest'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
