const https = require('https');

let urls = [
    'https://ifconfig.me',
    'https://ifconfig.co'
];

/**
 * 
 * @param {string} url 
 * @returns {Promise<IP>}
 */
function NetworkRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            if(res.statusCode !== 200) return reject(`Status code is not 200, got: ${res.statusCode}`);
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
    });
}

/**
 * @typedef {string} IP IP Address
 */

/**
 * @typedef {string} URL
 */

/**
 * @typedef {Object} options
 * @property {URL[]} options.urls
 */

/**
 * Core function for locating the user's machine IP address
 * @param {options} options
 * @returns {Promise<IP>}
 */
module.exports = options => {

    if(options && options.urls && Array.isArray(options.url) && options.url.length >= 1) urls = urls.concat(options.urls);

    return new Promise(async (resolve, reject) => {
        for(const url of urls) {
            try {
                const res = await NetworkRequest(url);
                // Found the user IP address
                return resolve(res);
            } catch(err) {
                return reject(err);
            }
        }
        return reject(`Fail to ping IP address from ${urls.length} servers`);
    });
};