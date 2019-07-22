node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        steps {
            sh "docker build -t top-words/client"
        }
    }

    stage('Run') {
        steps {
            sh "docker stop"
            sh "docker run --rm -d -p 49160:3000 --name TopWordsClient top-words/client"
        }
    }
}