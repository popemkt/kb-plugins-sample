# kb plugin installation samples

Synthetic fixtures for popemkt/kb's GitHub install and marketplace acceptance.
`hello` and `aurora` are small read actions: `hello` greets a name and `aurora`
returns a palette. `tide-backdrop` is a page-head backdrop: a canvas-2D gradient
drifting like a tide, with `speed` and `hue` knobs, metered by kb's frame meter;
its bands lean toward the cursor and the tide runs faster while you type.
None of them contains personal data, credentials, package installation or scripts.

Install `github:popemkt/kb-plugins-sample/extensions/hello@main`, or add this
repository as marketplace `sample`. Installation never grants trust. Review the
source and approve its closure digest through kb before running it.

Acceptance runs may push synthetic changes to dedicated `acceptance-*` branches.
MIT licensed.
