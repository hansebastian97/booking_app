pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('BOOKING_APP_TOKEN')
        IMAGE_NAME = 'booking_app_api'
        PATH = "$PATH:/usr/local/bin"
    }
    tools {
        maven "MAVEN3"
        nodejs 'NodeJS_18.17.1'
    }

    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main',
                credentialsId: 'hansebastian_github',
                url: 'https://github.com/hansebastian97/booking_app.git'

            }
        }

        stage('Build App Image'){
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Test with SonarQube') {
            steps {
                withCredentials([string(credentialsId: 'BOOKING_APP_TOKEN', variable: 'SONAR_TOKEN')]) {
                    script {
                        sh 'docker exec -e SONAR_TOKEN:$SONAR_TOKEN booking_app-api yarn run sonar'
                    }
                }
                // Run SonarQube analysis inside the 'booking_app_api' container
                
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {   
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        // stage('Test') {
        //     steps{
        //         withCredentials([string(credentialsId: 'BOOKING_APP_TOKEN', variable: 'SONAR_TOKEN')]) {
        //             script {
        //                 sonarqubeScanner (
        //                     serverUrl: 'http://192.168.56.140/',
        //                     options: [
        //                         'sonar.projectKey': 'booking-app-api',
        //                         'sonar.projectVersion': '1.0',
        //                         'sonar.sources': '.',
        //                         'sonar.language': 'js',
        //                         'sonar.sourceEncoding': 'UTF-8',
        //                         'sonar.javascript.lcov.reportPaths': 'coverage/lcov-report/lcov.info',
        //                         'sonar.inclusions': 'controllers/**/*.js,routes/**/*.js',
        //                         'sonar.login': '$SONAR_TOKEN',
        //                         'sonar.scm.disabled': 'true'
        //                     ]
        //                 )
        //             }
        //         }
        //     }

        // }

        // maven Checkstyle
        // stage('Code Analysis With Checkstyle') {
        //     steps {
        //         sh 'mvn checkstyle:checkstyle'
        //     }
        //     post {
        //         success {
        //             echo 'Generated Analysis Result'
        //         }
        //     }
        // }
       

        // Sonar Scan!
        // stage('Build && SonarQube Analysis') {
        //     environment {
        //         scannerHome = tool 'sonar4.7'
        //     }
        //     // Ngasi tau dimana test result locationnya
        //     steps {
        //         withSonarQubeEnv('sonar') {
        //             sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=vprofile \
        //            -Dsonar.projectName=vprofile \
        //            -Dsonar.projectVersion=1.0 \
        //            -Dsonar.sources=src/ \
        //            -Dsonar.java.binaries=target/test-classes/com/visualpathit/account/controllerTest/ \
        //            -Dsonar.junit.reportsPath=target/surefire-reports/ \
        //            -Dsonar.jacoco.reportsPath=target/jacoco.exec \
        //            -Dsonar.java.checkstyle.reportPaths=target/checkstyle-result.xml'''
        //         }
        //     }

        // }
        // Check result pakai quality gate
        // stage("Quality Gate") {
        //     steps {
        //         timeout(time: 1, unit: 'HOURS') {   
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

        // stage('Build App Image'){
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'Docker-Credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]){
        //             sh """
        //             echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
        //             docker image prune -a --force
        //             """
        //             script {
        //                 dockerImage = docker.build( "$IMAGE_NAME" + ":latest", "./Docker-files/app/multistage/" )
        //             }
        //         }

        //     }
        // }

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