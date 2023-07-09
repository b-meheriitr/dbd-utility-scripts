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
const utils_1 = require("../../utils");
const defaults_1 = require("../../defaults");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVuZGxlL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQTZCO0FBQzdCLHlDQUF5QztBQUN6QyxvREFBc0I7QUFDdEIsZ0RBQXVCO0FBQ3ZCLHVDQUFzQztBQUN0Qyw2Q0FBNEM7QUFFNUMsTUFBTSxvQkFBb0IsR0FBRyx3QkFBYSxDQUFDLE1BQU0sQ0FBQTtBQUVqRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFFdkYsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLEtBQUssR0FBRyxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQTtBQUVySCxTQUFTLHFCQUFxQixDQUFDLE1BQU07SUFDcEMsT0FBTyxhQUFFLENBQUMsU0FBUyxDQUNsQixjQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsRUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FDYixnQkFBQyxDQUFDLElBQUksQ0FDTCxrQkFBa0IsRUFDbEI7UUFDQyxNQUFNO1FBQ04sU0FBUztRQUNULFNBQVM7UUFDVCxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDN0Q7S0FDRCxDQUNELEVBQ0QsSUFBSSxF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dGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgZXNidWlsZCBmcm9tICdlc2J1aWxkJ1xuaW1wb3J0IGZzU3luYywge3Byb21pc2VzIGFzIGZzfSBmcm9tICdmcydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge3J1bkNvbW1hbmR9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHtOT0RFX0RFRkFVTFRTfSBmcm9tICcuLi8uLi9kZWZhdWx0cydcblxuY29uc3QgTk9ERV9ERUZBVUxUU19CVU5ETEUgPSBOT0RFX0RFRkFVTFRTLmJ1bmRsZVxuXG5jb25zdCBwcm9qZWN0UGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzU3luYy5yZWFkRmlsZVN5bmMoJy4vcGFja2FnZS5qc29uJykudG9TdHJpbmcoKSlcblxuY29uc3QgaXNCdW5kbGVkRGVwc0FsbERlcHMgPSAoe2J1bmRsZWREZXBlbmRlbmNpZXN9KSA9PiBidW5kbGVkRGVwZW5kZW5jaWVzID09PSAnKicgfHwgYnVuZGxlZERlcGVuZGVuY2llc1swXSA9PT0gJyonXG5cbmZ1bmN0aW9uIGNyZWF0ZVBhY2thZ2VKc29uRmlsZShjb25maWcpIHtcblx0cmV0dXJuIGZzLndyaXRlRmlsZShcblx0XHRwYXRoLmpvaW4oY29uZmlnLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgJ3BhY2thZ2UuanNvbicpLFxuXHRcdEpTT04uc3RyaW5naWZ5KFxuXHRcdFx0Xy5waWNrKFxuXHRcdFx0XHRwcm9qZWN0UGFja2FnZUpzb24sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHQnbmFtZScsXG5cdFx0XHRcdFx0J2VuZ2luZXMnLFxuXHRcdFx0XHRcdCd2ZXJzaW9uJyxcblx0XHRcdFx0XHQuLi4oaXNCdW5kbGVkRGVwc0FsbERlcHMoY29uZmlnKVxuXHRcdFx0XHRcdFx0XHQ/IFsnZGVwZW5kZW5jaWVzJ11cblx0XHRcdFx0XHRcdFx0OiBjb25maWcuYnVuZGxlZERlcGVuZGVuY2llcy5tYXAoYiA9PiAoYGRlcGVuZGVuY2llcy4ke2J9YCkpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XSxcblx0XHRcdCksXG5cdFx0XHRudWxsLFxuXHRcdFx0Mixcblx0XHQpLFxuXHQpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGxQYWNrYWdlcyhjb25maWcpIHtcblx0YXdhaXQgZnMuY3AoXG5cdFx0J3BhY2thZ2UtbG9jay5qc29uJyxcblx0XHRwYXRoLmpvaW4oY29uZmlnLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgJ3BhY2thZ2UtbG9jay5qc29uJyksXG5cdClcblxuXHRyZXR1cm4gcnVuQ29tbWFuZChcblx0XHQnbnBtJyxcblx0XHRbJ2luc3RhbGwnLCBgLS1wcmVmaXg9JHtwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgY29uZmlnLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCl9YF0sXG5cdClcblx0XHQudGhlbigoKSA9PiBmcy5ybShwYXRoLmpvaW4oY29uZmlnLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgJ3BhY2thZ2UtbG9jay5qc29uJykpKVxufVxuXG5leHBvcnQgZGVmYXVsdCAoXG5cdHtcblx0XHRjbGVhbkJ1bmRsZUlnbm9yZURlbGV0ZSxcblx0XHRwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsXG5cdFx0YnVuZGxlZERlcGVuZGVuY2llcyxcblx0XHQuLi5lc2J1aWxkQ29uZmlnXG5cdH0sXG5cdGFyZ3MgPSB7fSxcbikgPT4ge1xuXHRjb25zdCBjb25maWcgPSB7XG5cdFx0cGFja2FnZXNJbnN0YWxsYXRpb25QYXRoOiBwYWNrYWdlc0luc3RhbGxhdGlvblBhdGggfHwgTk9ERV9ERUZBVUxUU19CVU5ETEUucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLFxuXHRcdGJ1bmRsZWREZXBlbmRlbmNpZXM6IGJ1bmRsZWREZXBlbmRlbmNpZXMgfHwgTk9ERV9ERUZBVUxUU19CVU5ETEUuYnVuZGxlLmJ1bmRsZWREZXBlbmRlbmNpZXMsXG5cdFx0ZXNidWlsZENvbmZpZzoge1xuXHRcdFx0Li4uTk9ERV9ERUZBVUxUU19CVU5ETEUuZXNidWlsZENvbmZpZyxcblx0XHRcdC4uLmVzYnVpbGRDb25maWcsXG5cdFx0fSxcblx0fVxuXG5cdHJldHVybiBlc2J1aWxkLmJ1aWxkKHtcblx0XHQuLi5jb25maWcuZXNidWlsZENvbmZpZyxcblx0XHRwbGF0Zm9ybTogJ25vZGUnLFxuXHRcdG91dGZpbGU6IHBhdGguam9pbihjb25maWcucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCBjb25maWcuZXNidWlsZENvbmZpZy5vdXRmaWxlKSxcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcblx0XHRleHRlcm5hbDogY29uZmlnLmVzYnVpbGRDb25maWcuYnVuZGxlXG5cdFx0XHQ/IGlzQnVuZGxlZERlcHNBbGxEZXBzKGNvbmZpZylcblx0XHRcdFx0PyBPYmplY3Qua2V5cyhwcm9qZWN0UGFja2FnZUpzb24uZGVwZW5kZW5jaWVzKVxuXHRcdFx0XHQ6IGNvbmZpZy5idW5kbGVkRGVwZW5kZW5jaWVzXG5cdFx0XHQ6IHVuZGVmaW5lZCxcblx0fSlcblx0XHQudGhlbigoe21ldGFmaWxlfSkgPT4gY29uZmlnLmVzYnVpbGRDb25maWcubWV0YWZpbGUgJiYgY29uc29sZS5sb2coZXNidWlsZC5hbmFseXplTWV0YWZpbGVTeW5jKG1ldGFmaWxlKSkpXG5cdFx0LnRoZW4oKCkgPT4gY3JlYXRlUGFja2FnZUpzb25GaWxlKGNvbmZpZykpXG5cdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGFyZ3MuaWJkKSB7IC8vIGliZCBzdGFuZCBmb3IgaW5zdGFsbEJ1bmRsZWREZXBlbmRlbmNpZXNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2luc3RhbGxpbmcgbm9uLWJ1bmRsZWQgcGFja2FnZXMnKVxuXHRcdFx0XHRhd2FpdCBpbnN0YWxsUGFja2FnZXMoY29uZmlnKVxuXHRcdFx0XHRcdC50aGVuKFxuXHRcdFx0XHRcdFx0KCkgPT4gY29uc29sZS5sb2coJ1BhY2thZ2VzIGluc3RhbGxlZCBzdWNjZXNzZnVsbHknKSxcblx0XHRcdFx0XHRcdGVyciA9PiBjb25zb2xlLmVycm9yKGBFcnJvciBpbnN0YWxsaW5nIHBhY2thZ2VzOiAke2Vyci5zdGFja31gKSxcblx0XHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHQuY2F0Y2goZXJyID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKVxuXHRcdFx0cmV0dXJuIHByb2Nlc3MuZXhpdCgxKVxuXHRcdH0pXG59XG4iXX0=