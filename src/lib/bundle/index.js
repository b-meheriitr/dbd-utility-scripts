#!/usr/bin/env node

import fsSync from 'fs'
import {getCliArgs, logTimeTaken, returnSubstituteIfErr} from '../../utils'
import bundle from './node'

const projectConfig = JSON.parse(
	returnSubstituteIfErr(() => fsSync.readFileSync('.scripts.config.json'), '{}'),
)

export default logTimeTaken(
	bundle(projectConfig.bundle, getCliArgs()),
	projectConfig,
)
