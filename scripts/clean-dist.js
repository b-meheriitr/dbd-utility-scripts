import {promises as fs} from 'fs'
import path from 'path'
import {rimraf} from 'rimraf'

const distDir = 'dist'

export default fs.readdir(distDir)
	.then(files => {
		return Promise.all(
			files.map(async file => {
				const filePath = path.join(distDir, file)

				if (file !== 'node_modules') {
					return rimraf.rimraf(filePath)
				}
			}),
		)
	})
	.catch(err => {
		if (!(/no such file or directory/.test(err.message))) {
			throw err
		}
	})
