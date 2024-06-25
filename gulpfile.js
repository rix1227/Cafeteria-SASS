
const {src, dest, watch,series,parallel} = require('gulp');

//css y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done){
    //compilar sass
    //paso 1: identificar el archivo

    src('src/scss/app.scss')
        .pipe( sass())
        .pipe(postcss([autoprefixer()]))
        .pipe( dest ('build/css'))
    //2.- compilarlo

    done();
}

function imagenes(done){
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done();
}

function versionWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('build/img'))
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png.jpg}')
    .pipe(avif(opciones))
    .pipe(dest('buil/img'))
}

function dev(){
    watch('src/scss/**/*.scss',css);
    watch('src/img/**/*', imagenes);
   
}

exports.css= css;
exports.dev=dev;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.default = series(imagenes,versionWebp, versionAvif,css, dev);
//series - se inicia una tarea, y hasta que finaliza, inicia la siguiente
//parallel -  todas inician al mismo tiempo