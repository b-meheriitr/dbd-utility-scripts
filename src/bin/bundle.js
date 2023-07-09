#!/usr/bin/env node

import bundle from '../lib/bundle/node'
import {cliArgs, logTimeTaken, projectConfig} from '../lib/utils'

export default logTimeTaken(
	() => bundle(projectConfig.bundle, cliArgs),
)
