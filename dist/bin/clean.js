#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
exports.default = (0, utils_1.logTimeTaken)(() => {
    if (!utils_1.cliArgs.dirPath) {
        throw new Error('dirPath can not be empty or null');
    }
    return (0, utils_1.clean)(utils_1.cliArgs);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2NsZWFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHdDQUF5RDtBQUV6RCxrQkFBZSxJQUFBLG9CQUFZLEVBQzFCLEdBQUcsRUFBRTtJQUNKLElBQUksQ0FBQyxlQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtLQUNuRDtJQUVELE9BQU8sSUFBQSxhQUFLLEVBQUMsZUFBTyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7Y2xlYW4sIGNsaUFyZ3MsIGxvZ1RpbWVUYWtlbn0gZnJvbSAnLi4vbGliL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBsb2dUaW1lVGFrZW4oXG5cdCgpID0+IHtcblx0XHRpZiAoIWNsaUFyZ3MuZGlyUGF0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdkaXJQYXRoIGNhbiBub3QgYmUgZW1wdHkgb3IgbnVsbCcpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsZWFuKGNsaUFyZ3MpXG5cdH0sXG4pXG4iXX0=