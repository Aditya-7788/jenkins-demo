pipeline {
    agent any
    tools { nodejs 'node18' }

    stages {
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('Test') {
            steps { sh 'npm test' }
            post {
                // Publish JUnit-style XML report
                always { junit 'junit.xml' }
            }
        }
        stage('Deploy') {
            // Deploy only if tests passed and branch is main
            when { branch 'main' }
            steps {
                sh '''
                    # Copy files to app folder and restart
                    rsync -av --exclude node_modules ./ /var/www/app/
                    cd /var/www/app && npm ci --omit=dev
                    pm2 restart app || pm2 start index.js --name app
                '''
            }
        }
    }
}
