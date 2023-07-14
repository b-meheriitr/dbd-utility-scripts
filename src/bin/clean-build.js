#!/usr/bin/env node

import {clean, logTimeTaken, projectConfig} from '../lib/utils'

export default logTimeTaken(
	() => clean({
		dirPath: projectConfig.build.buildPath,
		ignore: projectConfig.build.cleanBuildIgnoreDelete,
	}),
)
