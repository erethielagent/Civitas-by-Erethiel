import nacl from 'tweetnacl';

export default class Civitas {

    static verifySignature(completion) {
        // Check if required fields are present
        if (!_isInputWithAllFields(completion)) {
            return false;
        }

        // Decode the public key from hex
        const publicKeyBytes = _getPublicKey(completion);
        if (!publicKeyBytes) {
            return false;
        }

        // Decode the hash (message) and signature from hex
        const messageBytes = Buffer.from(completion.hash, 'hex');
        const signatureBytes = Buffer.from(completion.signature, 'hex');

        try {
            // tweetnacl's sign.detached.verify returns a boolean
            // indicating whether the signature is valid.
            return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
        } catch (error) {
            // If any error occurs, treat it as a failed verification
            return false;
        }
    }

    /**
     * Fetches all previous verified inference calls
     *
     * @param {string} apiKey - Erethiel API Key
     * @param {number} limit - how many items to return
     * @param {string} cursor - pagination cursor
     * @param {string} filter - either "mine" or "all" to filter out results
     * @returns dict
     */
    static getHistory(apiKey, limit, cursor, filter) {
        if (limit === undefined || limit === null || limit === 0 || limit < 0) {
            limit = 100;
        }
        let url = 'https://api.erethiel.com/v1/verified/chat/completions?limit=' + limit
        if (cursor) {
            url = url + "&cursor=" + cursor
        }
        if (filter && (filter === "mine" || filter === "all")) {
            url = url + "&filter=" + filter
        }

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
            },
        })
            .then(response => {
                if (!response.ok) {
                    // Handle non-OK responses
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
    }

    /**
     * Fetches verified inference by it's hash
     *
     * @param {string} apiKey - Erethiel API Key
     * @param {string} hash - the hash of the verified inference call
     * @returns dict
     */
    static getByHash(apiKey, hash) {
        let url = 'https://api.erethiel.com/v1/verified/chat/completions/' + hash
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
            },
        })
            .then(response => {
                if (!response.ok) {
                    // Handle non-OK responses
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
    }
}

/**
 * Checks whether the completion object has the required fields.
 *
 * @param {Object} completion
 * @returns {boolean}
 */
function _isInputWithAllFields(completion) {
    try {
        return completion.public_key && completion.hash && completion.signature;
    } catch (error) {
        return false;
    }
}

/**
 * Decodes the public key from hex.
 *
 * @param {Object} completion
 * @returns {Uint8Array|null}
 */
function _getPublicKey(completion) {
    try {
        return Buffer.from(completion.public_key, 'hex');
    } catch (error) {
        return null;
    }
}
