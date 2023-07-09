#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.default = (0, utils_1.logTimeTaken)(() => {
    if (!utils_1.cliArgs.dirPath) {
        throw new Error('dirPath can not be empty or null');
    }
    return (0, utils_1.clean)(utils_1.cliArgs);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NsZWFuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHVDQUF3RDtBQUV4RCxrQkFBZSxJQUFBLG9CQUFZLEVBQzFCLEdBQUcsRUFBRTtJQUNKLElBQUksQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtLQUNuRDtJQUVELE9BQU8sSUFBQSxhQUFLLEVBQUMsZUFBTyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7Y2xlYW4sIGNsaUFyZ3MsIGxvZ1RpbWVUYWtlbn0gZnJvbSAnLi4vLi4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1RpbWVUYWtlbihcblx0KCkgPT4ge1xuXHRcdGlmICghY2xpQXJncy5kaXJQYXRoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RpclBhdGggY2FuIG5vdCBiZSBlbXB0eSBvciBudWxsJylcblx0XHR9XG5cblx0XHRyZXR1cm4gY2xlYW4oY2xpQXJncylcblx0fSxcbilcbiJdfQ==