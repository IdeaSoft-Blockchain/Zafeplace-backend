// const transactionSchema = new mongoose.Schema({
//
//     sender: {
//         type: String
//     },
//
//     tx_hash: {
//         type: String
//     },
//
//     amount: {
//         type: Number
//     },
//
//     smartContract: {
//         ethereum: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'EthereumSmartContract'
//         }
//     },
//
//     developer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Developer'
//     },
//     storage: {type: String, default: 'google'},
// }, {
//     timestamps: true,
//     ensureIndex: true
// });
//
// module.exports = mongoose.model('Transaction', transactionSchema);