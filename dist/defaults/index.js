"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_DEFAULTS = exports.DEFAULTS = void 0;
const lodash_1 = require("lodash");
exports.DEFAULTS = {
    build: {
        copyFiles: [],
        cleanBuildIgnoreDelete: [],
    },
    deployment: {
        deploymentIgnoreDelete: [],
    },
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
exports.default = (0, lodash_1.mergeWith)(exports.DEFAULTS, exports.NODE_DEFAULTS, (srcValue, targetValue) => ((0, lodash_1.isArray)(targetValue) ? targetValue : undefined));
