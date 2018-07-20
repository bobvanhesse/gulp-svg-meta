module.exports = {
  "extends": ["eslint:recommended", "google"],
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "comma-dangle": ["error", "never"],
    "eol-last": 0,
    "linebreak-style": 0,
    "max-len": ["error", {"code": 150}],
    "no-console": ["error", { "allow": ["error"] }],
    "no-invalid-this": 0,
    "keyword-spacing": ["error", {
      "overrides": {
        "if": {
          "after": false
        },
        "for": {
          "after": false
        },
        "while": {
          "after": false
        }
      }
    }],
    "require-jsdoc": 0
  }
};