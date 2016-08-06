import path from 'path';

const jsdocRequire = require('requizzle')({
  requirePaths: {
    // TODO find this automatically
    before: [path.normalize(__dirname + '/../../../../node_modules/jsdoc-75lb/lib')]
  },
  infect: true
});

export default jsdocRequire;
