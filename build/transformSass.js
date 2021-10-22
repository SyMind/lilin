const path = require('path');
const gonzales = require('gonzales-pe');

const functionsAbsolutePath = path.resolve(__dirname, '../components/style/functions.scss');

function transformSass(sassFile) {
    if (sassFile.path === functionsAbsolutePath) {
        return sassFile;
    }

    const functionsRelativePath = path.relative(
        path.dirname(sassFile.path),
        path.resolve(__dirname, '../components/style/functions.scss')
    );
    let needImportFunctions = false;
    let isImportedFunctions = false;

    const ast = gonzales.parse(sassFile.contents.toString(), {syntax: 'scss'});
    ast.traverse((node, index, parent) => {
        if (node.type === 'dimension') {
            const [number, ident] = node.content;
            if (ident && ident.content === 'px') {
                parent.removeChild(index);
                const node = gonzales.createNode({
                    type: 'function',
                    content: [
                        {
                            type: 'ident',
                            content: 'px'
                        },
                        {
                            type: 'arguments',
                            content: [number]
                        }
                    ]
                });
                parent.insert(index, node);
                needImportFunctions = true;
            }
        } else if (node.type === 'atrule' && node.content[2] === `'${functionsRelativePath}'`) {
            isImportedFunctions = true;
        }
    });
    if (needImportFunctions && !isImportedFunctions) {
        const reference = gonzales.createNode({
            type: 'atrule',
            content: [
                {
                    type: 'atkeyword',
                    content: [
                        {
                            type: 'ident',
                            content: 'import'
                        }
                    ]
                },
                {
                    type: 'space',
                    content: ' '
                },
                {
                    type: 'string',
                    content: `'${functionsRelativePath}'`
                }
            ]
        });
        const delimiter = gonzales.createNode({
            type: 'declarationDelimiter',
            content: ';'
        });
        const newLine = gonzales.createNode({
            type: 'space',
            content: '\n'
        });
        ast.insert(0, reference);
        ast.insert(1, delimiter);
        ast.insert(2, newLine);
    }

    const result = sassFile.clone();
    result.contents = Buffer.from(ast.toString());

    return result;
}

module.exports = transformSass;
