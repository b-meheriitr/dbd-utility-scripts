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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBbUM7QUFDbkMseUNBQXlDO0FBQ3pDLHdEQUErQjtBQUMvQixnREFBdUI7QUFDdkIsbUNBQTZCO0FBRXRCLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLEVBQUU7SUFDdkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFBLHFCQUFLLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUE7UUFFM0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUVqRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLENBQUE7YUFDVDtpQkFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNwRjtRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFoQlksUUFBQSxVQUFVLGNBZ0J0QjtBQUVELFNBQWdCLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsSUFBSTtJQUNsRSxJQUFJO1FBQ0gsT0FBTyxVQUFVLEVBQUUsQ0FBQTtLQUNuQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1gsT0FBTyxVQUFVLENBQUE7S0FDakI7QUFDRixDQUFDO0FBTkQsc0RBTUM7QUFFWSxRQUFBLE9BQU8sR0FBRyxJQUFBLGtCQUFRLEVBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUV6QyxRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN0QyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFNLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQzlFLENBQUE7QUFFRCxTQUFnQixZQUFZLENBQUMsTUFBTTtJQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXRDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5QixPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxxQkFBYSxDQUFDLFdBQVcsRUFBRTtZQUM5QixNQUFNLGlCQUFpQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFBO1lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQ1YsY0FBYyxFQUNkLGlCQUFpQixHQUFHLElBQUk7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixHQUFHLElBQUksR0FBRztnQkFDaEMsQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLElBQUksQ0FDM0IsQ0FBQTtTQUNEO0lBQ0YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBZkQsb0NBZUM7QUFFTSxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQUMsT0FBTyxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUMsRUFBRSxFQUFFO0lBQy9DLE9BQU8sYUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRXpDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQixPQUFPLGVBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDOUI7WUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQixDQUFDLENBQUMsQ0FDRixDQUFBO0lBQ0YsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1osSUFBSSxDQUFDLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO1lBQ3JELE1BQU0sR0FBRyxDQUFBO1NBQ1Q7SUFDRixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQXBCWSxRQUFBLEtBQUssU0FvQmpCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0IHtzcGF3bn0gZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCBmc1N5bmMsIHtwcm9taXNlcyBhcyBmc30gZnJvbSAnZnMnXG5pbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHtyaW1yYWZ9IGZyb20gJ3JpbXJhZidcblxuZXhwb3J0IGNvbnN0IHJ1bkNvbW1hbmQgPSAoY29tbWFuZCwgYXJncywgY3dkID0gbnVsbCkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IHByb2Nlc3MgPSBzcGF3bihjb21tYW5kLCBhcmdzLCB7Y3dkfSlcblxuXHRcdHByb2Nlc3Muc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKVxuXG5cdFx0cHJvY2Vzcy5zdGRlcnIub24oJ2RhdGEnLCBkYXRhID0+IGNvbnNvbGUuZXJyb3IoZGF0YS50b1N0cmluZygpKSlcblxuXHRcdHByb2Nlc3Mub24oJ2Nsb3NlJywgY29kZSA9PiB7XG5cdFx0XHRpZiAoY29kZSA9PT0gMCkge1xuXHRcdFx0XHRyZXNvbHZlKClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoYENvbW1hbmQgJyR7Y29tbWFuZH0gJHthcmdzLmpvaW4oJyAnKX0nIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5TdWJzdGl0dXRlSWZFcnIoc3luY0FjdGlvbiwgc3Vic3RpdHV0ZSA9IG51bGwpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gc3luY0FjdGlvbigpXG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gc3Vic3RpdHV0ZVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBjbGlBcmdzID0gbWluaW1pc3QocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKVxuXG5leHBvcnQgY29uc3QgcHJvamVjdENvbmZpZyA9IEpTT04ucGFyc2UoXG5cdHJldHVyblN1YnN0aXR1dGVJZkVycigoKSA9PiBmc1N5bmMucmVhZEZpbGVTeW5jKCcuc2NyaXB0cy5jb25maWcuanNvbicpLCAne30nKSxcbilcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ1RpbWVUYWtlbihhY3Rpb24pIHtcblx0Y29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFjdGlvbigpKVxuXHRcdC5maW5hbGx5KCgpID0+IHtcblx0XHRcdGlmIChwcm9qZWN0Q29uZmlnLnByb2ZpbGVUaW1lKSB7XG5cdFx0XHRcdGNvbnN0IHRpbWVUYWtlbkluTWlsbGlzID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWVcblx0XHRcdFx0Y29uc29sZS5sb2coXG5cdFx0XHRcdFx0J3RpbWUgdGFrZW46ICcsXG5cdFx0XHRcdFx0dGltZVRha2VuSW5NaWxsaXMgPiAxMDAwXG5cdFx0XHRcdFx0XHQ/IGAke3RpbWVUYWtlbkluTWlsbGlzIC8gMTAwMH1zYFxuXHRcdFx0XHRcdFx0OiBgJHt0aW1lVGFrZW5Jbk1pbGxpc31tc2AsXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxufVxuXG5leHBvcnQgY29uc3QgY2xlYW4gPSAoe2RpclBhdGgsIGlnbm9yZSA9IFtdfSkgPT4ge1xuXHRyZXR1cm4gZnMucmVhZGRpcihkaXJQYXRoKVxuXHRcdC50aGVuKGZpbGVzID0+IHtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0ZmlsZXMubWFwKGZpbGUgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRpclBhdGgsIGZpbGUpXG5cblx0XHRcdFx0XHRpZiAoIWlnbm9yZS5pbmNsdWRlcyhmaWxlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJpbXJhZi5yaW1yYWYoZmlsZVBhdGgpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgtMSlcblx0XHRcdFx0fSksXG5cdFx0XHQpXG5cdFx0fSlcblx0XHQuY2F0Y2goZXJyID0+IHtcblx0XHRcdGlmICghKC9ubyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5Ly50ZXN0KGVyci5tZXNzYWdlKSkpIHtcblx0XHRcdFx0dGhyb3cgZXJyXG5cdFx0XHR9XG5cdFx0fSlcbn1cbiJdfQ==