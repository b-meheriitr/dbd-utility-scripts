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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFilePatterns = exports.clean = exports.logTimeTaken = exports.projectConfig = exports.deploymentEnv = exports.cliArgs = exports.returnSubstituteIfErr = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importStar(require("fs"));
const glob_1 = require("glob");
const lodash_1 = require("lodash");
const minimist_1 = __importDefault(require("minimist"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = require("rimraf");
const defaults_1 = __importDefault(require("../../defaults"));
const runCommand = (command, args, cwd = null) => {
    return new Promise((resolve, reject) => {
        const process = (0, child_process_1.spawn)(command, args, { cwd });
        process.stdout.on('data', data => console.log(data.toString()));
        process.stderr.on('data', data => console.error(data.toString()));
        process.on('close', code => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(`Command '${command} ${args.join(' ')}' exited with code ${code}`));
            }
        });
    });
};
exports.runCommand = runCommand;
function returnSubstituteIfErr(syncAction, substitute = null) {
    try {
        return syncAction();
    }
    catch (e) {
        return substitute;
    }
}
exports.returnSubstituteIfErr = returnSubstituteIfErr;
exports.cliArgs = (0, lodash_1.mapKeys)((0, minimist_1.default)(process.argv.slice(2)), (_, key) => (0, lodash_1.camelCase)(key));
exports.deploymentEnv = exports.cliArgs.env;
exports.projectConfig = (0, lodash_1.mergeWith)(defaults_1.default, JSON.parse(returnSubstituteIfErr(() => fs_1.default.readFileSync('.scripts.config.json'), '{}')), (srcValue, targetValue) => ((0, lodash_1.isArray)(targetValue) ? targetValue : undefined));
function logTimeTaken(action) {
    const startTime = new Date().getTime();
    return Promise.resolve(action())
        .finally(() => {
        if (exports.projectConfig.profileTime !== false) {
            const timeTakenInMillis = new Date().getTime() - startTime;
            console.log('\n-- time taken: ', timeTakenInMillis > 1000
                ? `${timeTakenInMillis / 1000}s`
                : `${timeTakenInMillis}ms`);
        }
    });
}
exports.logTimeTaken = logTimeTaken;
const clean = ({ dirPath, ignore = [] }) => {
    return fs_1.promises.readdir(dirPath)
        .then(files => {
        return Promise.all(files.map(file => {
            const filePath = path_1.default.join(dirPath, file);
            if (!ignore.includes(file)) {
                return rimraf_1.rimraf.rimraf(filePath);
            }
            return Promise.resolve(-1);
        }));
    })
        .catch(err => {
        if (!(/no such file or directory/.test(err.message))) {
            throw err;
        }
    });
};
exports.clean = clean;
const copyFilePatterns = (filePatterns, destinationDir) => {
    return Promise.all(filePatterns.map(({ cwd, pattern = '**/*', ignore }) => __awaiter(void 0, void 0, void 0, function* () {
        const matchedFiles = yield (0, glob_1.glob)(pattern, { cwd, ignore, dot: true });
        return Promise.all(matchedFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const sourceFilePath = path_1.default.join(cwd, file);
            const destinationFilePath = path_1.default.join(destinationDir, file);
            if ((yield fs_1.promises.stat(sourceFilePath)).isFile()) {
                try {
                    fs_1.default.mkdirSync(path_1.default.dirname(destinationFilePath), { recursive: true });
                }
                catch (e) {
                    if (e.code !== 'EEXIST')
                        throw e;
                }
                return fs_1.promises.copyFile(sourceFilePath, destinationFilePath);
            }
            return -1;
        })));
    })));
};
exports.copyFilePatterns = copyFilePatterns;
