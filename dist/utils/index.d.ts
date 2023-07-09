export function returnSubstituteIfErr(syncAction: any, substitute?: null): any;
export function logTimeTaken(action: any): Promise<any>;
export function runCommand(command: any, args: any, cwd?: null): Promise<any>;
export const cliArgs: any;
export const projectConfig: any;
export function clean({ dirPath, ignore }: {
    dirPath: any;
    ignore?: any[] | undefined;
}): Promise<void | (number | boolean)[]>;
