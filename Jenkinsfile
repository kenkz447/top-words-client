node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        sh "sudo docker build -t top-words/client ."
    }

    stage('Run') {
        sh "sudo docker stop"
        sh "sudo docker run --rm -d -p 49160:3000 --name TopWordsClient top-words/client"
    }
}