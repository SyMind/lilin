const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const { getProjectPath } = require('./scripts/projectHelper');
const getBabelCommonConfig = require('./scripts/getBabelCommonConfig');
const tsConfig = require('./scripts/getTSCommonConfig')();

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

const tsDefaultReporter = ts.reporter.defaultReporter();

function babelify(js, useESModules) {
    const babelConfig = getBabelCommonConfig(useESModules);
    delete babelConfig.cacheDirectory;

    const stream = js.pipe(babel(babelConfig));
    return stream.pipe(gulp.dest(useESModules ? esDir : libDir));
}

function compile(useESModules) {
    let error = 0;
    const source = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'typings/**/*.d.ts',
        '!components/**/__tests__/**'
    ];

    const sourceStream = gulp.src(source);
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

    const tsFilesStream = babelify(tsResult.js, useESModules);
    const tsd = tsResult.dts.pipe(gulp.dest(useESModules ? esDir : libDir));
    return merge2([tsFilesStream, tsd]);
}

function compileWithES(done) {
    compile(false).on('finish', done);
}

function compileWithLib(done) {
    compile(true).on('finish', done);
}

exports.default = gulp.series(compileWithES, compileWithLib);
