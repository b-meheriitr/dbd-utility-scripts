#!/usr/bin/env node

import {getCliArgs, logTimeTaken, projectConfig} from '../../utils'
import bundle from './node'

export default logTimeTaken(
	bundle(projectConfig.bundle, getCliArgs()),
)
