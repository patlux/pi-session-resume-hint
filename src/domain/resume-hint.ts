export interface SessionResumeInfo {
  sessionId: string;
}

export interface AnsiPalette {
  muted: string;
  reset: string;
}

export const defaultAnsiPalette: AnsiPalette = {
  muted: "\u001b[90m",
  reset: "\u001b[0m",
};

export function createResumeCommand(sessionId: string): string {
  return `pi --session ${sessionId}`;
}

export function formatResumeHint(info: SessionResumeInfo, palette: AnsiPalette = defaultAnsiPalette): string {
  const resumeCommand = createResumeCommand(info.sessionId);
  const lines = [
    "╭─ pi session ─────────────────────────────────────────╮",
    `│ resume ${resumeCommand}`,
    "╰──────────────────────────────────────────────────────╯",
  ];

  return `\n${lines.map((line) => `${palette.muted}${line}${palette.reset}`).join("\n")}\n`;
}
