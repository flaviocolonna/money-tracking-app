const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { WalletErrors, OpType } = require('./enums');
const { isValidOperation } = require('./helpers');
const WalletDBEntity = 'wallet';
const initialWalletState = { operations: [], balance: 0 };

const initWallet = async () => {
    if (!(await db.get(WalletDBEntity))) {
        await db.set(WalletDBEntity, initialWalletState);
    }
};
const addOperationHandler = async function (req, res) {
    const { body: operationData } = req;
    if (!isValidOperation(operationData)) {
        res.code(400);
        res.json({ error: WalletErrors.INVALID_OPERATION });
        return;
    }
    const currentMS = new Date().getTime();
    const operationToAdd = {
        ...operationData,
        date: currentMS,
        id: currentMS,
    };
    let balance = await db.get(`${WalletDBEntity}.balance`);
    if (operationToAdd.type === OpType.IN) {
        balance += operationToAdd.amount;
    } else if (operationToAdd.type === OpType.OUT) {
        balance -= operationToAdd.amount;
    }
    await db.push(`${WalletDBEntity}.operations`, operationToAdd);
    await db.set(`${WalletDBEntity}.balance`, balance);
    res.code(201);
    res.send(operationToAdd);
};
const removeOperationHandler = async function (req, res) {
    const { id } = req.params;
    if (!id) {
        res.code(404);
        res.send();
        return;
    }
    const operations = await db.get(`${WalletDBEntity}.operations`);
    const foundIndex = operations.findIndex(
        ({ id: operationId }) => operationId === parseInt(id)
    );
    if (foundIndex === -1) {
        res.code(404);
        res.send();
        return;
    }
    const operationToAdd = operations[foundIndex];
    let balance = await db.get(`${WalletDBEntity}.balance`);
    if (operationToAdd.type === OpType.IN) {
        balance -= operationToAdd.amount;
    } else if (operationToAdd.type === OpType.OUT) {
        balance += operationToAdd.amount;
    }
    operations.splice(foundIndex, 1);
    await db.set(`${WalletDBEntity}.operations`, operations);
    await db.set(`${WalletDBEntity}.balance`, balance);
    res.send();
};

const getWalletHandler = async function (req, res) {
    const savedWallet =
        (await db.get(WalletDBEntity)) ||
        (await db.set(WalletDBEntity, initialWalletState));
    res.send(savedWallet);
};

initWallet();
module.exports = function (fastify, opts, done) {
    fastify.delete('/wallet/operation/:id', removeOperationHandler);
    fastify.post('/wallet/operation', addOperationHandler);
    fastify.get('/wallet', getWalletHandler);
    done();
};
