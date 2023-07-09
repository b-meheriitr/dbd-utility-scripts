import {clean, cliArgs, logTimeTaken} from '../../utils'

export default logTimeTaken(
	() => {
		if (!cliArgs.dirPath) {
			throw new Error('dirPath can not be empty or null')
		}

		return clean(cliArgs)
	},
)
