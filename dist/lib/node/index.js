#!/usr/bin/env node
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
const minimist_1 = __importDefault(require("minimist"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
const projectPackageJson = JSON.parse(fs_1.default.readFileSync('./package.json').toString());
const projectConfig = JSON.parse((0, utils_1.nullIfError)(() => fs_1.default.readFileSync('.scripts.json')).toString() || {});
const _a = Object.assign({ packagesInstallationPath: 'dist/bundle', bundledDependencies: [], entryPoints: ['src/bin/www.js'], bundle: true, outFile: 'app.min.js', sourcemap: 'inline', minify: true, metafile: true }, projectConfig), { packagesInstallationPath, bundledDependencies } = _a, CONFIG = __rest(_a, ["packagesInstallationPath", "bundledDependencies"]);
function isBundledDepsAllDeps() {
    return bundledDependencies === '*' || bundledDependencies[0] === '*';
}
function createPackageJsonFile() {
    return fs_1.promises.writeFile(path_1.default.join(packagesInstallationPath, 'package.json'), JSON.stringify(lodash_1.default.pick(projectPackageJson, [
        'name',
        'engines',
        'version',
        ...(isBundledDepsAllDeps()
            ? ['dependencies']
            : bundledDependencies.map(b => (`dependencies.${b}`))),
    ]), null, 2));
}
function installPackages() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_1.promises.cp('package-lock.json', path_1.default.join(packagesInstallationPath, 'package-lock.json'));
        return (0, utils_1.runCommand)('npm', ['install', `--prefix=${path_1.default.join(process.cwd(), packagesInstallationPath)}`])
            .then(() => fs_1.promises.rm(path_1.default.join(packagesInstallationPath, 'package-lock.json')));
    });
}
exports.default = esbuild_1.default.build({
    entryPoints: CONFIG.entryPoints,
    bundle: CONFIG.bundle,
    outfile: path_1.default.join(packagesInstallationPath, CONFIG.outFile),
    platform: 'node',
    sourcemap: CONFIG.sourcemap,
    minify: CONFIG.minify,
    metafile: CONFIG.metafile,
    external: isBundledDepsAllDeps() ? Object.keys(projectPackageJson.dependencies) : bundledDependencies,
})
    .then(({ metafile }) => CONFIG.metafile && console.log(esbuild_1.default.analyzeMetafileSync(metafile)))
    .then(() => createPackageJsonFile())
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, minimist_1.default)(process.argv.slice(2)).ibd) {
        console.log('installing non-bundled packages');
        yield installPackages()
            .then(() => console.log('Packages installed successfully'), err => console.error(`Error installing packages: ${err.stack}`));
    }
}))
    .catch(err => {
    console.error(err);
    return process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25vZGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHNEQUE2QjtBQUM3Qix5Q0FBeUM7QUFDekMsb0RBQXNCO0FBQ3RCLHdEQUErQjtBQUMvQixnREFBdUI7QUFDdkIsdUNBQW1EO0FBR25ELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN2RixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUMvQixJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFLENBQUMsWUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FDeEUsQ0FBQTtBQUVELE1BQU0scUJBQ0wsd0JBQXdCLEVBQUUsYUFBYSxFQUN2QyxtQkFBbUIsRUFBRSxFQUFFLEVBQ3ZCLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQy9CLE1BQU0sRUFBRSxJQUFJLEVBQ1osT0FBTyxFQUFFLFlBQVksRUFDckIsU0FBUyxFQUFFLFFBQVEsRUFDbkIsTUFBTSxFQUFFLElBQUksRUFDWixRQUFRLEVBQUUsSUFBSSxJQUNYLGFBQWEsQ0FDaEIsRUFWSyxFQUFDLHdCQUF3QixFQUFFLG1CQUFtQixPQVVuRCxFQVZ3RCxNQUFNLGNBQXpELG1EQUEwRCxDQVUvRCxDQUFBO0FBRUQsU0FBUyxvQkFBb0I7SUFDNUIsT0FBTyxtQkFBbUIsS0FBSyxHQUFHLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFBO0FBQ3JFLENBQUM7QUFFRCxTQUFTLHFCQUFxQjtJQUM3QixPQUFPLGFBQUUsQ0FBQyxT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bnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgZXNidWlsZCBmcm9tICdlc2J1aWxkJ1xuaW1wb3J0IGZzU3luYywge3Byb21pc2VzIGFzIGZzfSBmcm9tICdmcydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge251bGxJZkVycm9yLCBydW5Db21tYW5kfSBmcm9tICcuLi8uLi91dGlscydcblxuXG5jb25zdCBwcm9qZWN0UGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzU3luYy5yZWFkRmlsZVN5bmMoJy4vcGFja2FnZS5qc29uJykudG9TdHJpbmcoKSlcbmNvbnN0IHByb2plY3RDb25maWcgPSBKU09OLnBhcnNlKFxuXHRudWxsSWZFcnJvcigoKSA9PiBmc1N5bmMucmVhZEZpbGVTeW5jKCcuc2NyaXB0cy5qc29uJykpLnRvU3RyaW5nKCkgfHwge30sXG4pXG5cbmNvbnN0IHtwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsIGJ1bmRsZWREZXBlbmRlbmNpZXMsIC4uLkNPTkZJR30gPSB7XG5cdHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aDogJ2Rpc3QvYnVuZGxlJyxcblx0YnVuZGxlZERlcGVuZGVuY2llczogW10sXG5cdGVudHJ5UG9pbnRzOiBbJ3NyYy9iaW4vd3d3LmpzJ10sXG5cdGJ1bmRsZTogdHJ1ZSxcblx0b3V0RmlsZTogJ2FwcC5taW4uanMnLFxuXHRzb3VyY2VtYXA6ICdpbmxpbmUnLFxuXHRtaW5pZnk6IHRydWUsXG5cdG1ldGFmaWxlOiB0cnVlLFxuXHQuLi5wcm9qZWN0Q29uZmlnLFxufVxuXG5mdW5jdGlvbiBpc0J1bmRsZWREZXBzQWxsRGVwcygpIHtcblx0cmV0dXJuIGJ1bmRsZWREZXBlbmRlbmNpZXMgPT09ICcqJyB8fCBidW5kbGVkRGVwZW5kZW5jaWVzWzBdID09PSAnKidcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGFja2FnZUpzb25GaWxlKCkge1xuXHRyZXR1cm4gZnMud3JpdGVGaWxlKFxuXHRcdHBhdGguam9pbihwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsICdwYWNrYWdlLmpzb24nKSxcblx0XHRKU09OLnN0cmluZ2lmeShcblx0XHRcdF8ucGljayhcblx0XHRcdFx0cHJvamVjdFBhY2thZ2VKc29uLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0J25hbWUnLFxuXHRcdFx0XHRcdCdlbmdpbmVzJyxcblx0XHRcdFx0XHQndmVyc2lvbicsXG5cdFx0XHRcdFx0Li4uKGlzQnVuZGxlZERlcHNBbGxEZXBzKClcblx0XHRcdFx0XHRcdFx0PyBbJ2RlcGVuZGVuY2llcyddXG5cdFx0XHRcdFx0XHRcdDogYnVuZGxlZERlcGVuZGVuY2llcy5tYXAoYiA9PiAoYGRlcGVuZGVuY2llcy4ke2J9YCkpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCxcblx0XHRcdFx0XSxcblx0XHRcdCksXG5cdFx0XHRudWxsLFxuXHRcdFx0Mixcblx0XHQpLFxuXHQpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGxQYWNrYWdlcygpIHtcblx0YXdhaXQgZnMuY3AoXG5cdFx0J3BhY2thZ2UtbG9jay5qc29uJyxcblx0XHRwYXRoLmpvaW4ocGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS1sb2NrLmpzb24nKSxcblx0KVxuXG5cdHJldHVybiBydW5Db21tYW5kKCducG0nLCBbJ2luc3RhbGwnLCBgLS1wcmVmaXg9JHtwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgcGFja2FnZXNJbnN0YWxsYXRpb25QYXRoKX1gXSlcblx0XHQudGhlbigoKSA9PiBmcy5ybShwYXRoLmpvaW4ocGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS1sb2NrLmpzb24nKSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGVzYnVpbGQuYnVpbGQoe1xuXHRlbnRyeVBvaW50czogQ09ORklHLmVudHJ5UG9pbnRzLFxuXHRidW5kbGU6IENPTkZJRy5idW5kbGUsXG5cdG91dGZpbGU6IHBhdGguam9pbihwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsIENPTkZJRy5vdXRGaWxlKSxcblx0cGxhdGZvcm06ICdub2RlJyxcblx0c291cmNlbWFwOiBDT05GSUcuc291cmNlbWFwLFxuXHRtaW5pZnk6IENPTkZJRy5taW5pZnksXG5cdG1ldGFmaWxlOiBDT05GSUcubWV0YWZpbGUsXG5cdGV4dGVybmFsOiBpc0J1bmRsZWREZXBzQWxsRGVwcygpID8gT2JqZWN0LmtleXMocHJvamVjdFBhY2thZ2VKc29uLmRlcGVuZGVuY2llcykgOiBidW5kbGVkRGVwZW5kZW5jaWVzLFxufSlcblx0LnRoZW4oKHttZXRhZmlsZX0pID0+IENPTkZJRy5tZXRhZmlsZSAmJiBjb25zb2xlLmxvZyhlc2J1aWxkLmFuYWx5emVNZXRhZmlsZVN5bmMobWV0YWZpbGUpKSlcblx0LnRoZW4oKCkgPT4gY3JlYXRlUGFja2FnZUpzb25GaWxlKCkpXG5cdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRpZiAobWluaW1pc3QocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKS5pYmQpIHsgLy8gaWJkIHN0YW5kIGZvciBpbnN0YWxsQnVuZGxlZERlcGVuZGVuY2llc1xuXHRcdFx0Y29uc29sZS5sb2coJ2luc3RhbGxpbmcgbm9uLWJ1bmRsZWQgcGFja2FnZXMnKVxuXHRcdFx0YXdhaXQgaW5zdGFsbFBhY2thZ2VzKClcblx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0KCkgPT4gY29uc29sZS5sb2coJ1BhY2thZ2VzIGluc3RhbGxlZCBzdWNjZXNzZnVsbHknKSxcblx0XHRcdFx0XHRlcnIgPT4gY29uc29sZS5lcnJvcihgRXJyb3IgaW5zdGFsbGluZyBwYWNrYWdlczogJHtlcnIuc3RhY2t9YCksXG5cdFx0XHRcdClcblx0XHR9XG5cdH0pXG5cdC5jYXRjaChlcnIgPT4ge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKVxuXHRcdHJldHVybiBwcm9jZXNzLmV4aXQoMSlcblx0fSlcbiJdfQ==