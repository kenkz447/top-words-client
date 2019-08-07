node {
  PORT              = 3000
  IMAGE_NAME        = "top-words/client";
  CONTAINER_NAME    = "TopWordsClient";

  OLD_CONTAINER_ID  = sh (
    script: "docker ps -qa --filter name=${CONTAINER_NAME}",
    returnStdout: true
  )

  stage('Clone repository') {
    checkout scm
  }

  stage('Build image') {
    sh "docker build --rm -t ${IMAGE_NAME} ."
  }

  stage('Run') {
    if(OLD_CONTAINER_ID) {
      sh "docker stop ${OLD_CONTAINER_ID}"
      sh "docker rm ${OLD_CONTAINER_ID}"
    }

    sh "docker run -d -p ${PORT}:${PORT} -dit --restart unless-stopped  --name ${CONTAINER_NAME} ${IMAGE_NAME}"
  }

  stage('Clean') {
    sh "docker system prune"
  }
}