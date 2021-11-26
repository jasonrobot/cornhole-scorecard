import {
    buildTossString
} from './Toss'

import {
    Toss,
    makeToss,
    MISS,
    ON,
    OFF,
    HOLE,
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
            [makeToss(ON, [], [OFF]), 'x//x'],
            [makeToss(ON, [HOLE], [OFF, OFF]), 'x/o/xx'],
        ]

        testCases.forEach(([actual, expected]) => {
            expect(buildTossString(actual)).toEqual(expected)
        })
    })

})
