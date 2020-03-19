module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "jest": true,
        "it": true,
        "describe": true,
        "expect": true,
        "beforeEach": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};