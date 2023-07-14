#!/usr/bin/env node

import {main} from '../lib/deploy'
import {logTimeTaken} from '../lib/utils'

export default logTimeTaken(main)
