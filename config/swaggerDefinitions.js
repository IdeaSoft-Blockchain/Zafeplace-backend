/**
 * @swagger
 * securityDefinitions:
 *   JWTSite:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     example: Bearer slkdjfoijsadoifji349349fnfosdfjpf34f
 *   JWTApp:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     example: Bearer slkdjfoijsadoifji349349fnfosdfjpf34f
 * definitions:
 *   firstName:
 *      type: string
 *      example: 'Barry'
 *   lastName:
 *      type: string
 *      example: 'Allen'
 *   email:
 *      type: email
 *      example: 'example@example.com'
 *   password:
 *      type: string
 *      example: 'Password123'
 *      description: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*0-9]).{8,30}$/'
 *   passwordRepeat:
 *      type: string
 *      example: 'Password123'
 *      description: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*0-9]).{8,30}$/'
 *   company:
 *      type: string
 *      example: 'Zafeplace'
 *   country:
 *      type: string
 *      example: 'Kongeriket Norge'
 *   accessToken:
 *      type: string
 *      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY5OGQ2ZjQ4YzQwMzFlZDAzNTNhZTgiLCJpYXQiOjE1MjYzMDQxNjgsImV4cCI6MTUyNzkxNjg3MjcxMH0.H7qoqPSBe79-ebbq4pHrxwUI-_Pojh4oSCbrcFMcvH0'
 *   accessTime:
 *      type: number
 *      example: 1526390568542
 *   refreshToken:
 *      type: string
 *      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY5OGQ2ZjQ4YzQwMzFlZDAzNTNhZTgiLCJpYXQiOjE1MjYzMDQxNjgsImV4cCI6MTUyODAwMzI3MjcxMX0.ola_YToz7H2TvpOZ4uRkKQrTrYSf11Bq_h5iyvOPipE'
 *   token:
 *      type: string
 *      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY5OGQ2ZjQ4YzQwMzFlZDAzNTNhZTgiLCJpYXQiOjE1MjYzMDQxNjgsImV4cCI6MTUyODAwMzI3MjcxMX0.ola_YToz7H2TvpOZ4uRkKQrTrYSf11Bq_h5iyvOPipE'
 *
 *   postSignupRequestBody:
 *      type: object
 *      required: ['firstName', 'lastName', 'email', 'password', 'passwordRepeat']
 *      properties:
 *        firstName:
 *         $ref: '#/definitions/firstName'
 *        lastName:
 *         $ref: '#/definitions/lastName'
 *        email:
 *         $ref: '#/definitions/email'
 *        password:
 *         $ref: '#/definitions/password'
 *        passwordRepeat:
 *         $ref: '#/definitions/passwordRepeat'
 *        company:
 *         $ref: '#/definitions/company'
 *        country:
 *         $ref: '#/definitions/country'
 *
 *   postSignupResponseBody:
 *      type: object
 *      properties:
 *        message:
 *         type: String
 *         example: 'Confirm registration'
 *
 *   getConfirmEmailResponseBody:
 *      type: object
 *      properties:
 *        message:
 *         type: String
 *         example: 'Registration confirmed'
 *
 *   postLoginRequestBody:
 *      type: object
 *      required: ['email', 'password']
 *      properties:
 *        email:
 *         $ref: '#/definitions/email'
 *        password:
 *         $ref: '#/definitions/password'
 *
 *   postLoginResponseBody:
 *      type: object
 *      properties:
 *        accessToken:
 *         $ref: '#/definitions/accessToken'
 *        accessTime:
 *         $ref: '#/definitions/accessTime'
 *        refreshToken:
 *         $ref: '#/definitions/refreshToken'
 *
 *   getRefreshTokenRequestBody:
 *      type: object
 *      properties:
 *        refreshToken:
 *         $ref: '#/definitions/refreshToken'
 *
 *   postForgotPasswordRequestBody:
 *      type: object
 *      required: ['email']
 *      properties:
 *        email:
 *         $ref: '#/definitions/email'
 *
 *   postForgotPasswordResponseBody:
 *      type: object
 *      properties:
 *        message:
 *         type: String
 *         example: 'Password reset message sent successfully!'
 *
 *   getConfirmRecoverSessionTokenResponseBody:
 *      type: object
 *      properties:
 *        message:
 *         type: String
 *         example: 'Recovery password confirmed!'
 *
 *   postResetPasswordRequestBody:
 *      type: object
 *      required: ['password', 'token']
 *      properties:
 *        password:
 *         $ref: '#/definitions/password'
 *        token:
 *         $ref: '#/definitions/token'
 *
 *   postResetPasswordResponseBody:
 *      type: object
 *      properties:
 *        message:
 *         type: String
 *         example: 'The password change is successful!'
 *
 *   postLogoutResponseBody:
 *      type: object
 *      properties:
 *        result:
 *         type: Boolean
 *         example: true
 *
 *   postApplicationResponseBody:
 *      type: object
 *      properties:
 *        appId:
 *         type: String
 *         example: 'com.zafeplace.sample'
 *        appSecret:
 *         type: String
 *         example: '19bc3427f1b7c8d8e201be9e6f0083b0'
 *
 *   getLoginApplicationResponseBody:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY5OGQ2ZjQ4YzQwMzFlZDAzNTNhZTgiLCJpYXQiOjE1MjYzMDQxNjgsImV4cCI6MTUyNzkxNjg3MjcxMH0.H7qoqPSBe79-ebbq4pHrxwUI-_Pojh4oSCbrcFMcvH0'
 *
 *   getAccountBalanceApplicationResponseBody:
 *       type: object
 *       properties:
 *         network:
 *           type: string
 *           example: 'ethereum'
 *         constant:
 *           type: boolean
 *           example: true
 *         result:
 *           type: number
 *           example: 5
 *
 *   getNativeCoinRawTransactionResponseBody:
 *       type: object
 *       properties:
 *         network:
 *           type: string
 *           example: 'ethereum'
 *         constant:
 *           type: boolean
 *           example: false
 *         result:
 *           type: object
 *           example: {"rawTx": {"from": "0x41B964C9E439d5d5e06c30BA24DC3F9A53844C9A","nonce": 55, "gasPrice": 20000,"gasLimit": 3000000,"to": "0xD0d8D1045413A31b164Ac965FcA42f4BE1AE5360","data": "0xa9059cbb000000000000000000000000b7a66bef08da07a78c8a8284b873f976967d40520000000000000000000000000000000000000000000000000000000000007530","value": 0,"chainId": 3}}
 *   getMethodsOfContractResponseBody:
 *       type: object
 *       properties:
 *         network:
 *           type: string
 *           example: 'ethereum'
 *         constant:
 *           type: boolean
 *           example: true
 *         result:
 *           type: array
 *           example: [{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receivers","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"sendInitialTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"token","type":"uint256"}],"name":"sendTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"_initialDistribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
 *
 *
 *   executeMethodOfContractRequestBody:
 *      type: object
 *      required: ['sender', 'methodName', 'methodParams']
 *      properties:
 *        sender:
 *          type: string
 *          example: '0x41B964C9E439d5d5e06c30BA24DC3F9A53844C9A'
 *        methodName:
 *          type: string
 *          example: 'transfer'
 *        methodParams:
 *          type: string
 *          example: '[{"name":"to","value":"0xb7A66BEf08DA07a78c8a8284B873f976967D4052"},{"name":"tokens","value": 30000}]'
 *        gasLimit:
 *          type: number
 *          example: 3000000
 *        gasPrice:
 *          type: number
 *          example: 20000
 *
 *   executeMethodOfContractResponseBody:
 *      type: object
 *      properties:
 *        network:
 *          type: string
 *          example: 'ethereum'
 *        constant:
 *          type: boolean
 *          example: false
 *        result:
 *          type: object
 *          example: {"constant": false,"result": {rawTx:{"from": "0x41B964C9E439d5d5e06c30BA24DC3F9A53844C9A","nonce": 55, "gasPrice": 20000,"gasLimit": 3000000,"to": "0xD0d8D1045413A31b164Ac965FcA42f4BE1AE5360","data": "0xa9059cbb000000000000000000000000b7a66bef08da07a78c8a8284b873f976967d40520000000000000000000000000000000000000000000000000000000000007530","value": 0,"chainId": 3}}}
 *
 * */

