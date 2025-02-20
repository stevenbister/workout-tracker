/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-idiomatic-order',
    ],
    rules: {
        'custom-property-pattern': null,
        'selector-pseudo-class-no-unknown': [
            true,
            { ignorePseudoClasses: 'global' },
        ],
        'no-descending-specificity': true,
        'no-duplicate-selectors': true,
        // Only allow hsl colours
        'color-named': 'never',
        'color-no-hex': true,
        'function-disallowed-list': ['rgb', 'hwb', 'lch'],
        // Disallow ID selectors
        'selector-max-id': 0,
    },
};
