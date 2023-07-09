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
const utils_1 = require("../../utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVuZGxlL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQTZCO0FBQzdCLHlDQUF5QztBQUN6QyxvREFBc0I7QUFDdEIsZ0RBQXVCO0FBQ3ZCLDZDQUE0QztBQUM1Qyx1Q0FBc0M7QUFFdEMsTUFBTSxvQkFBb0IsR0FBRyx3QkFBYSxDQUFDLE1BQU0sQ0FBQTtBQUVqRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFFdkYsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLEtBQUssR0FBRyxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQTtBQUVySCxTQUFTLHFCQUFxQixDQUFDLE1BQU07SUFDcEMsT0FBTyxhQUFFLENBQUMsU0FBUyxDQUNsQixjQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsRUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FDYixnQkFBQyxDQUFDLElBQUksQ0FDTCxrQkFBa0IsRUFDbEI7UUFDQyxNQUFNO1FBQ04sU0FBUztRQUNULFNBQVM7UUFDVCxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDNUQ7S0FDRCxDQUNELEVBQ0QsSUFBSSxF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dGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgZXNidWlsZCBmcm9tICdlc2J1aWxkJ1xuaW1wb3J0IGZzU3luYywge3Byb21pc2VzIGFzIGZzfSBmcm9tICdmcydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge05PREVfREVGQVVMVFN9IGZyb20gJy4uLy4uL2RlZmF1bHRzJ1xuaW1wb3J0IHtydW5Db21tYW5kfSBmcm9tICcuLi8uLi91dGlscydcblxuY29uc3QgTk9ERV9ERUZBVUxUU19CVU5ETEUgPSBOT0RFX0RFRkFVTFRTLmJ1bmRsZVxuXG5jb25zdCBwcm9qZWN0UGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzU3luYy5yZWFkRmlsZVN5bmMoJy4vcGFja2FnZS5qc29uJykudG9TdHJpbmcoKSlcblxuY29uc3QgaXNCdW5kbGVkRGVwc0FsbERlcHMgPSAoe2J1bmRsZWREZXBlbmRlbmNpZXN9KSA9PiBidW5kbGVkRGVwZW5kZW5jaWVzID09PSAnKicgfHwgYnVuZGxlZERlcGVuZGVuY2llc1swXSA9PT0gJyonXG5cbmZ1bmN0aW9uIGNyZWF0ZVBhY2thZ2VKc29uRmlsZShjb25maWcpIHtcblx0cmV0dXJuIGZzLndyaXRlRmlsZShcblx0XHRwYXRoLmpvaW4oY29uZmlnLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgJ3BhY2thZ2UuanNvbicpLFxuXHRcdEpTT04uc3RyaW5naWZ5KFxuXHRcdFx0Xy5waWNrKFxuXHRcdFx0XHRwcm9qZWN0UGFja2FnZUpzb24sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHQnbmFtZScsXG5cdFx0XHRcdFx0J2VuZ2luZXMnLFxuXHRcdFx0XHRcdCd2ZXJzaW9uJyxcblx0XHRcdFx0XHQuLi4oaXNCdW5kbGVkRGVwc0FsbERlcHMoY29uZmlnKVxuXHRcdFx0XHRcdFx0PyBbJ2RlcGVuZGVuY2llcyddXG5cdFx0XHRcdFx0XHQ6IGNvbmZpZy5idW5kbGVkRGVwZW5kZW5jaWVzLm1hcChiID0+IChgZGVwZW5kZW5jaWVzLiR7Yn1gKSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRdLFxuXHRcdFx0KSxcblx0XHRcdG51bGwsXG5cdFx0XHQyLFxuXHRcdCksXG5cdClcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5zdGFsbFBhY2thZ2VzKGNvbmZpZykge1xuXHRhd2FpdCBmcy5jcChcblx0XHQncGFja2FnZS1sb2NrLmpzb24nLFxuXHRcdHBhdGguam9pbihjb25maWcucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS1sb2NrLmpzb24nKSxcblx0KVxuXG5cdHJldHVybiBydW5Db21tYW5kKFxuXHRcdCducG0nLFxuXHRcdFsnaW5zdGFsbCcsIGAtLXByZWZpeD0ke3BhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBjb25maWcucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoKX1gXSxcblx0KVxuXHRcdC50aGVuKCgpID0+IGZzLnJtKHBhdGguam9pbihjb25maWcucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS1sb2NrLmpzb24nKSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IChcblx0e1xuXHRcdGNsZWFuQnVuZGxlSWdub3JlRGVsZXRlLFxuXHRcdHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCxcblx0XHRidW5kbGVkRGVwZW5kZW5jaWVzLFxuXHRcdC4uLmVzYnVpbGRDb25maWdcblx0fSxcblx0YXJncyA9IHt9LFxuKSA9PiB7XG5cdGNvbnN0IGNvbmZpZyA9IHtcblx0XHRwYWNrYWdlc0luc3RhbGxhdGlvblBhdGg6IHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCB8fCBOT0RFX0RFRkFVTFRTX0JVTkRMRS5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsXG5cdFx0YnVuZGxlZERlcGVuZGVuY2llczogYnVuZGxlZERlcGVuZGVuY2llcyB8fCBOT0RFX0RFRkFVTFRTX0JVTkRMRS5idW5kbGUuYnVuZGxlZERlcGVuZGVuY2llcyxcblx0XHRlc2J1aWxkQ29uZmlnOiB7XG5cdFx0XHQuLi5OT0RFX0RFRkFVTFRTX0JVTkRMRS5lc2J1aWxkQ29uZmlnLFxuXHRcdFx0Li4uZXNidWlsZENvbmZpZyxcblx0XHR9LFxuXHR9XG5cblx0cmV0dXJuIGVzYnVpbGQuYnVpbGQoe1xuXHRcdC4uLmNvbmZpZy5lc2J1aWxkQ29uZmlnLFxuXHRcdHBsYXRmb3JtOiAnbm9kZScsXG5cdFx0b3V0ZmlsZTogcGF0aC5qb2luKGNvbmZpZy5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsIGNvbmZpZy5lc2J1aWxkQ29uZmlnLm91dGZpbGUpLFxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuXHRcdGV4dGVybmFsOiBjb25maWcuZXNidWlsZENvbmZpZy5idW5kbGVcblx0XHRcdD8gaXNCdW5kbGVkRGVwc0FsbERlcHMoY29uZmlnKVxuXHRcdFx0XHQ/IE9iamVjdC5rZXlzKHByb2plY3RQYWNrYWdlSnNvbi5kZXBlbmRlbmNpZXMpXG5cdFx0XHRcdDogY29uZmlnLmJ1bmRsZWREZXBlbmRlbmNpZXNcblx0XHRcdDogdW5kZWZpbmVkLFxuXHR9KVxuXHRcdC50aGVuKCh7bWV0YWZpbGV9KSA9PiBjb25maWcuZXNidWlsZENvbmZpZy5tZXRhZmlsZSAmJiBjb25zb2xlLmxvZyhlc2J1aWxkLmFuYWx5emVNZXRhZmlsZVN5bmMobWV0YWZpbGUpKSlcblx0XHQudGhlbigoKSA9PiBjcmVhdGVQYWNrYWdlSnNvbkZpbGUoY29uZmlnKSlcblx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoYXJncy5pYmQpIHsgLy8gaWJkIHN0YW5kIGZvciBpbnN0YWxsQnVuZGxlZERlcGVuZGVuY2llc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnaW5zdGFsbGluZyBub24tYnVuZGxlZCBwYWNrYWdlcycpXG5cdFx0XHRcdGF3YWl0IGluc3RhbGxQYWNrYWdlcyhjb25maWcpXG5cdFx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0XHQoKSA9PiBjb25zb2xlLmxvZygnUGFja2FnZXMgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseScpLFxuXHRcdFx0XHRcdFx0ZXJyID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yIGluc3RhbGxpbmcgcGFja2FnZXM6ICR7ZXJyLnN0YWNrfWApLFxuXHRcdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpXG5cdFx0XHRyZXR1cm4gcHJvY2Vzcy5leGl0KDEpXG5cdFx0fSlcbn1cbiJdfQ==