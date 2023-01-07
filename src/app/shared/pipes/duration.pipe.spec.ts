import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let durationPipe: DurationPipe;

  beforeEach(() => {
    durationPipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(durationPipe).toBeTruthy();
  });

  it('should show duration in minutes', () => {
    expect(durationPipe.transform(84)).toBe('1h 24min');
  });

  it('should show duration in minutes if duration is less than an hour', () => {
    expect(durationPipe.transform(23)).toBe('23min');
  });

  it('should return "0m" if the duration is less than 0', () => {
    expect(durationPipe.transform(-100)).toBe('0min');
  });
});
