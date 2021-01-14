import gulp from 'gulp';
import del from 'del';
import gulp_img from 'gulp-image';
import gulp_sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import mini_css from 'gulp-csso';
import browserfy from 'gulp-bro';
import babelify from 'babelify';

gulp_sass.compiler = require('node-sass');

const routes = {
    js:{
        watch:"src/js/**/*.js",
        src:"src/js/main.js",
        dest:"build/js"
    },
    img:{
        src:"src/img/*",
        dest:"build/img"
    },
    scss:{
        watch:"src/scss/**/*.scss",
        src:"src/scss/style.scss",
        dest:"build/css"
    }
};

//build 디렉토리 내부 지우기
function clean(){
    return del(['build']);
}

//js 컴파일
function js(){
    return gulp.src(routes.js.src)
        .pipe(browserfy({
            transform:[
                babelify.configure({ presets :['@babel/preset-env']}),
                ['uglifyify', {global:true}]
            ]
        }))
        .pipe(gulp.dest(routes.js.dest));
}

//이미지 최적화 
function img(){
    return gulp.src(routes.img.src)
            .pipe(gulp_img())
            .pipe(gulp.dest(routes.img.dest));
}

//scss 파일 컴파일
function style(){
    return gulp.src(routes.scss.src)
        .pipe(gulp_sass().on('error', gulp_sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(mini_css())
        .pipe(gulp.dest(routes.scss.dest));
}

//수정사항 감시
function watch(){
    gulp.watch(routes.js.watch, js);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, style);
}

// 작업단위로 분류하기 
const prepare = gulp.series([clean, img]);
const assets = gulp.parallel([js, style]);

// gulp 실행
export const dev = gulp.series([prepare, assets, watch]);