node {
    
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        sh "docker build --rm -t top-words/client ."
    }

    stage('Run') {
        sh "docker ps -q --filter ancestor='top-words/client' | xargs -r docker stop"
        sh "docker run --rm -d -p 3000:3000 --name TopWordsClient top-words/client"
    }
}