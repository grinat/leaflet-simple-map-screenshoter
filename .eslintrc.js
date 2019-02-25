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
    'rules': {
        'indent': ["error", 4],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': 2
    }
}
