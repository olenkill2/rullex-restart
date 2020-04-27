module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-rational-order/borderInBoxModel'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'number-leading-zero': 'never',
    'prettier/prettier': [
      true,
      {
        'singleQuote': true
      }
    ],
    'order/order': [
      {
        'type': 'at-rule',
        'name': 'include',
        'hasBlock': false
      },
      'dollar-variables',
      'custom-properties',
      'declarations',
      {
        'type': 'at-rule',
        'name': 'include',
        'parameter': 'media',
        'hasBlock': true
      },
      {
        'type': 'at-rule',
        'name': 'media',
        'hasBlock': true
      },
      {
        'type': 'rule',
        'selector': /^&::\w/
      },
      {
        'type': 'rule',
        'selector': /^&:\S+$/
      },
      {
        'type': 'rule',
        'selector': /^&--\w+$/
      },
      {
        'type': 'rule',
        'selector': /^&__\w+$/
      }
    ]
  }
}
