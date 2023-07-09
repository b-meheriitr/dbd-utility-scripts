#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const node_1 = __importDefault(require("./node"));
exports.default = (0, utils_1.logTimeTaken)((0, node_1.default)(utils_1.projectConfig.bundle, (0, utils_1.getCliArgs)()));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2J1bmRsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSx1Q0FBbUU7QUFDbkUsa0RBQTJCO0FBRTNCLGtCQUFlLElBQUEsb0JBQVksRUFDMUIsSUFBQSxjQUFNLEVBQUMscUJBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBQSxrQkFBVSxHQUFFLENBQUMsQ0FDMUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHtnZXRDbGlBcmdzLCBsb2dUaW1lVGFrZW4sIHByb2plY3RDb25maWd9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IGJ1bmRsZSBmcm9tICcuL25vZGUnXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1RpbWVUYWtlbihcblx0YnVuZGxlKHByb2plY3RDb25maWcuYnVuZGxlLCBnZXRDbGlBcmdzKCkpLFxuKVxuIl19