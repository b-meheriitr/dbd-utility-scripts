"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.deploy = void 0;
const archiver_1 = __importDefault(require("archiver"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importStar(require("fs"));
const minimatch_1 = require("minimatch");
const constants_1 = __importDefault(require("../../defaults/constants"));
const utils_1 = require("../utils");
const createZipArchiveStream = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { buildPath, deploymentIgnoreDelete: ignoreDelete, copyFiles } = _a, config = __rest(_a, ["buildPath", "deploymentIgnoreDelete", "copyFiles"]);
    if ((0, utils_1.isHttpUrl)(buildPath)) {
        const { data } = yield (0, axios_1.default)(Object.assign({ method: 'get', url: buildPath, responseType: 'arraybuffer' }, config.artifactZipUrlConfig))
            .catch(err => {
            if (err.response.status === 404) {
                throw new Error(JSON.stringify(JSON.parse(Buffer.from(err.response.data).toString()), null, 4));
            }
            throw err;
        });
        return data;
    }
    if ((yield fs_1.promises.stat(buildPath).then(stat => stat.isFile(), () => false))) {
        return fs_1.default.createReadStream(buildPath);
    }
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    archive.glob('**/*', { cwd: buildPath, ignore: ignoreDelete, dot: true });
    copyFiles === null || copyFiles === void 0 ? void 0 : copyFiles.forEach(({ pattern, cwd, ignore }) => archive.glob(pattern, { cwd, ignore, dot: true }));
    archive.finalize();
    return archive;
});
const buildFormData = (archive, ignoreDelete) => {
    const formData = new form_data_1.default();
    formData.append('file', archive, { filename: 'build.zip' });
    formData.append('ignoreDelete', JSON.stringify(ignoreDelete));
    return formData;
};
const filterDependencyPackagePatterns = (list, dependencyPatterns) => {
    return list.filter(pattern => !dependencyPatterns.some(blacklistedPattern => (0, minimatch_1.minimatch)(pattern, blacklistedPattern)));
};
const deploy = (deployConfig, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Deploying to host ...');
    if (options.installDependencyPackages) {
        deployConfig.deploymentIgnoreDelete = filterDependencyPackagePatterns(deployConfig.deploymentIgnoreDelete, deployConfig.dependencyPackagesFilePatterns);
    }
    const formData = buildFormData(deployConfig.zipStream || (yield createZipArchiveStream(deployConfig)), deployConfig.deploymentIgnoreDelete);
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
});
exports.deploy = deploy;
function getEnvDeploymentConfig(deploymentConfig, env) {
    if (env) {
        const config = deploymentConfig[env];
        if (!config) {
            throw new Error(`Deployment configuration not found for env: ${env}`);
        }
        return config;
    }
    return undefined;
}
const main = buildConfig => {
    return (0, exports.deploy)(Object.assign(Object.assign(Object.assign({ appName: utils_1.projectConfig.appName, buildPath: (buildConfig === null || buildConfig === void 0 ? void 0 : buildConfig.buildPath) || utils_1.cliArgs.buildPath || utils_1.projectConfig.build.buildPath }, utils_1.projectConfig.deployment), getEnvDeploymentConfig(utils_1.projectConfig.deployment, utils_1.cliArgs.env)), { dependencyPackagesFilePatterns: utils_1.projectConfig.build.dependencyPackagesFilePatterns }), {
        installDependencyPackages: utils_1.cliArgs.idp,
    });
};
exports.main = main;
