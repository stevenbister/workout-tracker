import { getTemporalUnit } from './get-temporal-unit';

describe('getTemporalUnit', () => {
    it('returns correct temporal unit for seconds less than 60', () => {
        const result = getTemporalUnit(30);
        expect(result).toEqual({ hours: 0, minutes: 0, seconds: 30 });
    });

    it('returns correct temporal unit for seconds equal to 60', () => {
        const result = getTemporalUnit(60);
        expect(result).toEqual({ hours: 0, minutes: 1, seconds: 0 });
    });

    it('returns correct temporal unit for seconds greater than 60 but less than 3600', () => {
        const result = getTemporalUnit(120);
        expect(result).toEqual({ hours: 0, minutes: 2, seconds: 0 });
    });

    it('returns correct temporal unit for seconds equal to 3600', () => {
        const result = getTemporalUnit(3600);
        expect(result).toEqual({ hours: 1, minutes: 0, seconds: 0 });
    });

    it('returns correct temporal unit for seconds greater than 3600', () => {
        const result = getTemporalUnit(7200);
        expect(result).toEqual({ hours: 2, minutes: 0, seconds: 0 });
    });
});
