# kb plugin installation samples

Synthetic fixtures for popemkt/kb's GitHub install and marketplace acceptance.
`hello` and `aurora` are small read actions: `hello` greets a name and `aurora`
returns a palette. `tide-backdrop` is a page-head backdrop: a canvas-2D gradient
drifting like a tide, with `speed` and `hue` knobs, metered by kb's frame meter.
None of them contains personal data, credentials, package installation or scripts.

Install `github:popemkt/kb-plugins-sample/extensions/hello@main`, or add this
repository as marketplace `sample`. Installation never grants trust. Review the
source and approve its closure digest through kb before running it.

Each extension says what it is, who wrote it and what it reaches in
`<name>.manifest.json` beside its entry, which kb shows before you trust it
and includes in the digest you trust. What each field means is
[kb's extension guidelines](https://github.com/popemkt/kb/blob/main/docs/extensions/README.md).

Acceptance runs may push synthetic changes to dedicated `acceptance-*` branches.
MIT licensed.
