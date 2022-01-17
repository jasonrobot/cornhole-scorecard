import {
    buildTossString
} from './Toss'

import {
    Toss,
    makeToss,
    MISS,
    ON,
    HOLE,
    NO_KNOCK,
} from './model/Results'


describe('App', () => {
    it('should make valid toss strings', () => {
        expect(
            buildTossString(
                makeToss(
                    ON
                )
            )
        ).toEqual('x')
    })

    describe('buildTossString', () => {
        const testCases: Array<[Toss, string]> = [
            [makeToss(ON), 'x'],
            [makeToss(ON, NO_KNOCK, {off: 1, hole: 0}), 'x//x'],
            [makeToss(ON, {off: 0, hole: 1}, {off: 2, hole: 0}), 'x/o/xx'],
        ]

        testCases.forEach(([actual, expected]) => {
            expect(buildTossString(actual)).toEqual(expected)
        })
    })

})
