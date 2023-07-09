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
const esbuild_1 = __importDefault(require("esbuild"));
const fs_1 = __importStar(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const defaults_1 = require("../../defaults");
const utils_1 = require("../utils");
const NODE_DEFAULTS_BUNDLE = defaults_1.NODE_DEFAULTS.bundle;
const projectPackageJson = JSON.parse(fs_1.default.readFileSync('./package.json').toString());
const isBundledDepsAllDeps = ({ bundledDependencies }) => bundledDependencies === '*' || bundledDependencies[0] === '*';
function createPackageJsonFile(config) {
    return fs_1.promises.writeFile(path_1.default.join(config.packagesInstallationPath, 'package.json'), JSON.stringify(lodash_1.default.pick(projectPackageJson, [
        'name',
        'engines',
        'version',
        ...(isBundledDepsAllDeps(config)
            ? ['dependencies']
            : config.bundledDependencies.map(b => (`dependencies.${b}`))),
    ]), null, 2));
}
function installPackages(config) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_1.promises.cp('package-lock.json', path_1.default.join(config.packagesInstallationPath, 'package-lock.json'));
        return (0, utils_1.runCommand)('npm', ['install', `--prefix=${path_1.default.join(process.cwd(), config.packagesInstallationPath)}`])
            .then(() => fs_1.promises.rm(path_1.default.join(config.packagesInstallationPath, 'package-lock.json')));
    });
}
exports.default = (_a, args) => {
    var { cleanBundleIgnoreDelete, packagesInstallationPath, bundledDependencies } = _a, esbuildConfig = __rest(_a, ["cleanBundleIgnoreDelete", "packagesInstallationPath", "bundledDependencies"]);
    if (args === void 0) { args = {}; }
    const config = {
        packagesInstallationPath: packagesInstallationPath || NODE_DEFAULTS_BUNDLE.packagesInstallationPath,
        bundledDependencies: bundledDependencies || NODE_DEFAULTS_BUNDLE.bundle.bundledDependencies,
        esbuildConfig: Object.assign(Object.assign({}, NODE_DEFAULTS_BUNDLE.esbuildConfig), esbuildConfig),
    };
    return esbuild_1.default.build(Object.assign(Object.assign({}, config.esbuildConfig), { platform: 'node', outfile: path_1.default.join(config.packagesInstallationPath, config.esbuildConfig.outfile), external: config.esbuildConfig.bundle
            ? isBundledDepsAllDeps(config)
                ? Object.keys(projectPackageJson.dependencies)
                : config.bundledDependencies
            : undefined }))
        .then(({ metafile }) => config.esbuildConfig.metafile && console.log(esbuild_1.default.analyzeMetafileSync(metafile)))
        .then(() => createPackageJsonFile(config))
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        if (args.ibd) {
            console.log('installing non-bundled packages');
            yield installPackages(config)
                .then(() => console.log('Packages installed successfully'), err => console.error(`Error installing packages: ${err.stack}`));
        }
    }))
        .catch(err => {
        console.error(err);
        return process.exit(1);
    });
};
