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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.logTimeTaken = exports.projectConfig = exports.cliArgs = exports.returnSubstituteIfErr = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importStar(require("fs"));
const minimist_1 = __importDefault(require("minimist"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = require("rimraf");
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
exports.cliArgs = (0, minimist_1.default)(process.argv.slice(2));
exports.projectConfig = JSON.parse(returnSubstituteIfErr(() => fs_1.default.readFileSync('.scripts.config.json'), '{}'));
function logTimeTaken(action) {
    const startTime = new Date().getTime();
    return Promise.resolve(action())
        .finally(() => {
        if (exports.projectConfig.profileTime) {
            const timeTakenInMillis = new Date().getTime() - startTime;
            console.log('time taken: ', timeTakenInMillis > 1000
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQW1DO0FBQ25DLHlDQUF5QztBQUN6Qyx3REFBK0I7QUFDL0IsZ0RBQXVCO0FBQ3ZCLG1DQUE2QjtBQUV0QixNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxFQUFFO0lBQ3ZELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBQSxxQkFBSyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFBO1FBRTNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUUvRCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFakUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sRUFBRSxDQUFBO2FBQ1Q7aUJBQU07Z0JBQ04sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDcEY7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsVUFBVSxjQWdCdEI7QUFFRCxTQUFnQixxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLElBQUk7SUFDbEUsSUFBSTtRQUNILE9BQU8sVUFBVSxFQUFFLENBQUE7S0FDbkI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNYLE9BQU8sVUFBVSxDQUFBO0tBQ2pCO0FBQ0YsQ0FBQztBQU5ELHNEQU1DO0FBRVksUUFBQSxPQUFPLEdBQUcsSUFBQSxrQkFBUSxFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFFekMsUUFBQSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDdEMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBTSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUM5RSxDQUFBO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE1BQU07SUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUV0QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNiLElBQUkscUJBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDOUIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQTtZQUMxRCxPQUFPLENBQUMsR0FBRyxDQUNWLGNBQWMsRUFDZCxpQkFBaUIsR0FBRyxJQUFJO2dCQUN2QixDQUFDLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLEdBQUc7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLENBQzNCLENBQUE7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWZELG9DQWVDO0FBRU0sTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFDLEVBQUUsRUFBRTtJQUMvQyxPQUFPLGFBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQixNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUV6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxlQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzlCO1lBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0IsQ0FBQyxDQUFDLENBQ0YsQ0FBQTtJQUNGLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNaLElBQUksQ0FBQyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNyRCxNQUFNLEdBQUcsQ0FBQTtTQUNUO0lBQ0YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFwQlksUUFBQSxLQUFLLFNBb0JqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCB7c3Bhd259IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgZnNTeW5jLCB7cHJvbWlzZXMgYXMgZnN9IGZyb20gJ2ZzJ1xuaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7cmltcmFmfSBmcm9tICdyaW1yYWYnXG5cbmV4cG9ydCBjb25zdCBydW5Db21tYW5kID0gKGNvbW1hbmQsIGFyZ3MsIGN3ZCA9IG51bGwpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCBwcm9jZXNzID0gc3Bhd24oY29tbWFuZCwgYXJncywge2N3ZH0pXG5cblx0XHRwcm9jZXNzLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSlcblxuXHRcdHByb2Nlc3Muc3RkZXJyLm9uKCdkYXRhJywgZGF0YSA9PiBjb25zb2xlLmVycm9yKGRhdGEudG9TdHJpbmcoKSkpXG5cblx0XHRwcm9jZXNzLm9uKCdjbG9zZScsIGNvZGUgPT4ge1xuXHRcdFx0aWYgKGNvZGUgPT09IDApIHtcblx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZWplY3QobmV3IEVycm9yKGBDb21tYW5kICcke2NvbW1hbmR9ICR7YXJncy5qb2luKCcgJyl9JyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSlcblx0XHRcdH1cblx0XHR9KVxuXHR9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0dXJuU3Vic3RpdHV0ZUlmRXJyKHN5bmNBY3Rpb24sIHN1YnN0aXR1dGUgPSBudWxsKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHN5bmNBY3Rpb24oKVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIHN1YnN0aXR1dGVcblx0fVxufVxuXG5leHBvcnQgY29uc3QgY2xpQXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSlcblxuZXhwb3J0IGNvbnN0IHByb2plY3RDb25maWcgPSBKU09OLnBhcnNlKFxuXHRyZXR1cm5TdWJzdGl0dXRlSWZFcnIoKCkgPT4gZnNTeW5jLnJlYWRGaWxlU3luYygnLnNjcmlwdHMuY29uZmlnLmpzb24nKSwgJ3t9JyksXG4pXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dUaW1lVGFrZW4oYWN0aW9uKSB7XG5cdGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhY3Rpb24oKSlcblx0XHQuZmluYWxseSgoKSA9PiB7XG5cdFx0XHRpZiAocHJvamVjdENvbmZpZy5wcm9maWxlVGltZSkge1xuXHRcdFx0XHRjb25zdCB0aW1lVGFrZW5Jbk1pbGxpcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lXG5cdFx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcdCd0aW1lIHRha2VuOiAnLFxuXHRcdFx0XHRcdHRpbWVUYWtlbkluTWlsbGlzID4gMTAwMFxuXHRcdFx0XHRcdFx0PyBgJHt0aW1lVGFrZW5Jbk1pbGxpcyAvIDEwMDB9c2Bcblx0XHRcdFx0XHRcdDogYCR7dGltZVRha2VuSW5NaWxsaXN9bXNgLFxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFuID0gKHtkaXJQYXRoLCBpZ25vcmUgPSBbXX0pID0+IHtcblx0cmV0dXJuIGZzLnJlYWRkaXIoZGlyUGF0aClcblx0XHQudGhlbihmaWxlcyA9PiB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdGZpbGVzLm1hcChmaWxlID0+IHtcblx0XHRcdFx0XHRjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihkaXJQYXRoLCBmaWxlKVxuXG5cdFx0XHRcdFx0aWYgKCFpZ25vcmUuaW5jbHVkZXMoZmlsZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiByaW1yYWYucmltcmFmKGZpbGVQYXRoKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoLTEpXG5cdFx0XHRcdH0pLFxuXHRcdFx0KVxuXHRcdH0pXG5cdFx0LmNhdGNoKGVyciA9PiB7XG5cdFx0XHRpZiAoISgvbm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeS8udGVzdChlcnIubWVzc2FnZSkpKSB7XG5cdFx0XHRcdHRocm93IGVyclxuXHRcdFx0fVxuXHRcdH0pXG59XG4iXX0=