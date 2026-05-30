import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const gray = "\u001b[90m";
const reset = "\u001b[0m";

export default function (pi: ExtensionAPI) {
  pi.on("session_shutdown", async (event, ctx) => {
    if (event.reason !== "quit") return;

    const sfile = ctx.sessionManager.getSessionFile();
    if (!sfile) return; // ephemeral session, nothing to resume

    const sid = ctx.sessionManager.getSessionId();
    const resume = `pi --session ${sfile}`;

    process.stdout.write(`\n${gray}╭─ pi session ─────────────────────────────────────────╮${reset}\n`);
    process.stdout.write(`${gray}│ id     ${sid}${reset}\n`);
    process.stdout.write(`${gray}│ resume ${resume}${reset}\n`);
    process.stdout.write(`${gray}╰──────────────────────────────────────────────────────╯${reset}\n`);
  });
}
