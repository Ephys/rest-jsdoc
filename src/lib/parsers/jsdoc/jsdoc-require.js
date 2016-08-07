import path from 'path';
import requizzle from 'requizzle';

const jsdocRequire = requizzle({
  requirePaths: {
    // TODO find this automatically
    before: [path.normalize(__dirname + '/../../../../node_modules/jsdoc-75lb/lib')]
  },
  infect: true
});

export default jsdocRequire;
