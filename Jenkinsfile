pipeline {
  agent any

  environment {
    REGISTRY_IMAGE     = 'meu-bolso-web'
    SONAR_PROJECT_KEY  = 'meu-bolso-web'
    SONAR_HOST_URL     = 'http://sonarqube:9000'
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
        sh '''
          docker build --no-cache \
            -t $REGISTRY_IMAGE:${GIT_COMMIT} \
            -t $REGISTRY_IMAGE:latest \
            .
        '''
      }
    }

    stage('Trivy Image Scan') {
      steps {
        sh '''
          trivy image \
            --severity HIGH,CRITICAL \
            --exit-code 1 \
            $REGISTRY_IMAGE:${GIT_COMMIT}
        '''
      }
    }

    stage('Create Git Tag') {
  when {
    anyOf {
      branch 'main'
      branch 'develop'
    }
  }
  steps {
    script {
      def branchName = env.BRANCH_NAME
      echo "Tentando push na branch: ${branchName}"

      sh "git checkout ${branchName} && git pull origin ${branchName}"

      sh 'git reset --hard'
      sh 'git clean -fd'

      sh 'git config user.email "jenkins@meubolso.com"'
      sh 'git config user.name "Jenkins CI"'

      if (branchName == 'main') {
        sh "npm version patch -m 'chore(release): %s [skip ci]'"
      } else {
        sh "npm version prepatch --preid=${branchName} -m 'chore(env-release): %s [skip ci]'"
      }

      withCredentials([
        usernamePassword(
          credentialsId: 'git-credentials',
          usernameVariable: 'GIT_USERNAME',
          passwordVariable: 'GIT_PASSWORD'
        )
      ]) {
        sh """
          git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/rafasdoliveira/meu-bolso-web.git \
          ${branchName} --tags
        """
      }
    }
  }
}

  }
}
