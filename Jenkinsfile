node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        sh "docker build -t top-words/client"
    }

    stage('Run') {
        sh "docker stop"
        sh "docker run --rm -d -p 49160:3000 --name TopWordsClient top-words/client"
    }
}