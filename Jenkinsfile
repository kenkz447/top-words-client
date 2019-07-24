node {
    
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        sh "docker build --rm -t top-words/client ."
    }

    stage('Run') {
        sh "docker ps -q --filter name='TopWordsClient' | xargs -r docker stop"
        sh "docker run --rm -d -p 3000:3000 --name TopWordsClient top-words/client"
        sh "docker rmi $(docker images -f dangling=true -q)"
    }
}