const { COMPILE_TARGET } = require('./projectHelper');

const resolve = require.resolve;

module.exports = ({ target, useESModules }) => {
    const plugins = [
        [
            resolve('@babel/plugin-transform-typescript'),
            {
                isTSX: true
            }
        ],
        [
            resolve('@babel/plugin-transform-runtime'),
            {
                useESModules,
                version: '^7.10.4'
            }
        ]
    ];

    if (target === COMPILE_TARGET.TARO) {
        plugins.push(resolve('./babelPluginTaro'));
    }

    return {
        presets: [
            resolve('@babel/preset-react'),
            [
                resolve('@babel/preset-env'),
                {
                    modules: useESModules ? false : 'commonjs',
                    targets: {
                        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11']
                    }
                }
            ]
        ],
        plugins
    };
};
