import {ILogger, StateMachine, t} from 'typescript-fsm'

export class SignupFsm {
    private stateMachine: StateMachine<SignupFsmState, SignupFsmEvent>
    private logger: ILogger

    constructor(
        initialState: SignupFsmState,
        callbacks: SignupFsmCallbacks, // pluggable callbacks to decouple them from the state machine
        logger: ILogger = console
    ) {
        this.logger = logger
        // Spread to improve transitions visibility
        const {
            askEmailConfirmation,
            activate,
            close,
        }: SignupFsmCallbacks = callbacks

        this.stateMachine = new StateMachine<SignupFsmState, SignupFsmEvent>(
            initialState,
            [
                // Nominal user journey for individual signup
                t(Initiated, AskEmailConfirmation, Pending, askEmailConfirmation),
                t(Pending, EmailConfirmed, Active, activate),
                t(Active, Close, Closed, close),

                // Edge case confirmation timeout
                t(Pending, EmailConfirmationTimedOut, Closed, close),
            ],
            logger
        )
    }

    toMermaid(title: string): string {
        return this.stateMachine.toMermaid(title)
    }

    state():SignupFsmState{
        return this.stateMachine.getState()
    }

    async handle(event: SignupFsmEvent, context: SignupFsmContext) {
        const from = this.stateMachine.getState()
        const on_event = event
        if (!this.stateMachine.can(event)) {
            this.logger.info(`Demo FSM : no transition from ${from} on event ${on_event}`, from, on_event)
        } else {
            this.logger.info(`Demo FSM : transitioning from ${from} on event ${on_event}`, from, on_event)
            await this.stateMachine.dispatch(event, context)
        }

        // TODO: transactional dispatch ?
    }
}

export enum SignupFsmState {
    Initiated = 'Initiated',
    Pending = 'Pending',
    Active = 'Active',
    Closed = 'Closed',
}

/**
 * Naming convention :
 * - in past tense : event
 * - in present imperative tense : command
 */
export enum SignupFsmEvent {
    AskEmailConfirmation = 'askEmailConfirmation',
    EmailConfirmed = 'emailConfirmed',
    EmailConfirmationTimedOut = 'emailConfirmationTimedOut',
    Close = 'close',
}


// Destructuration to improve readability of transistions declaration (similar to static imports in Java)
const {Initiated, Closed, Active, Pending} = SignupFsmState
const {
    AskEmailConfirmation,
    EmailConfirmed,
    EmailConfirmationTimedOut,
    Close
} = SignupFsmEvent

export type SignupFsmCallbacks = {
    askEmailConfirmation: (context: SignupFsmContext) => Promise<void>
    activate: (context: SignupFsmContext) => Promise<void>
    close: (context: SignupFsmContext) => Promise<void>
}

export type SignupFsmContext = {
    email: string
    login: string
}
