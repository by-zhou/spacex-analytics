import fetchMock from 'fetch-mock-jest';

import { mockPayload } from '../../domain/testing/mockModels';
import { getPayload, PayloadDto } from '../payloadRepositoryImpl';

const mockPayloadDto = (payloadDto: Partial<PayloadDto> = {}) => {
  const defaultPayloadDto: PayloadDto = {
    id: 'payload-id-1',
    name: 'test-payload-1',
    type: 'Dragon 1.0',
    reused: false,
    launch: 'launch-id-1',
    nationalities: [],
    dragon: {
      capsule: 'capsule-id-1',
      flight_time_sec: 5600,
      water_landing: false,
      land_landing: true,
    },
    };
  return { ...defaultPayloadDto, ...payloadDto };
};

describe('payloadRepositoryImpl', () => {
  describe('getPayload', () => {
    it('should return requested payload', async () => {
      fetchMock.getOnce(/payloads\/.+/, mockPayloadDto);
      await expect(getPayload('payload-id-1')).resolves.toEqual(mockPayload())
    });
  });
});
