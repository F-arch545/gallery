pipeline{
    agent any
    stages{
        stage("clone code"){
            steps{
                git branch:"master",url:"https://github.com/F-arch545/gallery.git"
            }
        }
        stage("install dependencies"){
            steps{
                sh "npm install"
            }
        }
        stage("test npm"){
            steps{
                sh"npm -v"
            }
        }



        stage("build npm"){
            steps{
                sh "npm run build"
            }
        }
    }
}