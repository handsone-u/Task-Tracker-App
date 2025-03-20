pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '''
                cd ${WORKSPACE}
                npm install
                npm run build
                sudo rm -rf /var/www/html/*
                sudo cp -r dist/* /var/www/html/
                '''
            }
        }
    }
}
