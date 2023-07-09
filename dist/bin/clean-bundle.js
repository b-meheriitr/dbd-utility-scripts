#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = require("../defaults");
const utils_1 = require("../lib/utils");
const NODE_DEFAULTS_BUNDLE = defaults_1.NODE_DEFAULTS.bundle;
exports.default = (0, utils_1.logTimeTaken)(() => (0, utils_1.clean)({
    dirPath: utils_1.projectConfig.bundle.packagesInstallationPath || NODE_DEFAULTS_BUNDLE.packagesInstallationPath,
    ignore: utils_1.projectConfig.bundle.cleanBundleIgnoreDelete || NODE_DEFAULTS_BUNDLE.cleanBundleIgnoreDelete,
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4tYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jpbi9jbGVhbi1idW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsMENBQXlDO0FBQ3pDLHdDQUErRDtBQUUvRCxNQUFNLG9CQUFvQixHQUFHLHdCQUFhLENBQUMsTUFBTSxDQUFBO0FBRWpELGtCQUFlLElBQUEsb0JBQVksRUFDMUIsR0FBRyxFQUFFLENBQUMsSUFBQSxhQUFLLEVBQUM7SUFDWCxPQUFPLEVBQUUscUJBQWEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLElBQUksb0JBQW9CLENBQUMsd0JBQXdCO0lBQ3ZHLE1BQU0sRUFBRSxxQkFBYSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsSUFBSSxvQkFBb0IsQ0FBQyx1QkFBdUI7Q0FDcEcsQ0FBQyxDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7Tk9ERV9ERUZBVUxUU30gZnJvbSAnLi4vZGVmYXVsdHMnXG5pbXBvcnQge2NsZWFuLCBsb2dUaW1lVGFrZW4sIHByb2plY3RDb25maWd9IGZyb20gJy4uL2xpYi91dGlscydcblxuY29uc3QgTk9ERV9ERUZBVUxUU19CVU5ETEUgPSBOT0RFX0RFRkFVTFRTLmJ1bmRsZVxuXG5leHBvcnQgZGVmYXVsdCBsb2dUaW1lVGFrZW4oXG5cdCgpID0+IGNsZWFuKHtcblx0XHRkaXJQYXRoOiBwcm9qZWN0Q29uZmlnLmJ1bmRsZS5wYWNrYWdlc0luc3RhbGxhdGlvblBhdGggfHwgTk9ERV9ERUZBVUxUU19CVU5ETEUucGFja2FnZXNJbnN0YWxsYXRpb25QYXRoLFxuXHRcdGlnbm9yZTogcHJvamVjdENvbmZpZy5idW5kbGUuY2xlYW5CdW5kbGVJZ25vcmVEZWxldGUgfHwgTk9ERV9ERUZBVUxUU19CVU5ETEUuY2xlYW5CdW5kbGVJZ25vcmVEZWxldGUsXG5cdH0pLFxuKVxuIl19