import {promises as fs} from 'fs'
import path from 'path'


const fun = directoryPath => {
	return fs.readdir(directoryPath)
		.then(files => {
			return Promise.all(
				files.map(file => {
					const filePath = path.join(directoryPath, file)
					if (path.extname(filePath) === '.js') {
						const newFileName = `scripts-${path.parse(file).name}`
						const newFilePath = path.join(directoryPath, newFileName)
						return fs.rename(filePath, newFilePath)
					}

					return Promise.resolve(-1)
				}),
			)
		})
}

export default fun('dist/bin')
