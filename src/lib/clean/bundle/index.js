#!/usr/bin/env node

import {logTimeTaken, projectConfig} from '../../../utils'
import cleanBundleNode from './node'

export default logTimeTaken(
	cleanBundleNode(projectConfig.bundle),
)
