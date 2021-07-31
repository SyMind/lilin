const path = require('path');

const cwd = process.cwd();

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

const COMPILE_TARGET = {
    REACT_DOM: 'react-dom',
    TARO: 'taro'
};

module.exports = {
    getProjectPath,
    COMPILE_TARGET
};
