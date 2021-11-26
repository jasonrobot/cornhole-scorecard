import {
    doToss,
    makeToss,
    makeFrame,
    makeInning,
    makeGame,
    MISS,
    ON,
    OFF,
    HOLE
} from './Results'

describe('Results model', () => {
    it('should add at the end', () => {
        const g = makeGame(
            makeInning(
                makeFrame(
                    makeToss(MISS),
                    makeToss(ON)
                ),
                makeFrame(
                    makeToss(HOLE),
                    makeToss(MISS)
                )
            )
        )

        doToss(g, makeToss(MISS, [], [OFF]))
        expect(g[0].length).toEqual(3)
        expect(g[0][2].length).toEqual(1)
    })

    it('should not add more than 4 to a frame', () => { })

    it('', () => { })
});
