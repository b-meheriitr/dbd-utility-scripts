/* eslint-disable no-console */
import {spawn} from 'child_process'

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

export function nullIfError(syncAction) {
	try {
		return syncAction()
	} catch (e) {
		console.log(e)
		return null
	}
}
