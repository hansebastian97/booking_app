import sonarqubeScanner from "sonarqube-scanner";

const SONAR_TOKEN = process.env.SONAR_TOKEN;

sonarqubeScanner({
  serverUrl: 'http://192.168.56.140/',
  options : {
  'sonar.projectKey': 'booking_app',
  'sonar.projectVersion': '1.0',
  'sonar.sources': '.',
  'sonar.language': 'js',
  'sonar.sourceEncoding': 'UTF-8',
  'sonar.javascript.lcov.reportPaths': 'coverage/lcov-report/lcov.info',
  'sonar.inclusions' : 'controllers/**/*.js,models/**/*.js,routes/**/*.js,utils/**/*.js', // Entry point of your code
  'sonar.login': SONAR_TOKEN
  }
}, () => {});