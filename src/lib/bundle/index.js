#!/usr/bin/env node

import {cliArgs, logTimeTaken, projectConfig} from '../../utils'
import bundle from './node'

export default logTimeTaken(
	() => bundle(projectConfig.bundle, cliArgs),
)
