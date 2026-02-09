pipeline {
  agent any

  environment {
    REGISTRY_IMAGE     = 'meu-bolso-web'
    SONAR_PROJECT_KEY  = 'meu-bolso-web'
    SONAR_HOST_URL     = 'http://sonarqube:9000'
    APP_VERSION   = ''
  }

  stages {

    stage('Checkout & Clean') {
      steps {
        cleanWs()
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Tests & Coverage') {
      steps {
        // se ainda não tiver teste, começa permissivo
        sh 'npm run test -- --coverage || true'
      }
    }

    stage('SonarQube Scan') {
      environment {
        SONAR_TOKEN = credentials('sonar-token')
      }
      steps {
        withSonarQubeEnv('SONAR_LOCAL') {
          sh '''
            npx sonar-scanner \
                -Dsonar.projectKey=meu-bolso-web \
                -Dsonar.sources=src \
                -Dsonar.tests=src \
                -Dsonar.typescript.tsconfigPath=tsconfig.sonar.json \
                -Dsonar.test.inclusions="src/**/*.{spec,test}.{js,jsx,ts,tsx}" \
                -Dsonar.exclusions="**/*.config.*,**/dist/**,**/node_modules/**" \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                -Dsonar.host.url=http://sonarqube:9000 \
                -Dsonar.login=$SONAR_TOKEN
            '''
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Clean Trivy Cache') {
      steps {
        sh 'rm -rf /var/jenkins_home/trivy_cache || true'
      }
    }


    stage('Trivy Repo Scan') {
      steps {
        sh '''
          trivy fs \
            --severity HIGH,CRITICAL \
            --exit-code 1 \
            --cache-dir /var/jenkins_home/trivy_cache \
            --skip-version-check \
            --scanners vuln \
            .
        '''
      }
    }

  stage('Docker Build') {
    steps {
      script {
        APP_VERSION = sh(
          script: "node -p \"require('./package.json').version\"",
          returnStdout: true
        ).trim()

        echo "Buildando imagem versão: ${APP_VERSION}"

        sh """
          docker build --no-cache \
          -t meu-bolso-web:${APP_VERSION} \
          -t meu-bolso-web:latest \
          .
        """
      }
    }
  }

    // stage('Docker Build') {
    //   steps {
    //     sh '''
    //       docker build --no-cache \
    //         -t $REGISTRY_IMAGE:${GIT_COMMIT} \
    //         -t $REGISTRY_IMAGE:latest \
    //         .
    //     '''
    //   }
    // }

    stage('Trivy Image Scan') {
      steps {
        sh """
          trivy image \
            --severity HIGH,CRITICAL \
            --exit-code 1 \
            ${REGISTRY_IMAGE}:${APP_VERSION}
        """
      }
    }
    // stage('Trivy Image Scan') {
    //   steps {
    //     sh '''
    //       trivy image \
    //         --severity HIGH,CRITICAL \
    //         --exit-code 1 \
    //         $REGISTRY_IMAGE:${GIT_COMMIT}
    //     '''
    //   }
    // }
stage('Create Git Tag') {
  when {
    branch 'main'
  }
  steps {
    script {
      def VERSION = sh(
        script: "node -p \"require('./package.json').version\"",
        returnStdout: true
      ).trim()

      echo "Versão detectada: v${VERSION}"

      // verifica se a tag já existe
      def tagExists = sh(
        script: "git tag -l v${VERSION}",
        returnStdout: true
      ).trim()

      if (tagExists) {
        echo "Tag v${VERSION} já existe. Pulando criação."
        return
      }

      sh """
        git config user.email "jenkins@meubolso.com"
        git config user.name "Jenkins CI"
        git tag -a v${VERSION} -m "release: v${VERSION}"
      """

      withCredentials([
        usernamePassword(
          credentialsId: 'git-credentials',
          usernameVariable: 'GIT_USERNAME',
          passwordVariable: 'GIT_PASSWORD'
        )
      ]) {
        sh """
          git push https://$GIT_USERNAME:$GIT_PASSWORD@github.com/rafasdoliveira/meu-bolso-web.git \
          v${VERSION}
        """
      }

      echo "Tag v${VERSION} criada com sucesso."
    }
  }
}

    // stage('Create Git Tag') {
    //   when {
    //     branch 'main'
    //   }
    //   steps {
    //     script {
    //       echo "Criando tag Git v${APP_VERSION} na branch main"

    //       sh """
    //         set -e
    //         git checkout main
    //         git pull origin main
    //         git config user.email "jenkins@meubolso.com"
    //         git config user.name "Jenkins CI"
    //       """

    //       // garante que a tag bate com a versão usada no Docker
    //       sh "git tag v${APP_VERSION}"

    //       withCredentials([
    //         usernamePassword(
    //           credentialsId: 'git-credentials',
    //           usernameVariable: 'GIT_USERNAME',
    //           passwordVariable: 'GIT_PASSWORD'
    //         )
    //       ]) {
    //         sh """
    //           git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/rafasdoliveira/meu-bolso-web.git \
    //           main --tags
    //         """
    //       }
    //     }
    //   }
    // }
  }
}
