# Development guide

## General information

- Author: Stas Cuprunov

## Purpose of this project

- You can create your own pixel art with this website.

### Who can use this website?

- You need JavaScript for this website.
- It works for the browsers Chrome, Opera, Edge and Firefox with new versions.
- It wasn't tested for Safari because there is no free possibility to test it.

## Used technologies

### Tools

- IDE -> WebStorm
- VCS -> Git
- Chrome browser with developer tool

### Used computer science languages

- Programming language -> JavaScript
- For presentation -> HTML
- For design -> Sass (SCSS), CSS

### Used frameworks/libraries/toolkits

#### For design

- Bootstrap -> Grid system
- Font Awesome free version -> Icons

#### For functionality

- Node.js -> Operating a webserver + installing packages via npm
- Gulp.js -> Merging and minimizing files.
- jQuery -> DOM manipulation
- html2canvas -> Screenshot of HTML elements.
- FileSaver.js -> Store screenshot as file.
- Handlebars.js -> Making website parts reusable + Templating

## How to develop this project

### How to start localhost

1. Go to the directory "pixel-art" with your terminal.
2. Then type "node app.js" as command.
3. Go to your browser and type "http://localhost:portNumber". 
   - You can find the port at "pixel-art/configuration.json".

### How to make your development available for the website

1. Save your adaption.
2. Go to the directory "pixel-art/build" with your terminal.
3. Type "gulp" as command.
4. You can see your result in directory "pixel-art/public".

### Where can I find all used packages and install them by myself?

1. Go to the directory "pixel-art".
2. In file "package.json" you can find all used packages which are declared at "dependencies".
3. Installation
   1. Open terminal at directory "pixel-art".
   2. Then type "npm install *packageName*".
4. In "package.json" you can find your installed package.
5. In "package-lock.json" are the needed dependencies for the used packages.

## Project structure

### pixel-art

- Has all files and folders
- app.js -> For routing, starting localhost and make website available
- package.json and package-lock.json -> have information about installed packages

### build

- gulpfile.js -> gulp tasks

### node_modules

- Installed packages from npm

### public

- Available resources for website like minified files and html files

### src

- All relevant files for creating the website like data, handlebars, js, scss
