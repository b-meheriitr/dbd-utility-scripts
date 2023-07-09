"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTimeTaken = exports.getCliArgs = exports.returnSubstituteIfErr = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const minimist_1 = __importDefault(require("minimist"));
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
function logTimeTaken(action, { profileTime = true }) {
    const startTime = new Date().getTime();
    return Promise.resolve(action)
        .finally(() => {
        if (profileTime) {
            const timeTakenInMillis = new Date().getTime() - startTime;
            console.log('time taken: ', timeTakenInMillis > 1000
                ? `${timeTakenInMillis / 1000}s`
                : `${timeTakenInMillis}ms`);
        }
    });
}
exports.logTimeTaken = logTimeTaken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsaURBQW1DO0FBQ25DLHdEQUErQjtBQUV4QixNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxFQUFFO0lBQ3ZELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBQSxxQkFBSyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFBO1FBRTNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUUvRCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFakUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sRUFBRSxDQUFBO2FBQ1Q7aUJBQU07Z0JBQ04sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDcEY7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsVUFBVSxjQWdCdEI7QUFFRCxTQUFnQixxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLElBQUk7SUFDbEUsSUFBSTtRQUNILE9BQU8sVUFBVSxFQUFFLENBQUE7S0FDbkI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNYLE9BQU8sVUFBVSxDQUFBO0tBQ2pCO0FBQ0YsQ0FBQztBQU5ELHNEQU1DO0FBRU0sTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBQSxrQkFBUSxFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFBbEQsUUFBQSxVQUFVLGNBQXdDO0FBRS9ELFNBQWdCLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBQyxXQUFXLEdBQUcsSUFBSSxFQUFDO0lBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFdEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM1QixPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxXQUFXLEVBQUU7WUFDaEIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQTtZQUUxRCxPQUFPLENBQUMsR0FBRyxDQUNWLGNBQWMsRUFDZCxpQkFBaUIsR0FBRyxJQUFJO2dCQUN2QixDQUFDLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLEdBQUc7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLENBQzNCLENBQUE7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQWhCRCxvQ0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQge3NwYXdufSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0J1xuXG5leHBvcnQgY29uc3QgcnVuQ29tbWFuZCA9IChjb21tYW5kLCBhcmdzLCBjd2QgPSBudWxsKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcHJvY2VzcyA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIHtjd2R9KVxuXG5cdFx0cHJvY2Vzcy5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpXG5cblx0XHRwcm9jZXNzLnN0ZGVyci5vbignZGF0YScsIGRhdGEgPT4gY29uc29sZS5lcnJvcihkYXRhLnRvU3RyaW5nKCkpKVxuXG5cdFx0cHJvY2Vzcy5vbignY2xvc2UnLCBjb2RlID0+IHtcblx0XHRcdGlmIChjb2RlID09PSAwKSB7XG5cdFx0XHRcdHJlc29sdmUoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihgQ29tbWFuZCAnJHtjb21tYW5kfSAke2FyZ3Muam9pbignICcpfScgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCkpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHVyblN1YnN0aXR1dGVJZkVycihzeW5jQWN0aW9uLCBzdWJzdGl0dXRlID0gbnVsbCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBzeW5jQWN0aW9uKClcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBzdWJzdGl0dXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldENsaUFyZ3MgPSAoKSA9PiBtaW5pbWlzdChwcm9jZXNzLmFyZ3Yuc2xpY2UoMikpXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dUaW1lVGFrZW4oYWN0aW9uLCB7cHJvZmlsZVRpbWUgPSB0cnVlfSkge1xuXHRjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoYWN0aW9uKVxuXHRcdC5maW5hbGx5KCgpID0+IHtcblx0XHRcdGlmIChwcm9maWxlVGltZSkge1xuXHRcdFx0XHRjb25zdCB0aW1lVGFrZW5Jbk1pbGxpcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lXG5cblx0XHRcdFx0Y29uc29sZS5sb2coXG5cdFx0XHRcdFx0J3RpbWUgdGFrZW46ICcsXG5cdFx0XHRcdFx0dGltZVRha2VuSW5NaWxsaXMgPiAxMDAwXG5cdFx0XHRcdFx0XHQ/IGAke3RpbWVUYWtlbkluTWlsbGlzIC8gMTAwMH1zYFxuXHRcdFx0XHRcdFx0OiBgJHt0aW1lVGFrZW5Jbk1pbGxpc31tc2AsXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxufVxuIl19