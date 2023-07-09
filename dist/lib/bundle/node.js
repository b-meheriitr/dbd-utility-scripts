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
    var { packagesInstallationPath, bundledDependencies } = _a, esbuildConfig = __rest(_a, ["packagesInstallationPath", "bundledDependencies"]);
    if (args === void 0) { args = {}; }
    const config = {
        packagesInstallationPath: packagesInstallationPath || 'dist/bundle',
        bundledDependencies: bundledDependencies || [],
        esbuildConfig: Object.assign({ entryPoints: ['src/bin/www.js'], bundle: true, outfile: 'app.min.js', sourcemap: 'inline', minify: true, metafile: true }, esbuildConfig),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVuZGxlL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQTZCO0FBQzdCLHlDQUF5QztBQUN6QyxvREFBc0I7QUFDdEIsZ0RBQXVCO0FBQ3ZCLHVDQUFzQztBQUV0QyxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFFdkYsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEVBQUMsbUJBQW1CLEVBQUMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLEtBQUssR0FBRyxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQTtBQUVySCxTQUFTLHFCQUFxQixDQUFDLE1BQU07SUFDcEMsT0FBTyxhQUFFLENBQUMsU0FBUyxDQUNsQixjQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsRUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FDYixnQkFBQyxDQUFDLElBQUksQ0FDTCxrQkFBa0IsRUFDbEI7UUFDQyxNQUFNO1FBQ04sU0FBUztRQUNULFNBQVM7UUFDVCxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDNUQ7S0FDRCxDQUNELEVBQ0QsSUFBSSxFQUNKLENBQUMsQ0FDRCxDQUNELENBQUE7QUFDRixDQUFDO0FBRUQsU0FBZSxlQUFlLENBQUMsTUFB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ZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCBlc2J1aWxkIGZyb20gJ2VzYnVpbGQnXG5pbXBvcnQgZnNTeW5jLCB7cHJvbWlzZXMgYXMgZnN9IGZyb20gJ2ZzJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7cnVuQ29tbWFuZH0gZnJvbSAnLi4vLi4vdXRpbHMnXG5cbmNvbnN0IHByb2plY3RQYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UoZnNTeW5jLnJlYWRGaWxlU3luYygnLi9wYWNrYWdlLmpzb24nKS50b1N0cmluZygpKVxuXG5jb25zdCBpc0J1bmRsZWREZXBzQWxsRGVwcyA9ICh7YnVuZGxlZERlcGVuZGVuY2llc30pID0+IGJ1bmRsZWREZXBlbmRlbmNpZXMgPT09ICcqJyB8fCBidW5kbGVkRGVwZW5kZW5jaWVzWzBdID09PSAnKidcblxuZnVuY3Rpb24gY3JlYXRlUGFja2FnZUpzb25GaWxlKGNvbmZpZykge1xuXHRyZXR1cm4gZnMud3JpdGVGaWxlKFxuXHRcdHBhdGguam9pbihjb25maWcucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLCAncGFja2FnZS5qc29uJyksXG5cdFx0SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRfLnBpY2soXG5cdFx0XHRcdHByb2plY3RQYWNrYWdlSnNvbixcblx0XHRcdFx0W1xuXHRcdFx0XHRcdCduYW1lJyxcblx0XHRcdFx0XHQnZW5naW5lcycsXG5cdFx0XHRcdFx0J3ZlcnNpb24nLFxuXHRcdFx0XHRcdC4uLihpc0J1bmRsZWREZXBzQWxsRGVwcyhjb25maWcpXG5cdFx0XHRcdFx0XHQ/IFsnZGVwZW5kZW5jaWVzJ11cblx0XHRcdFx0XHRcdDogY29uZmlnLmJ1bmRsZWREZXBlbmRlbmNpZXMubWFwKGIgPT4gKGBkZXBlbmRlbmNpZXMuJHtifWApKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdF0sXG5cdFx0XHQpLFxuXHRcdFx0bnVsbCxcblx0XHRcdDIsXG5cdFx0KSxcblx0KVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbnN0YWxsUGFja2FnZXMoY29uZmlnKSB7XG5cdGF3YWl0IGZzLmNwKFxuXHRcdCdwYWNrYWdlLWxvY2suanNvbicsXG5cdFx0cGF0aC5qb2luKGNvbmZpZy5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsICdwYWNrYWdlLWxvY2suanNvbicpLFxuXHQpXG5cblx0cmV0dXJuIHJ1bkNvbW1hbmQoXG5cdFx0J25wbScsXG5cdFx0WydpbnN0YWxsJywgYC0tcHJlZml4PSR7cGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgpfWBdLFxuXHQpXG5cdFx0LnRoZW4oKCkgPT4gZnMucm0ocGF0aC5qb2luKGNvbmZpZy5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsICdwYWNrYWdlLWxvY2suanNvbicpKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHtwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsIGJ1bmRsZWREZXBlbmRlbmNpZXMsIC4uLmVzYnVpbGRDb25maWd9LCBhcmdzID0ge30pID0+IHtcblx0Y29uc3QgY29uZmlnID0ge1xuXHRcdHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aDogcGFja2FnZXNJbnN0YWxsYXRpb25QYXRoIHx8ICdkaXN0L2J1bmRsZScsXG5cdFx0YnVuZGxlZERlcGVuZGVuY2llczogYnVuZGxlZERlcGVuZGVuY2llcyB8fCBbXSxcblx0XHRlc2J1aWxkQ29uZmlnOiB7XG5cdFx0XHRlbnRyeVBvaW50czogWydzcmMvYmluL3d3dy5qcyddLFxuXHRcdFx0YnVuZGxlOiB0cnVlLFxuXHRcdFx0b3V0ZmlsZTogJ2FwcC5taW4uanMnLFxuXHRcdFx0c291cmNlbWFwOiAnaW5saW5lJyxcblx0XHRcdG1pbmlmeTogdHJ1ZSxcblx0XHRcdG1ldGFmaWxlOiB0cnVlLFxuXHRcdFx0Li4uZXNidWlsZENvbmZpZyxcblx0XHR9LFxuXHR9XG5cblx0cmV0dXJuIGVzYnVpbGQuYnVpbGQoe1xuXHRcdC4uLmNvbmZpZy5lc2J1aWxkQ29uZmlnLFxuXHRcdHBsYXRmb3JtOiAnbm9kZScsXG5cdFx0b3V0ZmlsZTogcGF0aC5qb2luKGNvbmZpZy5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsIGNvbmZpZy5lc2J1aWxkQ29uZmlnLm91dGZpbGUpLFxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuXHRcdGV4dGVybmFsOiBjb25maWcuZXNidWlsZENvbmZpZy5idW5kbGVcblx0XHRcdD8gaXNCdW5kbGVkRGVwc0FsbERlcHMoY29uZmlnKVxuXHRcdFx0XHQ/IE9iamVjdC5rZXlzKHByb2plY3RQYWNrYWdlSnNvbi5kZXBlbmRlbmNpZXMpXG5cdFx0XHRcdDogY29uZmlnLmJ1bmRsZWREZXBlbmRlbmNpZXNcblx0XHRcdDogdW5kZWZpbmVkLFxuXHR9KVxuXHRcdC50aGVuKCh7bWV0YWZpbGV9KSA9PiBjb25maWcuZXNidWlsZENvbmZpZy5tZXRhZmlsZSAmJiBjb25zb2xlLmxvZyhlc2J1aWxkLmFuYWx5emVNZXRhZmlsZVN5bmMobWV0YWZpbGUpKSlcblx0XHQudGhlbigoKSA9PiBjcmVhdGVQYWNrYWdlSnNvbkZpbGUoY29uZmlnKSlcblx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoYXJncy5pYmQpIHsgLy8gaWJkIHN0YW5kIGZvciBpbnN0YWxsQnVuZGxlZERlcGVuZGVuY2llc1xuXHRcdFx0XHRjb25zb2xlLmxvZygnaW5zdGFsbGluZyBub24tYnVuZGxlZCBwYWNrYWdlcycpXG5cdFx0XHRcdGF3YWl0IGluc3RhbGxQYWNrYWdlcyhjb25maWcpXG5cdFx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0XHQoKSA9PiBjb25zb2xlLmxvZygnUGFja2FnZXMgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseScpLFxuXHRcdFx0XHRcdFx0ZXJyID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yIGluc3RhbGxpbmcgcGFja2FnZXM6ICR7ZXJyLnN0YWNrfWApLFxuXHRcdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpXG5cdFx0XHRyZXR1cm4gcHJvY2Vzcy5leGl0KDEpXG5cdFx0fSlcbn1cbiJdfQ==