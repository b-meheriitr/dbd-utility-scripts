import fs from 'fs'
import path from 'path'

function setExecutablePermissions(dirPath) {
	const files = fs.readdirSync(dirPath)
	files.forEach(file => {
		const filePath = path.join(dirPath, file)
		const stat = fs.statSync(filePath)
		if (stat.isDirectory()) {
			setExecutablePermissions(filePath)
		} else if (stat.isFile() && file === 'index.js') {
			fs.chmodSync(filePath, '755')
		}
	})
}

setExecutablePermissions('dist/lib')
