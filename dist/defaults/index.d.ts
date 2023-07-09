export namespace NODE_DEFAULTS {
    namespace bundle {
        let packagesInstallationPath: string;
        let bundledDependencies: never[];
        namespace esbuildConfig {
            export let entryPoints: string[];
            let bundle_1: boolean;
            export { bundle_1 as bundle };
            export let outfile: string;
            export let sourcemap: string;
            export let minify: boolean;
            export let metafile: boolean;
        }
        let cleanBundleIgnoreDelete: string[];
    }
}
