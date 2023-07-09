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
exports.default = () => {
    esbuild_1.default.build({
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVuZGxlL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQTZCO0FBQzdCLHlDQUF5QztBQUN6QyxvREFBc0I7QUFDdEIsd0RBQStCO0FBQy9CLGdEQUF1QjtBQUN2Qix1Q0FBbUQ7QUFFbkQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQy9CLElBQUEsbUJBQVcsRUFBQyxHQUFHLEVBQUUsQ0FBQyxZQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUN4RSxDQUFBO0FBRUQsTUFBTSxxQkFDTCx3QkFBd0IsRUFBRSxhQUFhLEVBQ3ZDLG1CQUFtQixFQUFFLEVBQUUsRUFDdkIsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFDL0IsTUFBTSxFQUFFLElBQUksRUFDWixPQUFPLEVBQUUsWUFBWSxFQUNyQixTQUFTLEVBQUUsUUFBUSxFQUNuQixNQUFNLEVBQUUsSUFBSSxFQUNaLFFBQVEsRUFBRSxJQUFJLElBQ1gsYUFBYSxDQUNoQixFQVZLLEVBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLE9BVW5ELEVBVndELE1BQU0sY0FBekQsbURBQTBELENBVS9ELENBQUE7QUFFRCxTQUFTLG9CQUFvQjtJQUM1QixPQUFPLG1CQUFtQixLQUFLLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUE7QUFDckUsQ0FBQztBQUVELFNBQVMscUJBQXFCO0lBQzdCLE9BQU8sYUFBRSxDQUFDLFNB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O0FBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0IGVzYnVpbGQgZnJvbSAnZXNidWlsZCdcbmltcG9ydCBmc1N5bmMsIHtwcm9taXNlcyBhcyBmc30gZnJvbSAnZnMnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHtudWxsSWZFcnJvciwgcnVuQ29tbWFuZH0gZnJvbSAnLi4vLi4vdXRpbHMnXG5cbmNvbnN0IHByb2plY3RQYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UoZnNTeW5jLnJlYWRGaWxlU3luYygnLi9wYWNrYWdlLmpzb24nKS50b1N0cmluZygpKVxuY29uc3QgcHJvamVjdENvbmZpZyA9IEpTT04ucGFyc2UoXG5cdG51bGxJZkVycm9yKCgpID0+IGZzU3luYy5yZWFkRmlsZVN5bmMoJy5zY3JpcHRzLmpzb24nKSkudG9TdHJpbmcoKSB8fCB7fSxcbilcblxuY29uc3Qge3BhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgYnVuZGxlZERlcGVuZGVuY2llcywgLi4uQ09ORklHfSA9IHtcblx0cGFja2FnZXNJbnN0YWxsYXRpb25QYXRoOiAnZGlzdC9idW5kbGUnLFxuXHRidW5kbGVkRGVwZW5kZW5jaWVzOiBbXSxcblx0ZW50cnlQb2ludHM6IFsnc3JjL2Jpbi93d3cuanMnXSxcblx0YnVuZGxlOiB0cnVlLFxuXHRvdXRGaWxlOiAnYXBwLm1pbi5qcycsXG5cdHNvdXJjZW1hcDogJ2lubGluZScsXG5cdG1pbmlmeTogdHJ1ZSxcblx0bWV0YWZpbGU6IHRydWUsXG5cdC4uLnByb2plY3RDb25maWcsXG59XG5cbmZ1bmN0aW9uIGlzQnVuZGxlZERlcHNBbGxEZXBzKCkge1xuXHRyZXR1cm4gYnVuZGxlZERlcGVuZGVuY2llcyA9PT0gJyonIHx8IGJ1bmRsZWREZXBlbmRlbmNpZXNbMF0gPT09ICcqJ1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYWNrYWdlSnNvbkZpbGUoKSB7XG5cdHJldHVybiBmcy53cml0ZUZpbGUoXG5cdFx0cGF0aC5qb2luKHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgJ3BhY2thZ2UuanNvbicpLFxuXHRcdEpTT04uc3RyaW5naWZ5KFxuXHRcdFx0Xy5waWNrKFxuXHRcdFx0XHRwcm9qZWN0UGFja2FnZUpzb24sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHQnbmFtZScsXG5cdFx0XHRcdFx0J2VuZ2luZXMnLFxuXHRcdFx0XHRcdCd2ZXJzaW9uJyxcblx0XHRcdFx0XHQuLi4oaXNCdW5kbGVkRGVwc0FsbERlcHMoKVxuXHRcdFx0XHRcdFx0XHQ/IFsnZGVwZW5kZW5jaWVzJ11cblx0XHRcdFx0XHRcdFx0OiBidW5kbGVkRGVwZW5kZW5jaWVzLm1hcChiID0+IChgZGVwZW5kZW5jaWVzLiR7Yn1gKSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRdLFxuXHRcdFx0KSxcblx0XHRcdG51bGwsXG5cdFx0XHQyLFxuXHRcdCksXG5cdClcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5zdGFsbFBhY2thZ2VzKCkge1xuXHRhd2FpdCBmcy5jcChcblx0XHQncGFja2FnZS1sb2NrLmpzb24nLFxuXHRcdHBhdGguam9pbihwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsICdwYWNrYWdlLWxvY2suanNvbicpLFxuXHQpXG5cblx0cmV0dXJuIHJ1bkNvbW1hbmQoJ25wbScsIFsnaW5zdGFsbCcsIGAtLXByZWZpeD0ke3BhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgpfWBdKVxuXHRcdC50aGVuKCgpID0+IGZzLnJtKHBhdGguam9pbihwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsICdwYWNrYWdlLWxvY2suanNvbicpKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuXHRlc2J1aWxkLmJ1aWxkKHtcblx0XHRlbnRyeVBvaW50czogQ09ORklHLmVudHJ5UG9pbnRzLFxuXHRcdGJ1bmRsZTogQ09ORklHLmJ1bmRsZSxcblx0XHRvdXRmaWxlOiBwYXRoLmpvaW4ocGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCBDT05GSUcub3V0RmlsZSksXG5cdFx0cGxhdGZvcm06ICdub2RlJyxcblx0XHRzb3VyY2VtYXA6IENPTkZJRy5zb3VyY2VtYXAsXG5cdFx0bWluaWZ5OiBDT05GSUcubWluaWZ5LFxuXHRcdG1ldGFmaWxlOiBDT05GSUcubWV0YWZpbGUsXG5cdFx0ZXh0ZXJuYWw6IGlzQnVuZGxlZERlcHNBbGxEZXBzKCkgPyBPYmplY3Qua2V5cyhwcm9qZWN0UGFja2FnZUpzb24uZGVwZW5kZW5jaWVzKSA6IGJ1bmRsZWREZXBlbmRlbmNpZXMsXG5cdH0pXG5cdFx0LnRoZW4oKHttZXRhZmlsZX0pID0+IENPTkZJRy5tZXRhZmlsZSAmJiBjb25zb2xlLmxvZyhlc2J1aWxkLmFuYWx5emVNZXRhZmlsZVN5bmMobWV0YWZpbGUpKSlcblx0XHQudGhlbigoKSA9PiBjcmVhdGVQYWNrYWdlSnNvbkZpbGUoKSlcblx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAobWluaW1pc3QocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKS5pYmQpIHsgLy8gaWJkIHN0YW5kIGZvciBpbnN0YWxsQnVuZGxlZERlcGVuZGVuY2llc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnaW5zdGFsbGluZyBub24tYnVuZGxlZCBwYWNrYWdlcycpXG5cdFx0XHRcdGF3YWl0IGluc3RhbGxQYWNrYWdlcygpXG5cdFx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0XHQoKSA9PiBjb25zb2xlLmxvZygnUGFja2FnZXMgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseScpLFxuXHRcdFx0XHRcdFx0ZXJyID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yIGluc3RhbGxpbmcgcGFja2FnZXM6ICR7ZXJyLnN0YWNrfWApLFxuXHRcdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpXG5cdFx0XHRyZXR1cm4gcHJvY2Vzcy5leGl0KDEpXG5cdFx0fSlcbn1cbiJdfQ==