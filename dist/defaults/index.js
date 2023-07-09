"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_DEFAULTS = void 0;
exports.NODE_DEFAULTS = {
    bundle: {
        packagesInstallationPath: 'dist/bundle',
        bundledDependencies: [],
        esbuildConfig: {
            entryPoints: ['src/bin/www.js'],
            bundle: true,
            outfile: 'app.min.js',
            sourcemap: 'inline',
            minify: true,
            metafile: true,
        },
        cleanBundleIgnoreDelete: ['node_modules'],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVmYXVsdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxhQUFhLEdBQUc7SUFDNUIsTUFBTSxFQUFFO1FBQ1Asd0JBQXdCLEVBQUUsYUFBYTtRQUN2QyxtQkFBbUIsRUFBRSxFQUFFO1FBQ3ZCLGFBQWEsRUFBRTtZQUNkLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLFlBQVk7WUFDckIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRLEVBQUUsSUFBSTtTQUNkO1FBQ0QsdUJBQXVCLEVBQUUsQ0FBQyxjQUFjLENBQUM7S0FDekM7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IE5PREVfREVGQVVMVFMgPSB7XG5cdGJ1bmRsZToge1xuXHRcdHBhY2thZ2VzSW5zdGFsbGF0aW9uUGF0aDogJ2Rpc3QvYnVuZGxlJyxcblx0XHRidW5kbGVkRGVwZW5kZW5jaWVzOiBbXSxcblx0XHRlc2J1aWxkQ29uZmlnOiB7XG5cdFx0XHRlbnRyeVBvaW50czogWydzcmMvYmluL3d3dy5qcyddLFxuXHRcdFx0YnVuZGxlOiB0cnVlLFxuXHRcdFx0b3V0ZmlsZTogJ2FwcC5taW4uanMnLFxuXHRcdFx0c291cmNlbWFwOiAnaW5saW5lJyxcblx0XHRcdG1pbmlmeTogdHJ1ZSxcblx0XHRcdG1ldGFmaWxlOiB0cnVlLFxuXHRcdH0sXG5cdFx0Y2xlYW5CdW5kbGVJZ25vcmVEZWxldGU6IFsnbm9kZV9tb2R1bGVzJ10sXG5cdH0sXG59XG4iXX0=