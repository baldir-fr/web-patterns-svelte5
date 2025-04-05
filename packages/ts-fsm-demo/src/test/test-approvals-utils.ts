import * as approvals from 'approvals'
import StringWriter from 'approvals/lib/StringWriter'
import path from 'node:path'
import { Namer } from 'approvals/lib/Core/Namer'

export function verifyWithExtension(
    dirName: string,
    testName: string,
    text: string,
    extensionWithoutDot: string = 'txt'
) {
    approvals.verifyWithControl(
        namerWithExtension(dirName, testName),
        new StringWriter(approvals.getConfig(), text, extensionWithoutDot),
        null,
        approvals.getConfig()
    )
}

function namerWithExtension(dirName: string, testName: string): Namer {
    return {
        getApprovedFile(ext: string): string {
            return path.join(dirName, testName + '.approved.' + ext)
        },
        getReceivedFile(ext: string): string {
            return path.join(dirName, testName + '.received.' + ext)
        }
    }
}
