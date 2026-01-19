pipeline {
    agent any

    tools {
        nodejs 'flozy'
    }

    environment {
        RENDER_SERVICE_ID = 'srv-d1bfj7er433s739ir9jg'
        RENDER_URL = 'https://my-ip-28ez.onrender.com/'
        SLACK_CHANNEL = '#all-flozyip1'
        TEAM_DOMAIN = 'flozy_ip1'
        SLACK_CRED = 'SLACK-ID'
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/F-arch545/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
            post {
                failure {
                    echo 'Tests failed.'
                    slackSend(
                        channel: "${env.SLACK_CHANNEL}",
                        color: 'danger',
                        message: "❌ Tests failed — Build #${env.BUILD_NUMBER}. Check Jenkins console output.",
                        teamDomain: "${env.TEAM_DOMAIN}",
                        tokenCredentialId: "${env.SLACK_CRED}",
                        botUser: true
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
                withCredentials([string(credentialsId: 'RENDER_DEPLOY_KEY', variable: 'RENDER_KEY')]) {
                    echo 'Deploying to Render...'
                    bat "curl -X POST https://api.render.com/deploy/${env.RENDER_SERVICE_ID}?key=%RENDER_KEY%"
                }
            }
            post {
                success {
                    slackSend(
                        channel: "${env.SLACK_CHANNEL}",
                        color: 'good',
                        message: "✅ Deploy success — Build #${env.BUILD_NUMBER} → ${env.RENDER_URL}",
                        teamDomain: "${env.TEAM_DOMAIN}",
                        tokenCredentialId: "${env.SLACK_CRED}",
                        botUser: true
                    )
                }
                failure {
                    slackSend(
                        channel: "${env.SLACK_CHANNEL}",
                        color: 'danger',
                        message: "❌ Deploy FAILED — Build #${env.BUILD_NUMBER}. Check Jenkins console output.",
                        teamDomain: "${env.TEAM_DOMAIN}",
                        tokenCredentialId: "${env.SLACK_CRED}",
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
