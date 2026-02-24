pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'aswanth5631/mean-backend'
        DOCKER_IMAGE_FRONTEND = 'aswanth5631/mean-frontend'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url 'https://github.com/aswanth5631/crud-dd-task-mean-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_BACKEND:latest ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND:latest ./frontend'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $DOCKER_IMAGE_BACKEND:latest'
                sh 'docker push $DOCKER_IMAGE_FRONTEND:latest'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ec2-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@3.108.185.95 << EOF
                    cd ~/crud-dd-task-mean-app
                    docker-compose pull
                    docker-compose down
                    docker-compose up -d
                    EOF
                    '''
                }
            }
        }
    }
}
