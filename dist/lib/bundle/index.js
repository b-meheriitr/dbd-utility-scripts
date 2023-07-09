#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const node_1 = __importDefault(require("./node"));
exports.default = (0, utils_1.logTimeTaken)(() => (0, node_1.default)(utils_1.projectConfig.bundle, utils_1.cliArgs));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2J1bmRsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSx1Q0FBZ0U7QUFDaEUsa0RBQTJCO0FBRTNCLGtCQUFlLElBQUEsb0JBQVksRUFDMUIsR0FBRyxFQUFFLENBQUMsSUFBQSxjQUFNLEVBQUMscUJBQWEsQ0FBQyxNQUFNLEVBQUUsZUFBTyxDQUFDLENBQzNDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7Y2xpQXJncywgbG9nVGltZVRha2VuLCBwcm9qZWN0Q29uZmlnfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCBidW5kbGUgZnJvbSAnLi9ub2RlJ1xuXG5leHBvcnQgZGVmYXVsdCBsb2dUaW1lVGFrZW4oXG5cdCgpID0+IGJ1bmRsZShwcm9qZWN0Q29uZmlnLmJ1bmRsZSwgY2xpQXJncyksXG4pXG4iXX0=