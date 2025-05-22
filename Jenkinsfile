pipeline {
    agent any
   environment {
        IMAGE_NAME = "purplept-webapp"
        IMAGE_TAG = "latest"
        AWS_REGION = "us-west-1"
        AWS_DEFAULT_REGION = "us-west-1"
        AWS_ACCOUNT_URL = "https://498470191160.dkr.ecr.us-west-1.amazonaws.com" 
        INSTANCE_IP = '52.8.226.182'
        ACCOUNT = '498470191160'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                echo "${IMAGE_NAME}:${IMAGE_TAG}"
                script {
                def myImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                docker.withRegistry("${AWS_ACCOUNT_URL}", "ecr:us-west-1:aws-purplept-creds") {
                    myImage.push("${IMAGE_TAG}")
                }
                }
            }
        }
       stage('Deploy') {
          steps {
            sshagent (credentials: ['devops-common-credentials']) {
                sh '''
             
                ssh -o StrictHostKeyChecking=no 'jenkins'@$INSTANCE_IP "sh /apps/auto-deploy-webapp.sh"
    
                '''
             }
          }
       }
    }
post { 
        always { 
            cleanWs()
        }
    }
}
