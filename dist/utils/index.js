"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullIfError = exports.runCommand = void 0;
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
function nullIfError(syncAction) {
    try {
        return syncAction();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
exports.nullIfError = nullIfError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQW1DO0FBRTVCLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLEVBQUU7SUFDdkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFBLHFCQUFLLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUE7UUFFM0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUVqRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLENBQUE7YUFDVDtpQkFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNwRjtRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFoQlksUUFBQSxVQUFVLGNBZ0J0QjtBQUVELFNBQWdCLFdBQVcsQ0FBQyxVQUFVO0lBQ3JDLElBQUk7UUFDSCxPQUFPLFVBQVUsRUFBRSxDQUFBO0tBQ25CO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsT0FBTyxJQUFJLENBQUE7S0FDWDtBQUNGLENBQUM7QUFQRCxrQ0FPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCB7c3Bhd259IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5cbmV4cG9ydCBjb25zdCBydW5Db21tYW5kID0gKGNvbW1hbmQsIGFyZ3MsIGN3ZCA9IG51bGwpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCBwcm9jZXNzID0gc3Bhd24oY29tbWFuZCwgYXJncywge2N3ZH0pXG5cblx0XHRwcm9jZXNzLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSlcblxuXHRcdHByb2Nlc3Muc3RkZXJyLm9uKCdkYXRhJywgZGF0YSA9PiBjb25zb2xlLmVycm9yKGRhdGEudG9TdHJpbmcoKSkpXG5cblx0XHRwcm9jZXNzLm9uKCdjbG9zZScsIGNvZGUgPT4ge1xuXHRcdFx0aWYgKGNvZGUgPT09IDApIHtcblx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZWplY3QobmV3IEVycm9yKGBDb21tYW5kICcke2NvbW1hbmR9ICR7YXJncy5qb2luKCcgJyl9JyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSlcblx0XHRcdH1cblx0XHR9KVxuXHR9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVsbElmRXJyb3Ioc3luY0FjdGlvbikge1xuXHR0cnkge1xuXHRcdHJldHVybiBzeW5jQWN0aW9uKClcblx0fSBjYXRjaCAoZSkge1xuXHRcdGNvbnNvbGUubG9nKGUpXG5cdFx0cmV0dXJuIG51bGxcblx0fVxufVxuIl19