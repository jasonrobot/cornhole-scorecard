import { createElement as e } from 'react'



function Buttons() {
    return e(
        'div',
        null,
        e('button', { id: 'miss' }, 'Miss'),
        e('button', { id: 'on' }, 'On'),
        e('button', { id: 'in' }, 'In'),
    )
}
