// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    'rules': {
        'indent': ["error", 2],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': 2
    }
}
