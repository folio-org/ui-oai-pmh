import { getSetsListUrl,
  getSetsViewUrl,
  getSetsCreateUrl,
  getSetsEditUrl,
  getSetsDuplicateUrl } from './route';

describe('route', () => {
  it('should return ulr of setsList', () => {
    expect(getSetsListUrl()).toBe('/settings/oai-pmh/sets');
  });

  it('should return ulr of setsView', () => {
    expect(getSetsViewUrl(123)).toBe('/settings/oai-pmh/sets/123/view');
  });

  it('should return ulr of setsCreate', () => {
    expect(getSetsCreateUrl()).toBe('/settings/oai-pmh/sets/create');
  });

  it('should return ulr of setsEdit', () => {
    expect(getSetsEditUrl(123)).toBe('/settings/oai-pmh/sets/123/edit');
  });

  it('should return ulr of setsDuplicate', () => {
    expect(getSetsDuplicateUrl(123)).toBe('/settings/oai-pmh/sets/123/duplicate');
  });
});
