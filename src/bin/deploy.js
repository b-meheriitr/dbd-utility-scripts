#!/usr/bin/env node

import {main} from '../lib/deploy/node'
import {logTimeTaken} from '../lib/utils'

export default logTimeTaken(main)
