pipeline {
    agent any

    environment {
        DEPLOY_DIR = "/var/www/html/task-tracker"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                rm -rf ${DEPLOY_DIR}/*
                cp -r dist/. $DEPLOY_DIR
                '''
            }
        }
    }
}
