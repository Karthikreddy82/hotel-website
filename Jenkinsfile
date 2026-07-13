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
                echo 'Building application...'
                sh 'ls -la'
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
                    sudo rm -rf /var/www/html/*
                    sudo cp -r * /var/www/html/
                    sudo systemctl restart nginx
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'curl http://localhost'
            }
        }
    }
}
