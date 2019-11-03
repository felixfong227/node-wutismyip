#!/usr/bin/env node

const coreNetworkController = require('../index');

coreNetworkController()
.then(ip => console.log(ip))
.catch(err => console.error(err));