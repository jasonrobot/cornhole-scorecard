import { createElement as e } from 'react'

import { useAppSelector } from './hooks'

export default function CurrentToss() {
    const currentToss = useAppSelector(state => state.currentToss)

    return e('div', null, currentToss.bag ?? 'none')
}
