/* eslint-disable no-console */
import {spawn} from 'child_process'
import minimist from 'minimist'

export const runCommand = (command, args, cwd = null) => {
	return new Promise((resolve, reject) => {
		const process = spawn(command, args, {cwd})

		process.stdout.on('data', data => console.log(data.toString()))

		process.stderr.on('data', data => console.error(data.toString()))

		process.on('close', code => {
			if (code === 0) {
				resolve()
			} else {
				reject(new Error(`Command '${command} ${args.join(' ')}' exited with code ${code}`))
			}
		})
	})
}

export function returnSubstituteIfErr(syncAction, substitute = null) {
	try {
		return syncAction()
	} catch (e) {
		return substitute
	}
}

export const getCliArgs = () => minimist(process.argv.slice(2))
