import {promises as fs} from 'fs'
import path from 'path'
import {rimraf} from 'rimraf'
import {NODE_DEFAULTS} from '../../../defaults'

const NODE_DEFAULTS_BUNDLE = NODE_DEFAULTS.bundle

export default (
	{
		packagesInstallationPath = NODE_DEFAULTS_BUNDLE.packagesInstallationPath,
		cleanBundleIgnoreDelete = NODE_DEFAULTS_BUNDLE.cleanBundleIgnoreDelete,
	},
) => {
	return fs.readdir(packagesInstallationPath)
		.then(files => {
			return Promise.all(
				files.map(file => {
					const filePath = path.join(packagesInstallationPath, file)

					if (!cleanBundleIgnoreDelete.includes(file)) {
						return rimraf.rimraf(filePath)
					}

					return Promise.resolve(-1)
				}),
			)
		})
		.catch(err => {
			if (!(/no such file or directory/.test(err.message))) {
				throw err
			}
		})
}
