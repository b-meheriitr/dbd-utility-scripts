#!/usr/bin/env node

import {clean, cliArgs, logTimeTaken} from '../lib/utils'

export default logTimeTaken(
	() => {
		if (!cliArgs.dirPath) {
			throw new Error('dirPath can not be empty or null')
		}

		return clean(cliArgs)
	},
)
