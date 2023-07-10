"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archiver_1 = __importDefault(require("archiver"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const utils_1 = require("../utils");
const defaults_1 = require("../../defaults");
const createZipArchiveStream = (packagesInstallationPath, ignoreDelete) => {
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    archive.glob('**/*', { cwd: packagesInstallationPath, ignore: ignoreDelete });
    archive.finalize();
    return archive;
};
const buildFormData = (archive, ignoreDelete) => {
    const formData = new form_data_1.default();
    formData.append('file', archive, { filename: 'build.zip' });
    formData.append('ignoreDelete', JSON.stringify(ignoreDelete));
    return formData;
};
const ignorePackagesToDelete = utils_1.cliArgs.ibd ? [] : ['node_modules/**'];
exports.default = (deployConfig) => {
    console.log('Deploying to host ...');
    deployConfig.deploymentIgnoreDelete = (deployConfig.deploymentIgnoreDelete || []);
    deployConfig.deploymentIgnoreDelete.push(...ignorePackagesToDelete);
    const formData = buildFormData(createZipArchiveStream(deployConfig.packagesInstallationPath || defaults_1.NODE_DEFAULTS.bundle.packagesInstallationPath, ignorePackagesToDelete), deployConfig.deploymentIgnoreDelete);
    return (0, axios_1.default)({
        method: 'POST',
        baseURL: deployConfig.api.baseUrl,
        url: deployConfig.api.url,
        data: formData,
        headers: Object.assign(Object.assign({}, formData.getHeaders()), { 'app-name': deployConfig.appName }),
    })
        .then(response => console.log(response.status, JSON.stringify(response.data, null, 4)), err => {
        if (err.response) {
            console.log('Api ERROR', err.response.status, JSON.stringify(err.response.data, null, 4));
        }
        else {
            console.log(err.message);
        }
    });
};
