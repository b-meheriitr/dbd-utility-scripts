const fs = require('node:fs/promises')
const config = require('../lint/.eslintrc.ide.js')

const outFileDir = '.out'
const outFile = '.eslint.ide.gen.json'

fs.mkdir(outFileDir, {recursive: true})
	.then(() => fs.writeFile(`${outFileDir}/${outFile}`, JSON.stringify(config)))
	.then(() => console.log(`generated ide eslint config in ${outFile}`))
