node {
    
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        OLD_IMAGE_ID = sh "docker images -a | grep 'top-words/client' | awk '{print $3}'"
        sh "docker build -t top-words/client ."
        sh "docker rmi ${OLD_IMAGE_ID}"
    }

    stage('Run') {
        sh "docker ps -q --filter ancestor='top-words/client' | xargs -r docker stop"
        sh "docker run --rm -d -p 3000:3000 --name TopWordsClient top-words/client"
    }
}