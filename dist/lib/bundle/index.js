#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
const node_1 = __importDefault(require("./node"));
const projectConfig = JSON.parse((0, utils_1.returnSubstituteIfErr)(() => fs_1.default.readFileSync('.scripts.config.json'), '{}'));
exports.default = (0, utils_1.logTimeTaken)((0, node_1.default)(projectConfig.bundle, (0, utils_1.getCliArgs)()), projectConfig);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2J1bmRsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSw0Q0FBdUI7QUFDdkIsdUNBQTJFO0FBQzNFLGtEQUEyQjtBQUUzQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUMvQixJQUFBLDZCQUFxQixFQUFDLEdBQUcsRUFBRSxDQUFDLFlBQU0sQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FDOUUsQ0FBQTtBQUdELGtCQUFlLElBQUEsb0JBQVksRUFDMUIsSUFBQSxjQUFNLEVBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFBLGtCQUFVLEdBQUUsQ0FBQyxFQUMxQyxhQUFhLENBQ2IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IGZzU3luYyBmcm9tICdmcydcbmltcG9ydCB7Z2V0Q2xpQXJncywgbG9nVGltZVRha2VuLCByZXR1cm5TdWJzdGl0dXRlSWZFcnJ9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IGJ1bmRsZSBmcm9tICcuL25vZGUnXG5cbmNvbnN0IHByb2plY3RDb25maWcgPSBKU09OLnBhcnNlKFxuXHRyZXR1cm5TdWJzdGl0dXRlSWZFcnIoKCkgPT4gZnNTeW5jLnJlYWRGaWxlU3luYygnLnNjcmlwdHMuY29uZmlnLmpzb24nKSwgJ3t9JyksXG4pXG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nVGltZVRha2VuKFxuXHRidW5kbGUocHJvamVjdENvbmZpZy5idW5kbGUsIGdldENsaUFyZ3MoKSksXG5cdHByb2plY3RDb25maWcsXG4pXG4iXX0=