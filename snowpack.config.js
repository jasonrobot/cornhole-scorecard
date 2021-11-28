// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    exclude: [
        '**/node_modules/**/*',
        '**/*.test.*',
        '**/.git/**/*',
        '**/#*#'
    ],
    mount: {
        /* ... */
    },
    plugins: [
        '@snowpack/plugin-typescript'
    ],
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        sourcemap: true
    },
    testOptions: {
        files: ['**/*.test.ts']
    }
};
