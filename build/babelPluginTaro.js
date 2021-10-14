const nodePath = require('path');

const INLINE_ELEMENTS = ['span', 'i', 'abbr', 'select', 'acronym', 'small', 'bdi', 'kbd', 'strong', 'big', 'map', 'sub', 'sup', 'br', 'mark', 'meter', 'template', 'cite', 'object', 'time', 'code', 'output', 'u', 'data', 'picture', 'tt', 'datalist', 'var', 'dfn', 'del', 'q', 'em', 's', 'embed', 'samp', 'b'];
// const BLOCK_ELEMENTS = ['body', 'svg', 'address', 'fieldset', 'li', 'article', 'figcaption', 'main', 'aside', 'figure', 'nav', 'blockquote', 'footer', 'ol', 'details', 'p', 'dialog', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'dd', 'header', 'section', 'div', 'hgroup', 'table', 'dl', 'hr', 'ul', 'dt', 'view', 'view-block'];
// const SPECIAL_ELEMENTS = ['slot', 'form', 'iframe', 'img', 'audio', 'video', 'canvas', 'a', 'input', 'label', 'textarea', 'progress', 'button'];

module.exports = ({ types: t, template }) => {
    const collection = new Set();
    const bridgeAbsolutePath = nodePath.resolve(__dirname, '../components/bridge');

    return {
        visitor: {
            Program: {
                enter() {
                    collection.clear();
                },
                exit(path, state) {
                    if (collection.size === 0) {
                        return;
                    }

                    const components = Array.from(collection).join(', ');
                    const bridgeRelativePath = nodePath.relative(
                        nodePath.dirname(state.file.opts.filename),
                        bridgeAbsolutePath
                    );
                    const taroComponents = template(
                        `import { ${components} } from "${bridgeRelativePath}";`,
                        {sourceType: 'module'}
                    );
                    const lastImportDeclaration = path.get('body')
                        .filter(p => p.isImportDeclaration())
                        .pop();
                    if (lastImportDeclaration) {
                        lastImportDeclaration.insertAfter(taroComponents());
                    } else {
                        path.get('body').shift(taroComponents());
                    }
                }
            },
            CallExpression(path) {
                const node = path.node;
                const {callee, arguments: args} = node;

                if (callee.type === 'MemberExpression' && callee.property.name !== 'createElement') {
                    return;
                }

                if (callee.name !== '_jsx' && callee.name !== '_jsxs') {
                    return;
                }

                const [typeArgument] = args;
                if (typeArgument.type === 'StringLiteral') {
                    if (INLINE_ELEMENTS.includes(typeArgument.value)) {
                        args[0] = t.identifier('BridgeInline');
                        collection.add('BridgeInline');
                        return;
                    }

                    if (typeArgument.value === 'button') {
                        args[0] = t.identifier('BridgeButton');
                        collection.add('BridgeButton');
                        return;
                    }

                    if (typeArgument.value === 'img') {
                        args[0] = t.identifier('BridgeImg');
                        collection.add('BridgeImg');
                        return;
                    }

                    args[0] = t.identifier('BridgeBlock');
                    collection.add('BridgeBlock');
                }
            }
        }
    };
};
