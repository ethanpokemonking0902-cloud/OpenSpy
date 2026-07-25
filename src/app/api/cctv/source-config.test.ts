import { describe, expect, it } from 'vitest';
import { getFallbackGlobalCameraSources } from './source-config';

describe('fallback global camera sources', () => {
  it('returns a broad set of fallback camera markers with coordinates', () => {
    const cameras = getFallbackGlobalCameraSources();

    expect(cameras.length).toBeGreaterThan(15);
    expect(cameras.some((cam) => Boolean(cam.external_url))).toBe(true);
    expect(cameras.some((cam) => Boolean(cam.stream_url))).toBe(true);
    expect(cameras.every((cam) => Number.isFinite(cam.lat) && Number.isFinite(cam.lng))).toBe(true);
  });
});
