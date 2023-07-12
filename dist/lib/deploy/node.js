"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.deploy = void 0;
const archiver_1 = __importDefault(require("archiver"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = __importDefault(require("../../defaults/constants"));
const utils_1 = require("../utils");
const createZipArchiveStream = (bundlePath, ignoreDelete) => {
    if (fs_1.default.statSync(bundlePath).isFile()) {
        return fs_1.default.createReadStream(bundlePath);
    }
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    archive.glob('**/*', { cwd: bundlePath, ignore: ignoreDelete });
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
const deploy = (deployConfig) => {
    console.log('Deploying to host ...');
    deployConfig.deploymentIgnoreDelete = (deployConfig.deploymentIgnoreDelete || []);
    deployConfig.deploymentIgnoreDelete.push(...ignorePackagesToDelete);
    const formData = buildFormData(deployConfig.zipStream
        || createZipArchiveStream(deployConfig.bundlePath || utils_1.projectConfig.bundle.bundlePath, ignorePackagesToDelete), deployConfig.deploymentIgnoreDelete);
    return (0, axios_1.default)({
        method: 'POST',
        baseURL: deployConfig.api.baseUrl,
        url: constants_1.default.DEPLOYMENT_API_PATH,
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
exports.deploy = deploy;
function getEnvDeploymentConfig() {
    const env = utils_1.deploymentEnv || 'dev';
    if (env) {
        const config = utils_1.projectConfig.deployment[env];
        if (!config) {
            throw new Error(`Deployment configuration not found for env: ${env}`);
        }
        return config;
    }
    return undefined;
}
const main = deploymentConfig => {
    return (0, exports.deploy)(Object.assign(Object.assign(Object.assign({ appName: utils_1.projectConfig.appName, bundlePath: utils_1.projectConfig.bundle.bundlePath }, utils_1.projectConfig.deployment), deploymentConfig), getEnvDeploymentConfig()));
};
exports.main = main;
