import fetchMock from 'fetch-mock-jest';

import { mockCrewMember } from '../../domain/testing/mockModels';
import { CrewMemberDto, getCrewMember } from '../crewMemberRepositoryImpl';

const mockCrewMemberDto = (crewMemberDto: Partial<CrewMemberDto> = {}) => {
  const defaultCrewMemberDto: CrewMemberDto = {
    id: 'crew-member-id-1',
    agency: 'ESA',
  };
  return { ...defaultCrewMemberDto, ...crewMemberDto };
};

describe('crewMemberRepositoryImpl', () => {
  describe('getCrewMember', () => {
    it('should return requested crew member', async () => {
      fetchMock.getOnce(/crew\/.+/, mockCrewMemberDto);
      await expect(getCrewMember('crew-member-id-1')).resolves.toEqual(mockCrewMember())
    });
  });
});