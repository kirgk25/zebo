var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	notifier = require('node-notifier'),
	concat = require('gulp-concat'),
	fs = require('fs'),
	fileinclude = require('gulp-file-include'),
	uglify = require('gulp-uglify'); // for compress/minify files

	sassFiles = 'resources/assets/sass/**/*.scss',
	mainScss = 'resources/assets/sass/app.scss',
	cssDest = 'public/css',

	jsFiles = 'resources/assets/js/**/*.js',
	jsDest = 'public/js',

	htmlSrc = 'resources/assets/html',
	htmlFiles = htmlSrc + '/**/*.html';

gulp.task('fonts', function() {
	gulp.src('node_modules/bootstrap-sass/assets/fonts/**')
	    .pipe(gulp.dest('public/fonts'));
});

gulp.task('styles', function() {
	var reportError = function (error) {
		success = false;
	    console.log(error.message);
	    notifier.notify({
		  title: 'Error!',
		  message: error.message
		});
	}

	gulp.src(mainScss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', reportError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cssDest));
});

gulp.task('scripts', function() {

	gulp.src([
			'node_modules/jquery/dist/jquery.min.js',

			// Bootstrap javascript:
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
			// 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js',

			jsFiles
	  	])
		.pipe(sourcemaps.init())
	    .pipe(concat('app.js'))
	    .pipe(uglify())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(jsDest));
});

gulp.task('html', function() {
	var contentDir = htmlSrc+'/content';
	
	fs.readdir(contentDir,
		function(err, files) {
			files.forEach(function(fileName){
		  	gulp.src([contentDir + '/' + fileName , contentDir + '/' + 'some.html'   ])
			    .pipe(fileinclude({
				    prefix: '@@',
				    basepath: '@file'
			    }))
			    .pipe(gulp.dest('public/html'));	
			});
		}
	);
});

gulp.task('watch', function() {
	gulp.run('fonts');

	gulp.watch(sassFiles, ['styles']);
	gulp.watch(jsFiles, ['scripts']);
	gulp.watch(htmlFiles, ['html']);
});