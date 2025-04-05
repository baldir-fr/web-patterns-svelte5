import {SignupFsmContext, SignupFsmCallbacks} from "./signup-fsm";
import {ILogger} from "typescript-fsm";

const logger: ILogger = console
// Here we can implement callbacks for signup finite state machine
// They can do side effects and depend on infrastructure (database, filesystem, mail ...)
const prodCallbacks: SignupFsmCallbacks = {
    askEmailConfirmation: async (context: SignupFsmContext) => {
        logger.info("In callback : " + this)
    },
    activate: async (context: SignupFsmContext) => {
        logger.info("In callback : " + this)
    },
    close: async (context: SignupFsmContext) => {
        logger.info("In callback : " + this)
    },
}
