console.log('Example for NodeJS:');

const Civitas = require('../civitas.min.js');

function verifySignatures() {
    const EXAMPLE_VALID = {
        hash: '5cff951d70ad5d4da7c12187331d98eabbf4023f7aeb547e949224ddd1420fc7',
        public_key: '835cc0e84c2a5190561d7c2eaf10eb2597cbe7a71541084c5edea32b60bc5e68',
        signature: '819218f6ad5a8ec86091afc1dfbecc5d21384d62f1df0c649ab0c351e515e825fda72d124091418b3cc4a3be35b20dd471b8f8447a448712315b19ecaef34206',
    }

    const EXAMPLE_INVALID_HASH = {
        hash: '5cff951d70ad5d4da7c12187331d98eabbf4023f7aeb547e949224ddd1420fc8',
        public_key: '835cc0e84c2a5190561d7c2eaf10eb2597cbe7a71541084c5edea32b60bc5e68',
        signature: '819218f6ad5a8ec86091afc1dfbecc5d21384d62f1df0c649ab0c351e515e825fda72d124091418b3cc4a3be35b20dd471b8f8447a448712315b19ecaef34206',
    }
    console.log("Civitas.verifySignature(EXAMPLE_VALID):")
    console.log(Civitas.verifySignature(EXAMPLE_VALID));

    console.log("Civitas.verifySignature(EXAMPLE_INVALID_HASH):")
    console.log(Civitas.verifySignature(EXAMPLE_INVALID_HASH));
}


function apiCalls() {
    console.log("\n\n==== Get History ====")
    Civitas.getHistory(process.env.ERETHIEL_API_KEY)
        .then(data => {
            console.log("Data:", data)
        })
        .catch(error => {
            console.error("Error:", error)
        })
}

verifySignatures()
apiCalls()
