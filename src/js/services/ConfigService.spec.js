import ConfigService from './ConfigService';
import axios from 'axios';

jest.mock('axios');

describe('ConfigService testing suite', function () {
    it("Initially doesn't have configs stored", function () {
        expect(ConfigService.configs).toEqual({});
        expect(ConfigService.getApiBaseEndpoint()).toBeUndefined();
    });
    it('Calling init, will get the proper configurations', async function () {
        const fakeConfigs = {
            API_BASE_ENDPOINT: 'http://localhost:9000/api',
        };
        axios.get.mockResolvedValueOnce({
            data: fakeConfigs,
        });
        await ConfigService.init();
        expect(ConfigService.configs).toEqual(fakeConfigs);
        expect(ConfigService.getApiBaseEndpoint()).toEqual(
            fakeConfigs.API_BASE_ENDPOINT
        );
    });
});
