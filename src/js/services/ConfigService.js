import axios from 'axios';
import { Endpoints } from '../models/enums';

class ConfigService {
    constructor() {
        this.configs = {};
    }
    init() {
        return axios.get(`/${Endpoints.CONFIG}`).then(({ data }) => {
            this.configs = data;
        });
    }
    getApiBaseEndpoint() {
        return this.configs.API_BASE_ENDPOINT;
    }
}

export default new ConfigService();
