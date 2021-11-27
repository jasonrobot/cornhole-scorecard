import {
    doToss,
    makeToss,
    makeFrame,
    makeInning,
    makeGame,
    MISS,
    ON,
    HOLE,
    Inning,
    scoreInning
} from './Results'

describe('Results model', () => {
    // it('should add at the end', () => {
    //     const g = makeGame(
    //         makeInning(
    //             makeFrame(
    //                 makeToss(MISS),
    //                 makeToss(ON)
    //             ),
    //             makeFrame(
    //                 makeToss(HOLE),
    //                 makeToss(MISS)
    //             )
    //         )
    //     )

    //     doToss(g, makeToss(MISS, [], [OFF]))
    //     expect(g[0].length).toEqual(3)
    //     expect(g[0][2].length).toEqual(1)
    // })

    it('should not add more than 4 to a frame', () => { })

    it('', () => { })
    describe('scoreInning', () => {
        it('should count basic scores', () => {
            const inning: Inning = [
                [makeToss(ON), makeToss(ON)],
                [makeToss(ON), makeToss(MISS)],
                [makeToss(ON), makeToss(HOLE)],
                [makeToss(ON), makeToss(MISS)],
            ]

            expect(scoreInning(inning)).toEqual([0, 0])
        })

        it('should work on incomplete innings', () => {
            const inning: Inning = [
                [makeToss(ON), makeToss(ON)],
                [makeToss(ON), makeToss(MISS)],
            ]

            expect(scoreInning(inning)).toEqual([1, 0])
        })

        it('should handle a knock off', () => {
            const inning: Inning = [
                [makeToss(ON), makeToss(ON)],
                [makeToss(ON), makeToss(MISS, {off: 0, hole: 0}, {off: 1, hole: 0})],
            ]
            expect(scoreInning(inning)).toEqual([0, 0])
        })

        it('should handle a knock in', () => {
            const inning: Inning = [
                [makeToss(ON), makeToss(ON)],
                [makeToss(ON), makeToss(MISS, {off: 0, hole: 1})],
            ]
            expect(scoreInning(inning)).toEqual([0, 1])
        })
    })
});
