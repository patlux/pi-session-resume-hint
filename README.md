# pi-session-resume-hint

A [pi](https://pi.dev) extension that prints a compact resume command when you quit a persistent Pi session.

When Pi exits normally, the extension shows the session id and a shell-safe `pi --session <file>` command so you can resume the exact conversation later.

## Install

This package is published on GitHub only.

```sh
pi install git:github.com/patlux/pi-session-resume-hint@v0.1.1
```

Then reload pi:

```txt
/reload
```

## Usage

No commands or configuration are required.

Quit Pi from a persistent session. The extension prints a small hint:

```txt
╭─ pi session ─────────────────────────────────────────╮
│ id     01jz...
│ resume pi --session /path/to/session.jsonl
╰──────────────────────────────────────────────────────╯
```

If the session path contains spaces or shell-sensitive characters, the resume command is quoted safely:

```txt
pi --session '/tmp/my session.jsonl'
```

## Behavior

The hint appears only when:

- Pi emits `session_shutdown` with reason `quit`
- the current session has a backing session file

It does not print during reloads, forks, session switches, or ephemeral sessions.

## Notes

- The extension writes only to stdout during shutdown.
- It does not modify sessions.
- Extensions run with local user permissions. Review extensions before installing them.

## Development

```sh
npm ci
npm run ci
```

The package uses TypeScript source directly. Pi loads `.ts` extensions without a build step.

## Release

GitHub-only release flow:

```sh
npm version patch --no-git-tag-version
git commit -am "Release vX.Y.Z"
git tag -a vX.Y.Z -m "pi-session-resume-hint vX.Y.Z"
git push origin main vX.Y.Z
```

Install the pinned tag with:

```sh
pi install git:github.com/patlux/pi-session-resume-hint@vX.Y.Z
```

## License

MIT
