import {beforeEach, describe, expect, it, vi} from 'vitest'
import {verifyWithExtension} from '../test/test-approvals-utils'
import {SignupFsm, SignupFsmCallbacks, SignupFsmEvent, SignupFsmState} from "./signup-fsm"

const {EmailConfirmationTimedOut, AskEmailConfirmation, EmailConfirmed, Close} = SignupFsmEvent
const {Closed, Initiated, Pending, Active} = SignupFsmState

const callbacks: SignupFsmCallbacks = {
    askEmailConfirmation: vi.fn(),
    activate: vi.fn(),
    close: vi.fn(),
}
describe('Signup state machine', () => {


    describe('Transitions', () => {
        beforeEach(async () => {
            vi.resetAllMocks()
        })
        it.each([
            {
                initial_state: Initiated,
                expected_state: Pending,
                event: AskEmailConfirmation,
                callback: callbacks.askEmailConfirmation
            },
            {
                initial_state: Pending,
                expected_state: Active,
                event: EmailConfirmed,
                callback: callbacks.activate
            },
            {
                initial_state: Active,
                expected_state: Closed,
                event: Close,
                callback: callbacks.close
            },
            {
                initial_state: Pending,
                expected_state: Closed,
                event: EmailConfirmationTimedOut,
                callback: callbacks.close
            },
        ])(
            'from $initial_state to $expected_state on event $event',
            async ({initial_state, event, expected_state, callback}) => {
                const fsm = new SignupFsm(initial_state, callbacks)
                await fsm.handle(event, {email: "foo@example.com", login: "foo"})
                expect(fsm.state()).toBe(expected_state)
                expect(callback).toHaveBeenCalled()
            }
        )
    })

    it('Draws living documentation mermaid diagram', async () => {
        const stateMachine = new SignupFsm(Initiated, callbacks)

        const mermaidDiagram = stateMachine.toMermaid('Signup')
        verifyWithExtension('docs/diagrams', 'signup-fsm', mermaidDiagram, 'mermaid')
    })
})

