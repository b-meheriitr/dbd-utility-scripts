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
const projectConfig = JSON.parse((0, utils_1.returnSubstituteIfErr)(() => fs_1.default.readFileSync('.scripts.json'), '{}'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVuZGxlL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQTZCO0FBQzdCLHlDQUF5QztBQUN6QyxvREFBc0I7QUFDdEIsd0RBQStCO0FBQy9CLGdEQUF1QjtBQUN2Qix1Q0FBNkQ7QUFFN0QsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQy9CLElBQUEsNkJBQXFCLEVBQUMsR0FBRyxFQUFFLENBQUMsWUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRyxJQUFJLENBQUMsQ0FDeEUsQ0FBQTtBQUVELE1BQU0scUJBQ0wsd0JBQXdCLEVBQUUsYUFBYSxFQUN2QyxtQkFBbUIsRUFBRSxFQUFFLEVBQ3ZCLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQy9CLE1BQU0sRUFBRSxJQUFJLEVBQ1osT0FBTyxFQUFFLFlBQVksRUFDckIsU0FBUyxFQUFFLFFBQVEsRUFDbkIsTUFBTSxFQUFFLElBQUksRUFDWixRQUFRLEVBQUUsSUFBSSxJQUNYLGFBQWEsQ0FDaEIsRUFWSyxFQUFDLHdCQUF3QixFQUFFLG1CQUFtQixPQVVuRCxFQVZ3RCxNQUFNLGNBQXpELG1EQUEwRCxDQVUvRCxDQUFBO0FBRUQsU0FBUyxvQkFBb0I7SUFDNUIsT0FBTyxtQkFBbUIsS0FBSyxHQUFHLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFBO0FBQ3JFLENBQUM7QUFFRCxTQUFTLHFCQUFxQjtJQUM3QixPQUFPLGFBQUUsQ0FBQyxTQUFTLENBQ2xCLGNBQUks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QSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCBlc2J1aWxkIGZyb20gJ2VzYnVpbGQnXG5pbXBvcnQgZnNTeW5jLCB7cHJvbWlzZXMgYXMgZnN9IGZyb20gJ2ZzJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7cmV0dXJuU3Vic3RpdHV0ZUlmRXJyLCBydW5Db21tYW5kfSBmcm9tICcuLi8uLi91dGlscydcblxuY29uc3QgcHJvamVjdFBhY2thZ2VKc29uID0gSlNPTi5wYXJzZShmc1N5bmMucmVhZEZpbGVTeW5jKCcuL3BhY2thZ2UuanNvbicpLnRvU3RyaW5nKCkpXG5jb25zdCBwcm9qZWN0Q29uZmlnID0gSlNPTi5wYXJzZShcblx0cmV0dXJuU3Vic3RpdHV0ZUlmRXJyKCgpID0+IGZzU3luYy5yZWFkRmlsZVN5bmMoJy5zY3JpcHRzLmpzb24nKSwgICd7fScpLFxuKVxuXG5jb25zdCB7cGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCBidW5kbGVkRGVwZW5kZW5jaWVzLCAuLi5DT05GSUd9ID0ge1xuXHRwYWNrYWdlc0luc3RhbGxhdGlvblBhdGg6ICdkaXN0L2J1bmRsZScsXG5cdGJ1bmRsZWREZXBlbmRlbmNpZXM6IFtdLFxuXHRlbnRyeVBvaW50czogWydzcmMvYmluL3d3dy5qcyddLFxuXHRidW5kbGU6IHRydWUsXG5cdG91dEZpbGU6ICdhcHAubWluLmpzJyxcblx0c291cmNlbWFwOiAnaW5saW5lJyxcblx0bWluaWZ5OiB0cnVlLFxuXHRtZXRhZmlsZTogdHJ1ZSxcblx0Li4ucHJvamVjdENvbmZpZyxcbn1cblxuZnVuY3Rpb24gaXNCdW5kbGVkRGVwc0FsbERlcHMoKSB7XG5cdHJldHVybiBidW5kbGVkRGVwZW5kZW5jaWVzID09PSAnKicgfHwgYnVuZGxlZERlcGVuZGVuY2llc1swXSA9PT0gJyonXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhY2thZ2VKc29uRmlsZSgpIHtcblx0cmV0dXJuIGZzLndyaXRlRmlsZShcblx0XHRwYXRoLmpvaW4ocGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS5qc29uJyksXG5cdFx0SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRfLnBpY2soXG5cdFx0XHRcdHByb2plY3RQYWNrYWdlSnNvbixcblx0XHRcdFx0W1xuXHRcdFx0XHRcdCduYW1lJyxcblx0XHRcdFx0XHQnZW5naW5lcycsXG5cdFx0XHRcdFx0J3ZlcnNpb24nLFxuXHRcdFx0XHRcdC4uLihpc0J1bmRsZWREZXBzQWxsRGVwcygpXG5cdFx0XHRcdFx0XHQ/IFsnZGVwZW5kZW5jaWVzJ11cblx0XHRcdFx0XHRcdDogYnVuZGxlZERlcGVuZGVuY2llcy5tYXAoYiA9PiAoYGRlcGVuZGVuY2llcy4ke2J9YCkpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XSxcblx0XHRcdCksXG5cdFx0XHRudWxsLFxuXHRcdFx0Mixcblx0XHQpLFxuXHQpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc3RhbGxQYWNrYWdlcygpIHtcblx0YXdhaXQgZnMuY3AoXG5cdFx0J3BhY2thZ2UtbG9jay5qc29uJyxcblx0XHRwYXRoLmpvaW4ocGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS1sb2NrLmpzb24nKSxcblx0KVxuXG5cdHJldHVybiBydW5Db21tYW5kKCducG0nLCBbJ2luc3RhbGwnLCBgLS1wcmVmaXg9JHtwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgcGFja2FnZXNJbnN0YWxsYXRpb25QYXRoKX1gXSlcblx0XHQudGhlbigoKSA9PiBmcy5ybShwYXRoLmpvaW4ocGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS1sb2NrLmpzb24nKSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblx0ZXNidWlsZC5idWlsZCh7XG5cdFx0ZW50cnlQb2ludHM6IENPTkZJRy5lbnRyeVBvaW50cyxcblx0XHRidW5kbGU6IENPTkZJRy5idW5kbGUsXG5cdFx0b3V0ZmlsZTogcGF0aC5qb2luKHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCwgQ09ORklHLm91dEZpbGUpLFxuXHRcdHBsYXRmb3JtOiAnbm9kZScsXG5cdFx0c291cmNlbWFwOiBDT05GSUcuc291cmNlbWFwLFxuXHRcdG1pbmlmeTogQ09ORklHLm1pbmlmeSxcblx0XHRtZXRhZmlsZTogQ09ORklHLm1ldGFmaWxlLFxuXHRcdGV4dGVybmFsOiBpc0J1bmRsZWREZXBzQWxsRGVwcygpID8gT2JqZWN0LmtleXMocHJvamVjdFBhY2thZ2VKc29uLmRlcGVuZGVuY2llcykgOiBidW5kbGVkRGVwZW5kZW5jaWVzLFxuXHR9KVxuXHRcdC50aGVuKCh7bWV0YWZpbGV9KSA9PiBDT05GSUcubWV0YWZpbGUgJiYgY29uc29sZS5sb2coZXNidWlsZC5hbmFseXplTWV0YWZpbGVTeW5jKG1ldGFmaWxlKSkpXG5cdFx0LnRoZW4oKCkgPT4gY3JlYXRlUGFja2FnZUpzb25GaWxlKCkpXG5cdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSkuaWJkKSB7IC8vIGliZCBzdGFuZCBmb3IgaW5zdGFsbEJ1bmRsZWREZXBlbmRlbmNpZXNcblx0XHRcdFx0Y29uc29sZS5sb2coJ2luc3RhbGxpbmcgbm9uLWJ1bmRsZWQgcGFja2FnZXMnKVxuXHRcdFx0XHRhd2FpdCBpbnN0YWxsUGFja2FnZXMoKVxuXHRcdFx0XHRcdC50aGVuKFxuXHRcdFx0XHRcdFx0KCkgPT4gY29uc29sZS5sb2coJ1BhY2thZ2VzIGluc3RhbGxlZCBzdWNjZXNzZnVsbHknKSxcblx0XHRcdFx0XHRcdGVyciA9PiBjb25zb2xlLmVycm9yKGBFcnJvciBpbnN0YWxsaW5nIHBhY2thZ2VzOiAke2Vyci5zdGFja31gKSxcblx0XHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHQuY2F0Y2goZXJyID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKVxuXHRcdFx0cmV0dXJuIHByb2Nlc3MuZXhpdCgxKVxuXHRcdH0pXG59XG4iXX0=