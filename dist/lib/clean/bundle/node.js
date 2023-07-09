"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const rimraf_1 = require("rimraf");
const defaults_1 = require("../../../defaults");
const NODE_DEFAULTS_BUNDLE = defaults_1.NODE_DEFAULTS.bundle;
exports.default = ({ packagesInstallationPath = NODE_DEFAULTS_BUNDLE.packagesInstallationPath, cleanBundleIgnoreDelete = NODE_DEFAULTS_BUNDLE.cleanBundleIgnoreDelete, }) => {
    return fs_1.promises.readdir(packagesInstallationPath)
        .then(files => {
        return Promise.all(files.map(file => {
            const filePath = path_1.default.join(packagesInstallationPath, file);
            if (!cleanBundleIgnoreDelete.includes(file)) {
                return rimraf_1.rimraf.rimraf(filePath);
            }
            return Promise.resolve(-1);
        }));
    })
        .catch(err => {
        if (!(/no such file or directory/.test(err.message))) {
            throw err;
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2xlYW4vYnVuZGxlL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBaUM7QUFDakMsZ0RBQXVCO0FBQ3ZCLG1DQUE2QjtBQUM3QixnREFBK0M7QUFFL0MsTUFBTSxvQkFBb0IsR0FBRyx3QkFBYSxDQUFDLE1BQU0sQ0FBQTtBQUVqRCxrQkFBZSxDQUFDLEVBQ1gsd0JBQXdCLEdBQUcsb0JBQW9CLENBQUMsd0JBQXdCLEVBQ3hFLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDLHVCQUF1QixHQUN0RSxFQUFFLEVBQUU7SUFDUixPQUFPLGFBQUUsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7U0FDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFMUQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUMsT0FBTyxlQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzlCO1lBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0IsQ0FBQyxDQUFDLENBQ0YsQ0FBQTtJQUNGLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNaLElBQUksQ0FBQyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNyRCxNQUFNLEdBQUcsQ0FBQTtTQUNUO0lBQ0YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb21pc2VzIGFzIGZzfSBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge3JpbXJhZn0gZnJvbSAncmltcmFmJ1xuaW1wb3J0IHtOT0RFX0RFRkFVTFRTfSBmcm9tICcuLi8uLi8uLi9kZWZhdWx0cydcblxuY29uc3QgTk9ERV9ERUZBVUxUU19CVU5ETEUgPSBOT0RFX0RFRkFVTFRTLmJ1bmRsZVxuXG5leHBvcnQgZGVmYXVsdCAoe1xuXHRcdFx0XHRcdHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCA9IE5PREVfREVGQVVMVFNfQlVORExFLnBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aCxcblx0XHRcdFx0XHRjbGVhbkJ1bmRsZUlnbm9yZURlbGV0ZSA9IE5PREVfREVGQVVMVFNfQlVORExFLmNsZWFuQnVuZGxlSWdub3JlRGVsZXRlLFxuXHRcdFx0XHR9KSA9PiB7XG5cdHJldHVybiBmcy5yZWFkZGlyKHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aClcblx0XHQudGhlbihmaWxlcyA9PiB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdGZpbGVzLm1hcChmaWxlID0+IHtcblx0XHRcdFx0XHRjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihwYWNrYWdlc0luc3RhbGxhdGlvblBhdGgsIGZpbGUpXG5cblx0XHRcdFx0XHRpZiAoIWNsZWFuQnVuZGxlSWdub3JlRGVsZXRlLmluY2x1ZGVzKGZpbGUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmltcmFmLnJpbXJhZihmaWxlUGF0aClcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKC0xKVxuXHRcdFx0XHR9KSxcblx0XHRcdClcblx0XHR9KVxuXHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0aWYgKCEoL25vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkvLnRlc3QoZXJyLm1lc3NhZ2UpKSkge1xuXHRcdFx0XHR0aHJvdyBlcnJcblx0XHRcdH1cblx0XHR9KVxufVxuIl19