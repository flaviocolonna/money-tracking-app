import { OpType, Endpoints } from './models/enums';
import ConfigService from './services/ConfigService';
import axios from 'axios';

/**
 * Check if an operation is valid based on amount, description and type.
 * @name isValidOperation
 * @function
 * @param {Operation} op - Operation to check
 * @return {boolean}
 */
const isValidOperation = (op) =>
    op?.description &&
    parseFloat(op?.amount) > 0 &&
    typeof OpType[op?.type] !== 'undefined';
/**
 * Get the saved wallet.
 * @name getWallet
 * @function
 * @return {WalletInterface}
 */
async function getWallet() {
    const { data: wallet } = await axios.get(
        `${ConfigService.getApiBaseEndpoint()}/${Endpoints.GET_WALLET}`
    );
    return wallet;
}
/**
 * This function calls the endpoint POST_OPERATION to perform a post
 * in order to create a new operation entity
 * @function
 * @name doCreateOperation
 * @param {Operation} operation
 * @return {Promise}
 */
const doCreateOperation = (operation) =>
    axios.post(
        `${ConfigService.getApiBaseEndpoint()}/${Endpoints.POST_OPERATION}`,
        operation
    );
/**
 * This function calls the endpoint related to an operation to perform a delete call
 * in order to remove an operation entity
 * @function
 * @name doRemoveOperation
 * @param {number} operationID
 * @return {Promise}
 */
const doRemoveOperation = (operationID) =>
    axios.delete(
        `${ConfigService.getApiBaseEndpoint()}/${
            Endpoints.POST_OPERATION
        }/${operationID}`
    );

export { getWallet, isValidOperation, doCreateOperation, doRemoveOperation };
