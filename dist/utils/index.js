"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnSubstituteIfErr = exports.runCommand = void 0;
const child_process_1 = require("child_process");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQW1DO0FBRTVCLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLEVBQUU7SUFDdkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFBLHFCQUFLLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUE7UUFFM0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUVqRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLENBQUE7YUFDVDtpQkFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNwRjtRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFoQlksUUFBQSxVQUFVLGNBZ0J0QjtBQUVELFNBQWdCLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsSUFBSTtJQUNsRSxJQUFJO1FBQ0gsT0FBTyxVQUFVLEVBQUUsQ0FBQTtLQUNuQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1gsT0FBTyxVQUFVLENBQUE7S0FDakI7QUFDRixDQUFDO0FBTkQsc0RBTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQge3NwYXdufSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuXG5leHBvcnQgY29uc3QgcnVuQ29tbWFuZCA9IChjb21tYW5kLCBhcmdzLCBjd2QgPSBudWxsKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcHJvY2VzcyA9IHNwYXduKGNvbW1hbmQsIGFyZ3MsIHtjd2R9KVxuXG5cdFx0cHJvY2Vzcy5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpXG5cblx0XHRwcm9jZXNzLnN0ZGVyci5vbignZGF0YScsIGRhdGEgPT4gY29uc29sZS5lcnJvcihkYXRhLnRvU3RyaW5nKCkpKVxuXG5cdFx0cHJvY2Vzcy5vbignY2xvc2UnLCBjb2RlID0+IHtcblx0XHRcdGlmIChjb2RlID09PSAwKSB7XG5cdFx0XHRcdHJlc29sdmUoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihgQ29tbWFuZCAnJHtjb21tYW5kfSAke2FyZ3Muam9pbignICcpfScgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCkpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHVyblN1YnN0aXR1dGVJZkVycihzeW5jQWN0aW9uLCBzdWJzdGl0dXRlID0gbnVsbCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBzeW5jQWN0aW9uKClcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBzdWJzdGl0dXRlXG5cdH1cbn1cbiJdfQ==