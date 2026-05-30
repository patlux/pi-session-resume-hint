# pi-session-resume-hint

Print a compact Pi session resume command when an interactive Pi session exits.

## Install

```bash
pi install git:github.com/patlux/pi-session-resume-hint@v0.1.0
```

Then reload Pi:

```text
/reload
```

## Pi manifest

```json
{
  "extensions": ["./index.ts"]
}
```

On `session_shutdown` with reason `quit`, this extension prints the session id and `pi --session <file>` command for non-ephemeral sessions.
