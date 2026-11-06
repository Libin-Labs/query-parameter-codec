import * as api from '@lp-labs/query-parameter-codec';
import { parseQuery } from '@lp-labs/query-parameter-codec';
console.log(parseQuery('?tag=a&tag=b&name=Lee'));
// @ts-expect-error invalid argument must be rejected by declarations
api.parseQuery(2);
