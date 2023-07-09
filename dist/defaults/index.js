"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_DEFAULTS = void 0;
exports.NODE_DEFAULTS = {
    bundle: {
        packagesInstallationPath: 'dist/bundle',
        bundledDependencies: [],
        esbuildConfig: {
            entryPoints: ['src/bin/www.js'],
            bundle: true,
            outfile: 'app.min.js',
            sourcemap: 'inline',
            minify: true,
            metafile: true,
        },
        cleanBundleIgnoreDelete: ['node_modules'],
    },
};
