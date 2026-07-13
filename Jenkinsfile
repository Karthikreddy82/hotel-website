pipeline {
    agent any

    environment {
        IMAGE_NAME = "karthik56t/hotel-website"
        CONTAINER_NAME = "hotel-container"
        PORT = "8081"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh '''
                docker build -t hotel-website .
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login \
                    -u $DOCKER_USER --password-stdin

                    docker tag hotel-website \
                    $IMAGE_NAME:latest

                    docker push \
                    $IMAGE_NAME:latest

                    docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Stopping old container..."

                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true

                echo "Pulling latest image..."

                docker pull $IMAGE_NAME:latest

                echo "Starting new container..."

                docker run -d \
                --name $CONTAINER_NAME \
                -p $PORT:80 \
                $IMAGE_NAME:latest
                '''
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying application...'

                sh '''
                sleep 5
                curl -f http://localhost:$PORT
                '''
            }
        }
    }

    post {

        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check logs.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
