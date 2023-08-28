pipeline {
    agent any
    // environment {
    //     IMAGE_NAME = "hansebastian97/jenkins-java"
    // }
    tools {
        maven "MAVEN3"
        jdk "OracleJDK11"
    }

    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'docker',
                credentialsId: 'hansebastian_github',
                url: 'https://github.com/devopshydclub/vprofile-project.git'

            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        // maven Checkstyle
        stage('Code Analysis With Checkstyle') {
            steps {
                sh 'mvn checkstyle:checkstyle'
            }
            post {
                success {
                    echo 'Generated Analysis Result'
                }
            }
        }
       

        // Sonar Scan!
        stage('Build && SonarQube Analysis') {
            environment {
                scannerHome = tool 'sonar4.7'
            }
            // Ngasi tau dimana test result locationnya
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=vprofile \
                   -Dsonar.projectName=vprofile \
                   -Dsonar.projectVersion=1.0 \
                   -Dsonar.sources=src/ \
                   -Dsonar.java.binaries=target/test-classes/com/visualpathit/account/controllerTest/ \
                   -Dsonar.junit.reportsPath=target/surefire-reports/ \
                   -Dsonar.jacoco.reportsPath=target/jacoco.exec \
                   -Dsonar.java.checkstyle.reportPaths=target/checkstyle-result.xml'''
                }
            }

        }
        // Check result pakai quality gate
        stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {   
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build App Image'){
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker-Credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]){
                    sh """
                    echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                    docker image prune -a --force
                    """
                    script {
                        dockerImage = docker.build( "$IMAGE_NAME" + ":latest", "./Docker-files/app/multistage/" )
                    }
                }

            }
        }

        // stage('Upload App Image') {
        //     steps {
        //         sh """  
        //         docker tag  ${IMAGE_NAME}:latest ${IMAGE_NAME}:${BUILD_NUMBER} 
        //         docker push ${IMAGE_NAME}:${BUILD_NUMBER}
        //         """
        //     }
        // }
    //     // Upload Artifacts to Nexus
    //     stage ("Upload Artifacts to Nexus") {
    //         steps {
    //             nexusArtifactUploader (
    //                 nexusVersion: 'nexus3',
    //                 protocol: 'http',
    //                 nexusUrl: '192.168.56.135:8081/',
    //                 groupId: 'Test',
    //                 version: "${env.BUILD_ID}-${env.BUILD_TIMESTAMP}",
    //                 repository: 'vprofile-repo',
    //                 credentialsId: 'NexusLogin',
    //                 artifacts: [
    //                     [
    //                         artifactId: 'vproapp',
    //                         classifier: '',
    //                         file: 'target/vprofile-v2.war',
    //                         type: 'war'
    //                     ]
    //                 ]
    //             )
    //         }
    //     }
    }
    // post {
    //     always {
    //         echo 'Slack Notifications.'
    //         slackSend channel: '#jenkins',
    //         color: COLOR_MAP[currentBuild.currentResult],
    //         message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \nMore info ad: ${env.BUILD_URL}"
    //     }
    // }
}