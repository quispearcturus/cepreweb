pipeline {
    agent any

    stages {
        stage('Clonar Repositorio') {
            steps {
                // Clona el repositorio de tu proyecto desde tu sistema de control de versiones
                git 'https://github.com/quispearcturus/cepreweb.git'
            }
        }

        stage('Instalar Dependencias') {
            steps {
                // Instala las dependencias de Angular
                sh 'npm install'
            }
        }

        stage('Compilar Angular') {
            steps {
                // Compila tu proyecto Angular
                sh 'ng build --prod'
            }
        }

        stage('Desplegar a Servidor') {
            steps {
                // Aquí puedes agregar comandos para desplegar tu aplicación en un servidor
                // Por ejemplo, copiar los archivos generados en el paso anterior a un servidor web.
            }
        }
    }

    post {
        success {
            // Puedes agregar acciones que se ejecutarán después de una compilación exitosa
        }
        failure {
            // Puedes agregar acciones que se ejecutarán después de una compilación fallida
        }
    }
}