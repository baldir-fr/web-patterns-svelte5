import {SignupFsmContext, SignupFsmCallbacks} from "./signup-fsm";
import {ILogger} from "typescript-fsm";

const logger: ILogger = console

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
