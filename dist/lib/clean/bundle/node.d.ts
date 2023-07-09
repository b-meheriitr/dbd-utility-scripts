declare function _default({ packagesInstallationPath, cleanBundleIgnoreDelete, }: {
    packagesInstallationPath?: string | undefined;
    cleanBundleIgnoreDelete?: string[] | undefined;
}): Promise<void | (number | boolean)[]>;
export default _default;
