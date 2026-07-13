pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t hotel-website .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                 docker stop hotel-container || true
                 docker rm hotel-container || true

                docker run -d \
                --name hotel-container \
                -p 8081:80 \
                hotel-website
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'curl http://localhost:8081'
            }
        }
    }
}
