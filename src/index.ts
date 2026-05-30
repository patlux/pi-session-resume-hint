import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { formatResumeHint } from "./domain/resume-hint.ts";

export default function sessionResumeHint(pi: ExtensionAPI) {
  pi.on("session_shutdown", (event, ctx) => {
    if (event.reason !== "quit") return;

    const sessionFile = ctx.sessionManager.getSessionFile();
    if (!sessionFile) return;

    process.stdout.write(
      formatResumeHint({
        sessionId: ctx.sessionManager.getSessionId(),
        sessionFile,
      }),
    );
  });
}
