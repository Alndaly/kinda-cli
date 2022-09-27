import { createHash } from 'crypto';
import _ from 'lodash';
import { shortName, isNameTooLong } from './pathUtils.js';
/** Thin wrapper around `crypto.createHash("md5")`. */
export function md5Hash(str) {
    return createHash('md5').update(str).digest('hex');
}
/** Creates an MD5 hash and truncates it to the given length. */
export function simpleHash(str, length) {
    return md5Hash(str).substring(0, length);
}
// Based on https://github.com/gatsbyjs/gatsby/pull/21518/files
/**
 * Given an input string, convert to kebab-case and append a hash, avoiding name
 * collision. Also removes part of the string if its larger than the allowed
 * filename per OS, avoiding `ERRNAMETOOLONG` error.
 */
export function docuHash(str) {
    if (str === '/') {
        return 'index';
    }
    const shortHash = simpleHash(str, 3);
    const parsedPath = `${_.kebabCase(str)}-${shortHash}`;
    if (isNameTooLong(parsedPath)) {
        return `${shortName(_.kebabCase(str))}-${shortHash}`;
    }
    return parsedPath;
}
