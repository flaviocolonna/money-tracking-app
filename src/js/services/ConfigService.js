import axios from 'axios';
import { Endpoints } from '../models/enums';

class ConfigService {
    constructor() {
        this.configs = {};
    }
    async init() {
        const { data } = await axios.get(`/${Endpoints.CONFIG}`);
        this.configs = data;
    }
    getApiBaseEndpoint() {
        return this.configs.API_BASE_ENDPOINT;
    }
}

export default new ConfigService();
