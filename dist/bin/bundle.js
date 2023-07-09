#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../lib/bundle/node"));
const utils_1 = require("../lib/utils");
exports.default = (0, utils_1.logTimeTaken)(() => (0, node_1.default)(utils_1.projectConfig.bundle, utils_1.cliArgs));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jpbi9idW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsOERBQXVDO0FBQ3ZDLHdDQUFpRTtBQUVqRSxrQkFBZSxJQUFBLG9CQUFZLEVBQzFCLEdBQUcsRUFBRSxDQUFDLElBQUEsY0FBTSxFQUFDLHFCQUFhLENBQUMsTUFBTSxFQUFFLGVBQU8sQ0FBQyxDQUMzQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgYnVuZGxlIGZyb20gJy4uL2xpYi9idW5kbGUvbm9kZSdcbmltcG9ydCB7Y2xpQXJncywgbG9nVGltZVRha2VuLCBwcm9qZWN0Q29uZmlnfSBmcm9tICcuLi9saWIvdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1RpbWVUYWtlbihcblx0KCkgPT4gYnVuZGxlKHByb2plY3RDb25maWcuYnVuZGxlLCBjbGlBcmdzKSxcbilcbiJdfQ==