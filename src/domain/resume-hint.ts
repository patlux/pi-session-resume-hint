export interface SessionResumeInfo {
  sessionId: string;
  sessionFile: string;
}

export interface AnsiPalette {
  muted: string;
  reset: string;
}

export const defaultAnsiPalette: AnsiPalette = {
  muted: "\u001b[90m",
  reset: "\u001b[0m",
};

export function createResumeCommand(sessionFile: string): string {
  return `pi --session ${shellQuote(sessionFile)}`;
}

export function formatResumeHint(info: SessionResumeInfo, palette: AnsiPalette = defaultAnsiPalette): string {
  const resumeCommand = createResumeCommand(info.sessionFile);
  const lines = [
    "╭─ pi session ─────────────────────────────────────────╮",
    `│ id     ${info.sessionId}`,
    `│ resume ${resumeCommand}`,
    "╰──────────────────────────────────────────────────────╯",
  ];

  return `\n${lines.map((line) => `${palette.muted}${line}${palette.reset}`).join("\n")}\n`;
}

export function shellQuote(value: string): string {
  if (/^[A-Za-z0-9_/:=.,@%+-]+$/.test(value)) return value;

  return `'${value.replaceAll("'", "'\\''")}'`;
}
