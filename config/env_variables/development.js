module.exports = {
    isLogging: true,
    port: '3000',
    db: {
        link: 'mongodb://localhost:27017/zafeplace',
    },
    CONST: {
        PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*0-9]).{8,30}$/,
    },
    secretKey: 'sv89DFvdpc112Sc/s*',
    mailer: {
        email: 'ideasofttest1@gmail.com',
        password: 'ideasofttest2017',
        domain: 'http://35.233.100.41:3000',
        // domain: 'http://zafeplace.no/'
    },
    smtp: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ideasofttest1@gmail.com',
            pass: 'ideasofttest2017',
        },
    },
    fileUpload: {
        imageSize: 15,
    },
    gcs: {
        bucketName: 'zafeplace-dev-bucket',
        appLogoFolder: 'dev-app-logo',
        contentLengthRange: {
            min: 0,
            max: 500000,
        },
    },
    ethereum: {
        ETHER_NETWORK: 'ropsten',
        ETHERSCAN_BASE_URL: 'https://api-ropsten.etherscan.io',
        networks: {
            mainnet: 'https://mainnet.infura.io/',
            ropsten: 'https://ropsten.infura.io/',
        },
    },
    stellar: {
        STELLAR_NETWORK: 'testnet',
        networks: {
            testnet: 'https://horizon-testnet.stellar.org',
            mainnet: 'https://horizon.stellar.org'
        },
    }
};
