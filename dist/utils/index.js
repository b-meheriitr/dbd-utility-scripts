"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTimeTaken = exports.projectConfig = exports.getCliArgs = exports.returnSubstituteIfErr = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const minimist_1 = __importDefault(require("minimist"));
const fs_1 = __importDefault(require("fs"));
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
const getCliArgs = () => (0, minimist_1.default)(process.argv.slice(2));
exports.getCliArgs = getCliArgs;
exports.projectConfig = JSON.parse(returnSubstituteIfErr(() => fs_1.default.readFileSync('.scripts.config.json'), '{}'));
function logTimeTaken(action) {
    const startTime = new Date().getTime();
    return Promise.resolve(action)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsaURBQW1DO0FBQ25DLHdEQUErQjtBQUMvQiw0Q0FBdUI7QUFFaEIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsRUFBRTtJQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUEscUJBQUssRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQTtRQUUzQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRWpFLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDZixPQUFPLEVBQUUsQ0FBQTthQUNUO2lCQUFNO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3BGO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWhCWSxRQUFBLFVBQVUsY0FnQnRCO0FBRUQsU0FBZ0IscUJBQXFCLENBQUMsVUFBVSxFQUFFLFVBQVUsR0FBRyxJQUFJO0lBQ2xFLElBQUk7UUFDSCxPQUFPLFVBQVUsRUFBRSxDQUFBO0tBQ25CO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDWCxPQUFPLFVBQVUsQ0FBQTtLQUNqQjtBQUNGLENBQUM7QUFORCxzREFNQztBQUVNLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUEsa0JBQVEsRUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQWxELFFBQUEsVUFBVSxjQUF3QztBQUdsRCxRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN0QyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFNLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQzlFLENBQUE7QUFFRCxTQUFnQixZQUFZLENBQUMsTUFBTTtJQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXRDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDNUIsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNiLElBQUkscUJBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDOUIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQTtZQUMxRCxPQUFPLENBQUMsR0FBRyxDQUNWLGNBQWMsRUFDZCxpQkFBaUIsR0FBRyxJQUFJO2dCQUN2QixDQUFDLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLEdBQUc7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLENBQzNCLENBQUE7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWZELG9DQWVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0IHtzcGF3bn0gZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBmc1N5bmMgZnJvbSAnZnMnXG5cbmV4cG9ydCBjb25zdCBydW5Db21tYW5kID0gKGNvbW1hbmQsIGFyZ3MsIGN3ZCA9IG51bGwpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCBwcm9jZXNzID0gc3Bhd24oY29tbWFuZCwgYXJncywge2N3ZH0pXG5cblx0XHRwcm9jZXNzLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSlcblxuXHRcdHByb2Nlc3Muc3RkZXJyLm9uKCdkYXRhJywgZGF0YSA9PiBjb25zb2xlLmVycm9yKGRhdGEudG9TdHJpbmcoKSkpXG5cblx0XHRwcm9jZXNzLm9uKCdjbG9zZScsIGNvZGUgPT4ge1xuXHRcdFx0aWYgKGNvZGUgPT09IDApIHtcblx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZWplY3QobmV3IEVycm9yKGBDb21tYW5kICcke2NvbW1hbmR9ICR7YXJncy5qb2luKCcgJyl9JyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSlcblx0XHRcdH1cblx0XHR9KVxuXHR9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0dXJuU3Vic3RpdHV0ZUlmRXJyKHN5bmNBY3Rpb24sIHN1YnN0aXR1dGUgPSBudWxsKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHN5bmNBY3Rpb24oKVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIHN1YnN0aXR1dGVcblx0fVxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2xpQXJncyA9ICgpID0+IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSlcblxuXG5leHBvcnQgY29uc3QgcHJvamVjdENvbmZpZyA9IEpTT04ucGFyc2UoXG5cdHJldHVyblN1YnN0aXR1dGVJZkVycigoKSA9PiBmc1N5bmMucmVhZEZpbGVTeW5jKCcuc2NyaXB0cy5jb25maWcuanNvbicpLCAne30nKSxcbilcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ1RpbWVUYWtlbihhY3Rpb24pIHtcblx0Y29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFjdGlvbilcblx0XHQuZmluYWxseSgoKSA9PiB7XG5cdFx0XHRpZiAocHJvamVjdENvbmZpZy5wcm9maWxlVGltZSkge1xuXHRcdFx0XHRjb25zdCB0aW1lVGFrZW5Jbk1pbGxpcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lXG5cdFx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcdCd0aW1lIHRha2VuOiAnLFxuXHRcdFx0XHRcdHRpbWVUYWtlbkluTWlsbGlzID4gMTAwMFxuXHRcdFx0XHRcdFx0PyBgJHt0aW1lVGFrZW5Jbk1pbGxpcyAvIDEwMDB9c2Bcblx0XHRcdFx0XHRcdDogYCR7dGltZVRha2VuSW5NaWxsaXN9bXNgLFxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fSlcbn1cbiJdfQ==