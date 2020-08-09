const gulp = require('gulp')
const browserSync = require('browser-sync')
const gulpStylus = require('gulp-stylus')
const less = require('gulp-less')
const gulpInclude = require('gulp-file-include')
const gulpUglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const clean_css = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const pug = require('gulp-pug')
// const ts = require('gulp-typescript')
// const webp_html = require('gulp-webp-html')
const autop = require('gulp-autoprefixer')
const woff = require('gulp-ttf2woff')
const woff2 = require('gulp-ttf2woff2')


const project = 'app/'
const src = 'src/'
const stylusPlace = 'stylus/**/*.{stylus,styl}'
const lessPlace = 'less/**/*.less'
const htmlPlace = '*.html'
const pugPlace = '*.pug'
const cssPlace = 'css/**/*.css'
const jsPlace = 'js/**/*.js'
const tsPlace = 'ts/**/*.ts'
const imgPlace = 'images/**/*.{jpeg,jpg,png,webp,svg}'
const fontsPlace = 'fonts/**/*.ttf'
    
console.log(gulpUglify)

gulp.task('html', () => {
    return gulp.src(src + htmlPlace)
        .pipe(gulpInclude())
        // .pipe(webp_html())
        .pipe(gulp.dest(project))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('pug', () => {
    return gulp.src(src + pugPlace)
        .pipe(pug({
            'pretty': true,
        }))
        .pipe(gulp.dest(project))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('css', () => {
    return gulp.src(src + cssPlace)
        .pipe(autop({
            overrideBrowsersList: ['last 5 versions'],
            cascade: true,
        }))
        .pipe(gulp.dest(project + 'css/'))
        .pipe(clean_css())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(project + 'css/'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('js', () => {
    return gulp.src(src + jsPlace)
        .pipe(gulpInclude())
        .pipe(gulp.dest(project + 'js/'))
        .pipe(gulpInclude())
        .pipe(gulpUglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest(project + 'js/'))
        .pipe(browserSync.reload({stream: true}))
        
})

/*gulp.task('ts', () => {
    return gulp.src(src + tsPlace)
        .pipe(gulpInclude())
        .pipe(ts())
        .pipe(gulp.dest(project + 'ts/'))
        .pipe(gulpInclude())
        .pipe(gulpUglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest(project + 'js/'))
        .pipe(browserSync.reload({stream: true}))
        
})*/

gulp.task('images', () => {
    return gulp.src(src + imgPlace)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLavel: 3
        }))
        .pipe(gulp.dest(project + 'images/'))
        .pipe(webp({quality: 70}))
        .pipe(gulp.dest(project + 'images/'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser', () => {
    browserSync.init({
        server: project,
    })
})

gulp.task('stylus', () => {
    return gulp.src(src + stylusPlace)
        .pipe(gulpStylus({}))
        .pipe(autop({
            overrideBrowsersList: ['last 5 versions'],
            cascade: true,
        }))
        .pipe(gulp.dest(project + 'css/'))
        .pipe(clean_css())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(project + 'css/'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('less', () => {
    return gulp.src(src + lessPlace)
        .pipe(less({}))
        .pipe(autop({
            overrideBrowsersList: ['last 5 versions'],
            cascade: true,
        }))
        .pipe(gulp.dest(project + 'css/'))
        .pipe(clean_css())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(project + 'css/'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('fonts', () => {
    gulp.src(src + fontsPlace)
        .pipe(woff()) 
        .pipe(gulp.dest(project + 'fonts/'))
    return gulp.src(src + fontsPlace) 
        .pipe(woff2())
        .pipe(gulp.dest(project + 'fonts/'))
}) 

gulp.task('watch', () => {
    gulp.watch(src + htmlPlace, gulp.parallel('html'))
    gulp.watch(src + jsPlace, gulp.parallel('js'))
    // gulp.watch(src + tsPlace, gulp.parallel('ts'))
    gulp.watch(src + cssPlace, gulp.parallel('css'))
    gulp.watch(src + stylusPlace, gulp.parallel('stylus'))
    gulp.watch(src + imgPlace, gulp.parallel('images'))
    gulp.watch(src + fontsPlace, gulp.parallel('fonts'))
    gulp.watch(src + pugPlace, gulp.parallel('pug'))
    gulp.watch(src + lessPlace, gulp.parallel('less'))
})

gulp.task('default', gulp.parallel('browser', 'watch'))

