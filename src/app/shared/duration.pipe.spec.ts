import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show duration in minutes', () => {
    const durationPipe = new DurationPipe();
    expect(durationPipe.transform('84 min')).toBe('1h 24min');
  });

  it('should show duration in minutes if duration is less than an hour', () => {
    const durationPipe = new DurationPipe();
    expect(durationPipe.transform('23 min')).toBe('23min');
  });
});
