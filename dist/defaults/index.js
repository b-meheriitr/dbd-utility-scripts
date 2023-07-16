"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_DEFAULTS = exports.CLI_ARGS_DEFAULTS = exports.DEFAULTS = exports.mergeOverride = void 0;
const lodash_1 = require("lodash");
const mergeOverride = (json1, json2) => {
    return (0, lodash_1.mergeWith)(json1, json2, (srcValue, targetValue) => ((0, lodash_1.isArray)(targetValue) ? targetValue : undefined));
};
exports.mergeOverride = mergeOverride;
exports.DEFAULTS = {
    build: {
        copyFiles: [],
        cleanBuildIgnoreDelete: [],
        buildoh: {
            copyFiles: [],
        },
    },
    deployment: {
        deploymentIgnoreDelete: [],
    },
};
exports.CLI_ARGS_DEFAULTS = {
    env: 'dev',
};
exports.NODE_DEFAULTS = {
    build: {
        buildInfo: {
            bundle: {
                bundledDependencies: [],
                esbuildConfig: {
                    entryPoints: ['src/bin/www.js'],
                    bundle: true,
                    outfile: 'app.min.js',
                    sourcemap: 'inline',
                    minify: true,
                    metafile: true,
                },
            },
        },
        buildPath: 'dist/bundle',
        cleanBuildIgnoreDelete: ['node_modules'],
        dependencyPackagesFilePatterns: ['node_modules/**'],
    },
    deployment: {
        deploymentIgnoreDelete: ['node_modules/**'],
    },
};
exports.default = (0, exports.mergeOverride)(exports.DEFAULTS, exports.NODE_DEFAULTS);
