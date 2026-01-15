pipeline {
    agent any

    tools {
        nodejs 'flozy' 
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/F-arch545/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    echo 'Tests failed.'
                    emailext(
                        subject: "Jenkins Build #${env.BUILD_NUMBER} Failed",
                        body: "Build failed during tests. Please check the Jenkins logs for more details.",
                        to: 'riunguflozy@gmail.com'
                    )
                    error('Tests did not pass.')
                }
                success {
                    echo 'Tests passed.'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Deploy to render'
                sh "curl -X POST https://api.render.com/deploy/srv-d1bfj7er433s739ir9jg?key=5ATnSjZh2qk"
            }
            post {
                success {
                    slackSend(
                        channel: '#all-flozyip1',
                        color: 'good',
                        message: "Deployment Successful Build #${env.BUILD_NUMBER} deployed: https://gallery-9cbe.onrender.com/",
                        teamDomain: 'flozy_ip1',
                        tokenCredentialId: 'SLACK-ID',
                        botUser: true
                    )
                    }
                        }   
        }
    }

    post {
        success {
            echo 'Build and deploy successful.'
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}
