const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const through2 = require('through2');
const merge2 = require('merge2');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const path = require('path');
const fs = require('fs');
const { getProjectPath, COMPILE_TARGET } = require('./build/projectHelper');
const getBabelCommonConfig = require('./build/getBabelCommonConfig');
const tsConfig = require('./build/getTSCommonConfig')();
const transformSass = require('./build/transformSass');

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');
const distDir = getProjectPath('dist');

const tsDefaultReporter = ts.reporter.defaultReporter();

function babelify(js, options) {
    const { target, useESModules } = options;

    const babelConfig = getBabelCommonConfig(options);
    delete babelConfig.cacheDirectory;

    const stream = js.pipe(babel(babelConfig));
    return stream.pipe(gulp.dest(useESModules ? esDir : libDir));
}

function compile(options) {
    const { target, useESModules } = options;

    const sass = gulp
        .src([
            'components/**/*.sass',
            'components/**/*.scss'
        ])
        .pipe(
            through2.obj(function (file, encoding, next) {
                this.push(file.clone());
                if (file.path.match(/(\/|\\)style(\/|\\)index\.s(a|c)ss$/)) {
                    transformSass(file.path)
                        .then(css => {
                            file.contents = Buffer.from(css);
                            file.path = file.path.replace(/\.s(a|c)ss$/, '.css');
                            this.push(file);
                            next();
                        })
                        .catch(e => {
                            console.error(e);
                        });
                } else {
                    next();
                }
            })
        )
        .pipe(gulp.dest(useESModules ? esDir : libDir));

    let error = 0;

    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'typings/**/*.d.ts',
        '!components/**/__tests__/**'
    ];
    if (target === 'react-dom') {
        source.push('!components/**/*.taro.tsx');
        source.push('!components/**/*.taro.ts');
    }

    let sourceStream = gulp.src(source);

    if (target === COMPILE_TARGET.TARO) {
        sourceStream = sourceStream
            .pipe(filter(file => {
                const filename = path.basename(file.path);
                const fragments = filename.split('.');
                if (fragments.length > 3) {
                    return true;
                }

                const secondaryExt = fragments[fragments.length - 2];
                if (secondaryExt === COMPILE_TARGET.TARO) {
                    return true;
                }

                const dirname = path.dirname(file.path);
                const taroEntryFilename = (fragments.splice(fragments.length - 1, 0, COMPILE_TARGET.TARO), fragments).join('.');
                const taroEntryPath = `${dirname}/${taroEntryFilename}`;
                return !fs.existsSync(taroEntryPath);
            }))
            .pipe(rename(p => {
                const basename = p.basename;
                const fragments = basename.split('.');
                if (fragments.length > 2) {
                    return;
                }

                const secondaryExt = fragments[fragments.length - 1];
                if (secondaryExt === COMPILE_TARGET.TARO) {
                    p.basename = fragments.slice(0, fragments.length - 1).join('.');
                }
            }));
    }

    const tsResult = sourceStream.pipe(
        ts(tsConfig, {
            error(e) {
                tsDefaultReporter.error(e);
                error = 1;
            },
            finish: tsDefaultReporter.finish
        })
    );

    function check() {
        if (error) {
            process.exit(1);
        }
    }

    tsResult.on('finish', check);
    tsResult.on('end', check);

    const tsFilesStream = babelify(tsResult.js, options);
    const tsd = tsResult.dts.pipe(gulp.dest(useESModules ? esDir : libDir));
    return merge2([sass, tsFilesStream, tsd]);
}

function compileSass(target) {
    return gulp
        .src([
            'components/**/*.sass',
            'components/**/*.scss'
        ])
        .pipe(
            through2.obj(function (file, encoding, next) {
                if (file.path.match(/(\/|\\)style(\/|\\)index\.s(a|c)ss$/)) {
                    transformSass(file.path)
                        .then(css => {
                            file.contents = Buffer.from(css);
                            file.path = file.path.replace(/\.s(a|c)ss$/, '.css');
                            this.push(file);
                            next();
                        })
                        .catch(e => {
                            console.error(e);
                        });
                } else {
                    next();
                }
            })
        )
        .pipe(concat('lilin.css'))
        .pipe(gulp.dest(distDir));
}

function compileToReactDOMWithES(done) {
    const options = {
        target: COMPILE_TARGET.REACT_DOM,
        useESModules: true
    };
    compile(options).on('finish', done);
}

function compileToReactDOMWithLib(done) {
    const options = {
        target: COMPILE_TARGET.REACT_DOM,
        useESModules: false
    };
    compile(options).on('finish', done);
}

function compileToTaroWithES(done) {
    const options = {
        target: COMPILE_TARGET.TARO,
        useESModules: true
    };
    compile(options).on('finish', done);
}

function compileToTaroWithLib(done) {
    const options = {
        target: COMPILE_TARGET.TARO,
        useESModules: false
    };
    compile(options).on('finish', done);
}

function compileSassToReactDOM(done) {
    compileSass(COMPILE_TARGET.REACT_DOM).on('finish', done);
}

function compileSassToTaro(done) {
    compileSass(COMPILE_TARGET.TARO).on('finish', done);
}

exports.default = gulp.parallel(
    compileToReactDOMWithES,
    compileToReactDOMWithLib,
    compileSassToReactDOM
    // compileToTaroWithES,
    // compileToTaroWithLib,
    // compileSassToTaro
);
