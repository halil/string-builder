import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const StringBuilder = require('./stringbuilder.js');

export { StringBuilder };
export default StringBuilder;
