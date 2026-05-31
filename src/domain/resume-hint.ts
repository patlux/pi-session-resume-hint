export interface SessionResumeInfo {
  sessionId: string;
}

export interface SessionEntryLike {
  type: string;
  message?: {
    role?: string;
  };
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

export function hasResumableConversation(entries: readonly SessionEntryLike[]): boolean {
  return entries.some(
    (entry) =>
      entry.type === "message" &&
      (entry.message?.role === "user" || entry.message?.role === "assistant"),
  );
}

export function formatResumeHint(info: SessionResumeInfo, palette: AnsiPalette = defaultAnsiPalette): string {
  const resumeCommand = createResumeCommand(info.sessionId);

  return `\n${palette.muted}${resumeCommand}${palette.reset}\n`;
}
