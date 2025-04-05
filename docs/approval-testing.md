# Approval testing

[Approval testing](https://approvaltests.com/) for nodeJs.

https://github.com/approvals/Approvals.NodeJS


## Generate living diagrams with mermaid

Approvals can generate text and [Mermaid Diagrams](mermaid-diagram.md) are text.
So can generate living diagrams ([Living Documentation](living-documentation.md)) with approvals.

Usually approvals implementation can support custom file extension ().
But unless it is pushed, [it is not native yet in approvals for nodejs](https://github.com/approvals/Approvals.NodeJS/issues/112).

While waiting for the evolution to be merged, you can use existing API to verify with custom file extensions.

An example of such utility :

```ts
import * as approvals from 'approvals'
import StringWriter from 'approvals/lib/StringWriter'
import path from 'node:path'

test('Draws mermaid diagram',  () => {
	const mermaidCode = "some mermaid diagram"

	verifyWithExtension('docs/diagrams', 'flow-diagram', mermaidCode, 'mermaid')
})

function verifyWithExtension(
	dirName: string,
	testName: string,
	text: string,
	extensionWithoutDot: string = 'txt'
) {
	approvals.verifyWithControl(
		namerWithExtension(dirName, testName),
		new StringWriter(approvals.getConfig(), text, extensionWithoutDot)
	)
}

function namerWithExtension(dirName: string, testName: string) {
	return {
		getApprovedFile(ext: string): string {
			return path.join(dirName, testName + '.approved.' + ext)
		},
		getReceivedFile(ext: string): string {
			return path.join(dirName, testName + '.received.' + ext)
		}
	}
}

```

Will generate and verify against files :
- `docs/diagrams/subscription-fsm.approved.mermaid`
- `docs/diagrams/subscription-fsm.received.mermaid`

## Configuration override

`~/.approvalsConfig`

```json
{
  "reporters": [
    "BeyondCompare",
    "diffmerge",
    "p4merge",
    "tortoisemerge",
    "nodediff",
    "opendiff",
    "gitdiff"
  ],
  "normalizeLineEndingsTo": false,
  "failOnLineEndingDifferences": false,
  "appendEOL": true,
  "errorOnStaleApprovedFiles": true,
  "stripBOM": false,
  "forceApproveAll": false,
  "blockUntilReporterExits": false,
  "maxLaunches": 10
}


```