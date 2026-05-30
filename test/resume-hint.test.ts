import assert from "node:assert/strict";
import test from "node:test";
import { createResumeCommand, formatResumeHint } from "../src/domain/resume-hint.ts";

const plainPalette = { muted: "", reset: "" };

test("creates a short resume command from the session id", () => {
  assert.equal(createResumeCommand("019e7ad2-fe20-7416-8469-156ef1fde687"), "pi --session 019e7ad2-fe20-7416-8469-156ef1fde687");
});

test("formats a compact one-line resume hint", () => {
  const output = formatResumeHint(
    {
      sessionId: "019e7ad2-fe20-7416-8469-156ef1fde687",
    },
    plainPalette,
  );

  assert.match(output, /pi session/);
  assert.match(output, /resume pi --session 019e7ad2-fe20-7416-8469-156ef1fde687/);
  assert.doesNotMatch(output, /id     /);
});
