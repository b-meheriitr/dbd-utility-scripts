"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = require("../../defaults");
const utils_1 = require("../../utils");
const NODE_DEFAULTS_BUNDLE = defaults_1.NODE_DEFAULTS.bundle;
exports.default = (0, utils_1.logTimeTaken)(() => (0, utils_1.clean)({
    dirPath: utils_1.projectConfig.bundle.packagesInstallationPath || NODE_DEFAULTS_BUNDLE.packagesInstallationPath,
    ignore: utils_1.projectConfig.bundle.cleanBundleIgnoreDelete || NODE_DEFAULTS_BUNDLE.cleanBundleIgnoreDelete,
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4tYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGVhbi9jbGVhbi1idW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNEM7QUFDNUMsdUNBQThEO0FBRTlELE1BQU0sb0JBQW9CLEdBQUcsd0JBQWEsQ0FBQyxNQUFNLENBQUE7QUFFakQsa0JBQWUsSUFBQSxvQkFBWSxFQUMxQixHQUFHLEVBQUUsQ0FBQyxJQUFBLGFBQUssRUFBQztJQUNYLE9BQU8sRUFBRSxxQkFBYSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsSUFBSSxvQkFBb0IsQ0FBQyx3QkFBd0I7SUFDdkcsTUFBTSxFQUFFLHFCQUFhLENBQUMsTUFBTSxDQUFDLHVCQUF1QixJQUFJLG9CQUFvQixDQUFDLHVCQUF1QjtDQUNwRyxDQUFDLENBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tk9ERV9ERUZBVUxUU30gZnJvbSAnLi4vLi4vZGVmYXVsdHMnXG5pbXBvcnQge2NsZWFuLCBsb2dUaW1lVGFrZW4sIHByb2plY3RDb25maWd9IGZyb20gJy4uLy4uL3V0aWxzJ1xuXG5jb25zdCBOT0RFX0RFRkFVTFRTX0JVTkRMRSA9IE5PREVfREVGQVVMVFMuYnVuZGxlXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1RpbWVUYWtlbihcblx0KCkgPT4gY2xlYW4oe1xuXHRcdGRpclBhdGg6IHByb2plY3RDb25maWcuYnVuZGxlLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCB8fCBOT0RFX0RFRkFVTFRTX0JVTkRMRS5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsXG5cdFx0aWdub3JlOiBwcm9qZWN0Q29uZmlnLmJ1bmRsZS5jbGVhbkJ1bmRsZUlnbm9yZURlbGV0ZSB8fCBOT0RFX0RFRkFVTFRTX0JVTkRMRS5jbGVhbkJ1bmRsZUlnbm9yZURlbGV0ZSxcblx0fSksXG4pXG4iXX0=