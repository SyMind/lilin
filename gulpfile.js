const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const path = require('path');
const fs = require('fs');
const { getProjectPath } = require('./scripts/projectHelper');
const getBabelCommonConfig = require('./scripts/getBabelCommonConfig');
const tsConfig = require('./scripts/getTSCommonConfig')();

const COMPILE_TARGET = {
    REACT_DOM: 'react-dom',
    TARO: 'taro'
};

const dirs = ['react-dom', 'taro'].reduce((result, target) => (
    result[target] = {
        libDir: getProjectPath(`dist/${target}/lib`),
        esDir: getProjectPath(`dist/${target}/es`)
    },
    result
), {});

const tsDefaultReporter = ts.reporter.defaultReporter();

function babelify(js, options) {
    const { target, useESModules } = options;

    const babelConfig = getBabelCommonConfig(useESModules);
    delete babelConfig.cacheDirectory;

    const stream = js.pipe(babel(babelConfig));
    return stream.pipe(gulp.dest(useESModules ? dirs[target].esDir : dirs[target].libDir));
}

function compile(options) {
    const { target, useESModules } = options;

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
    const tsd = tsResult.dts.pipe(gulp.dest(useESModules ? dirs[target].esDir : dirs[target].libDir));
    return merge2([tsFilesStream, tsd]);
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

exports.default = gulp.series(
    compileToReactDOMWithES,
    compileToReactDOMWithLib,
    compileToTaroWithES,
    compileToTaroWithLib
);
