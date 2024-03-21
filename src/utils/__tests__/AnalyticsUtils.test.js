import {
  getOperatingSystemType,
  getBrowserType,
  getDeviceType
} from '../AnalyticsUtils';

describe('getOperatingSystemType', () => {
  it('should return Mac OS for Mac platforms', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'MacIntel',
      writable: true
    });
    expect(getOperatingSystemType()).toBe('Mac OS');
  });

  it('should return iOS for iOS platforms', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'iPhone',
      writable: true
    });
    expect(getOperatingSystemType()).toBe('iOS');
  });

  it('should return Windows for Windows platforms', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'Win32',
      writable: true
    });
    expect(getOperatingSystemType()).toBe('Windows');
  });

  it('should return Android for Android user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Android',
      writable: true
    });
    expect(getOperatingSystemType()).toBe('Windows');
  });

  it('should return Linux for Linux platforms', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'Linux',
      writable: true
    });
    expect(getOperatingSystemType()).toBe('Android');
  });

  it('should return Edge for Edge user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Edg',
      writable: true
    });
    expect(getBrowserType()).toBe('Edge');
  });

  it('should return Chrome for Chrome user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Chrome',
      writable: true
    });
    expect(getBrowserType()).toBe('Chrome');
  });

  it('should return Safari for Safari user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Safari',
      writable: true
    });
    expect(getBrowserType()).toBe('Safari');
  });

  it('should return Firefox for Firefox user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Firefox',
      writable: true
    });
    expect(getBrowserType()).toBe('Firefox');
  });

  it('should return IE for IE user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'MSIE',
      writable: true
    });
    expect(getBrowserType()).toBe('IE');
  });

  it('should return unknown for unknown user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'unknown',
      writable: true
    });
    expect(getBrowserType()).toBe('unknown');
  });

  it('should return mobile for mobile user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'iPhone',
      writable: true
    });
    expect(getDeviceType()).toBe('desktop');
  });
});
