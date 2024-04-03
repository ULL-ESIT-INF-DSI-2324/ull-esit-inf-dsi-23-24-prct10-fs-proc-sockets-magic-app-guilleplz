
# Practica 9: Aplicación para coleccionistas de cartas Magic

**Alumno:** *Guillermo Plaza Gayán - <alu0101495354@ull.edu.es>*

**Fecha:** 12/03/2024

**Estudios:** Ingeniería Informática

**Asignatura:** Desarrollo en Sistemas Informáticos

**Profesor:** Eduardo Manuel Segredo González

**Badges:**

# Indice

- [Practica 9: Aplicación para coleccionistas de cartas Magic](#practica-9-aplicación-para-coleccionistas-de-cartas-magic)
- [Indice](#indice)
- [Objetivo](#objetivo)
- [Requisitos previos](#requisitos-previos)
  - [Asignación del repositorio](#asignación-del-repositorio)
  - [Creación del entorno de desarrollo](#creación-del-entorno-de-desarrollo)
    - [Estructura de directorios](#estructura-de-directorios)
    - [Inicialización de node](#inicialización-de-node)
    - [typescript](#typescript)
    - [Eslint](#eslint)
    - [typedoc](#typedoc)
    - [mocha y chai](#mocha-y-chai)
    - [Coverage](#coverage)
    - [Chalk](#chalk)
    - [Yargs](#yargs)
    - [Tipos de node](#tipos-de-node)
  - [Uso de módulos ESM](#uso-de-módulos-esm)
  - [GitHub Actions](#github-actions)

---

# Objetivo

El objetivo de la práctica consiste en desarrollar una aplicación **cliente-servidor** para coleccionistas de cartas Magic. La aplicación debe permitir la interacción simultánea de múltiples usuarios a través de la línea de comandos del cliente, realizando operaciones como **añadir**, **modificar**, **eliminar**, **listar** y **mostrar** cartas en la colección de un usuario. El servidor debe gestionar estas peticiones de manera eficiente, utilizando **sockets** para la comunicación entre cliente y servidor. La información de las cartas se almacenará en ficheros JSON en el sistema de ficheros, siguiendo una estructura de directorios por usuario. Además, se deben implementar **pruebas unitarias** para garantizar el correcto funcionamiento del código, así como flujos de trabajo en **GitHub Actions** para automatizar las pruebas en diferentes entornos y versiones de Node.js, enviar datos de cobertura a Coveralls y realizar análisis de calidad y seguridad del código fuente en Sonar Cloud. El desarrollo debe seguir los principios **SOLID** de diseño orientado a objetos y se debe incluir documentación mediante el uso de **TypeDoc**.

---

# Requisitos previos

## Asignación del repositorio

Para empezar con la practica deberemos aceptar la asignación del repositorio en GitHubClassroom. Una vez realizada la asignación clonaremos el repositorio en nuestra máquina virtual con el comando `git clone git@github.com:ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-guilleplz.git` en la carpeta de prácticas.

## Creación del entorno de desarrollo

Hecho este paso, ya podemos empezar a levantar nuestro entorno de desarrollo e instalar los distintos paquetes:

### Estructura de directorios

Los primero que haremos será crear los directorios que nos harán falta. ejecutaremos los siguientes comandos:

``` bash

mkdir dist
mkdir src
mkdir test
```

la estructura del directorio quedará de la siguiente manera:

- **Practica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic** (repositorio y directorio base)
  - **dist** (esta carpeta contendrá todos los archivos .js que han sido compilados con typescript)
    - *archivos.js*
  - **src** (esta carpeta contendrá los archivos fuente con código typescript antes de ser compilados)
    - *archivos.ts*
  - **test** (Esta carpeta contendrá todos los archivos .spec.ts que contienen el código de las pruebas)
    - *archivos.spec.ts*
  - **cartas** (En esta carpeta se alojarán todas las colecciones de cartas de los distintos usuarios)
    - **usuario_ejemplo**
      - *usuario_ejemplo.json*
  
  - .gitignore (contiene los directorios node_modules y dist que no queremos subir a github)
  - README.md  (Contiene el informe)
  - resto de ficheros

### Inicialización de node

Usaremos el comando `npm init --yes` para iniciar node en este repositorio. Como podremos ver, se generará un fichero **package.json** con la siguiente información:

``` json
  
  {
  "name": "ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-guilleplz",
  "version": "1.0.0",
  "description": "**Alumno:** *Guillermo Plaza Gayán - alu0101495354@ull.edu.es*",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Este fichero contendrá la información de nuestro proyecto, las dependencias y distintas configuraciones que podremos cambiar más tarde.

### typescript

Deberemos añadir la dependencia typescript para poder usar el tipado en nuestro proyecto. Por lo tanto, introduciremos el comando `tsc --init` y se generará un nuevo fichero llamado tsconfig con la configuración por defecto de typescript. Yo la he modificado un poco para que quede de la siguiente manera:

``` json

{
  "exclude": [
    "node_modules",
    "dist",
    "test",
    "coverage",
    "package-lock.json"
  ],
  "compilerOptions": {
    "target": "es2022",                                  
    "module": "commonjs",                               
    "rootDir": "./src",                                  
    "outDir": "./dist",                                  
    "esModuleInterop": true,                             
    "forceConsistentCasingInFileNames": true,            

    "strict": true,                                      
    "skipLibCheck": true                               
  }
}
```

El apartado **exclude** sirve para que no tenga en cuenta distintos ficheros como los tests. Por otro lado en **compilerOptions** tenemos las opciones de compilación de typescript que más tarde modificaremos para que use modulos ESM. Como podemos ver y como viene por defecto, el **modo strict** está activado para lograr un mejor funcionamiento del programa y la seguridad de que no va a fallar.

### Eslint

Eslint es una herramienta que nos ayudará a identificar y corregir problemas en el código, como errores de sintaxis, convenciones de codificación inconsistentes y prácticas no recomendadas. Permite definir reglas personalizadas o utilizar conjuntos de reglas predefinidas para garantizar la calidad y consistencia del código en un proyecto. Iniciamos eslint en nuestro proyecto con el comando `eslint --init` que nos pedirá la siguiente información:

``` bash

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · none
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · node
✔ What format do you want your config file to be in? · JSON
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · npm
```

Una vez completada esta información se nos creará un fichero **.eslintrc.json** con la siguiente información:

``` json

{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
  }
}
```

En este fichero podremos añadir o quitar reglas del eslint en la sección **rules**. Una buena práctica es desactivar primero la regla de typescript antes de modificar una regla del linter
Por otro lado, también deberemos crear un fichero **.eslintignore** y dentro poner `dist/` para que no afecte a los archivos .js ya compilados.

### typedoc

**Typedoc** es una herramienta que nos generará toda la **documentación** de nuestro proyecto (funciones, clases, interfaces...) de forma automática en la carpeta docs/ de nuestro repositorio.
Debemos instalarlo como una dependencia de desarrollo. Para ello, ejecutaremos `npm i --save-dev typedoc`. Este comando instalará la dependencia en el package.json. Ahora debemos crear un archivo typedoc.json en la raíz de nuestro repositorio con la siguiente información.

``` json

{
  "entryPoints": [
    "./src/**/*.ts"
  ],
  "out": "./docs"
}
```

Esto recogerá todos los .ts de nuestro repositorio y generará la documentación con los comentarios que hayamos puesto en las funciones, clases, ...
Para generar la documentación ejecutaremos `npx typedoc`.

### mocha y chai

**Mocha y Chai** son herramientas utilizadas en el desarrollo de pruebas unitarias. **Mocha** es un marco de pruebas que proporciona una estructura flexible para escribir y ejecutar pruebas, mientras que **Chai** es una biblioteca de aserciones que ofrece diferentes estilos para realizar afirmaciones sobre el comportamiento de las funciones y el estado de los objetos en las pruebas, en nuestro caso, usaremos expect. Juntos, Mocha y Chai permiten escribir y ejecutar pruebas unitarias de forma eficiente, asegurando el correcto funcionamiento del código y facilitando la detección de posibles errores o fallos en el desarrollo de software.

Para instalarlos deberemos instalar ts-node, mocha, los tipos de mocha y chai y la versión específica 4.4.1 de chai con el siguiente comando: `npm i --save-dev mocha chai@4.4.1 @types/mocha @types/chai ts-node`. Para continuar, crearemos el fichero .mocharc.json con la siguiente información:

``` json

{
  "extension": "ts",
  "spec": "test/**/*.spec.ts",
}
```

Luego añadiremos otra opción para que soporte módulos ESM.
Por último podemos añadir al package.json la siguiente opción en el apartado scripts para ejecutar los tests: `"test": "mocha`.

### Coverage

Para realizar el cubrimiento de nuestro código con las pruebas usaremos **c8** ya que estaremos ejecutando módulos ESM y nyc no funciona para ese tipo de módulos.

**C8** es una herramienta de cobertura de código que se utiliza para medir la cantidad de código que está siendo ejecutado durante las pruebas unitarias. Permite identificar qué partes del código están siendo probadas y cuáles no, proporcionando información sobre la eficacia de las pruebas. Para instalarlo ejecutaremos el siguiente comando: `npm i --save-dev c8`, y añadiremos el siguiente script a package.json: `"coverage": "c8 npm test && c8 report --reporter=lcov"`.

Con esto, si ejecutamos **npm run coverage** nos proporcionará el cubrimiento de nuestro código por consola, así como guardarlo para en el directorio coverage para mandarlo a coveralls.

### Chalk

**Chalk** es una librería de Node.js que se utiliza para aplicar estilos de color y formato a la salida de texto en la consola. Permite añadir colores, negritas, subrayados y otros estilos visuales para mejorar la legibilidad y el diseño de la información mostrada en la terminal.

Para instalar esta librería deberemos ejecutar el siguiente comando `npm i chalk`. No la marcamos como dependencia de desarrollo ya que hace falta para la ejecución del programa.

### Yargs

**Yargs** es una librería de análisis de argumentos de línea de comandos para Node.js que simplifica la creación de interfaces de línea de comandos interactivas y robustas. Permite definir comandos, opciones y argumentos de forma sencilla, gestionar parámetros de entrada de manera estructurada y generar automáticamente ayuda y documentación para los usuarios.

Para instalar yargs en nuestro proyecto deberemos ejecutar `npm i yargs` y `npm i --save-dev @types/yargs`. Tampoco la marcaremos como desarrollo ya que hace falta para la ejecución del programa.

### Tipos de node

Como vamos a estar usando las librerias de node como fs y net debemos instalar los **tipos de node**. Lo conseguiremos con el siguiente comando: `npm i --save-dev @types/node`.
De paso también instalaremos **typescript** como dependencia con el comando `npm i --save-dev typescript`.

## Uso de módulos ESM

Para este proyecto, usaremos los **módulos ESM** de node ya que ofrecen una sintaxis más clara y están alineados con el estándar **ECMAScript**, lo que mejora la legibilidad y mantenibilidad del código. También proporcionan un mejor manejo de dependencias circulares y soportan importaciones estáticas, lo que puede mejorar el rendimiento.

Para usar los módulos ESM con typescript deberemos cambiar algunas cosas en los siguientes ficheros para que queden de la siguiente manera:

- **tsconfig.json**: cambiamos la opción module a *Node16* (`"module": "Node16"`) y nos aseguramos que tengamos la opción target a *es2022* (`"target": "es2022"`).
- **package.json**: añadimos la opción `"type": "module",`.
- **.mocharec.json:** añadimos la opción `"loader": "ts-node/esm"`.

## GitHub Actions

GitHub Actions permite automatizar tareas dentro de un flujo de trabajo en un repositorio de GitHub. Esto incluye la ejecución de pruebas, la implementación continua, la generación de documentación y otras acciones personalizadas. En resumen, GitHub Actions automatiza procesos dentro del ciclo de vida del desarrollo de software para mejorar la eficiencia y la calidad del proyecto


