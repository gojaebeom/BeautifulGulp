import gulp from 'gulp';
import gulp_pug from 'gulp-pug';
import del from 'del';

const routes = {
    pug:{
        src:'src/*.pug',
        dest:"build"
    }
};

export const pug = () => 
    gulp.src(routes.pug.src)
        .pipe(gulp_pug())
        .pipe(gulp.dest(routes.pug.dest));

export const clean = () => 
    del(['build']);


export const dev = gulp.series([clean, pug]);