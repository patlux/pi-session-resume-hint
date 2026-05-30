import assert from "node:assert/strict";
import test from "node:test";
import { createResumeCommand, formatResumeHint, shellQuote } from "../src/domain/resume-hint.ts";

const plainPalette = { muted: "", reset: "" };

test("leaves simple shell values unquoted", () => {
  assert.equal(shellQuote("/tmp/session.jsonl"), "/tmp/session.jsonl");
});

test("single-quotes shell values with spaces", () => {
  assert.equal(shellQuote("/tmp/my session.jsonl"), "'/tmp/my session.jsonl'");
});

test("escapes single quotes in shell values", () => {
  assert.equal(shellQuote("/tmp/pat's session.jsonl"), "'/tmp/pat'\\''s session.jsonl'");
});

test("creates a resume command", () => {
  assert.equal(createResumeCommand("/tmp/my session.jsonl"), "pi --session '/tmp/my session.jsonl'");
});

test("formats a compact resume hint", () => {
  const output = formatResumeHint(
    {
      sessionId: "abc123",
      sessionFile: "/tmp/session.jsonl",
    },
    plainPalette,
  );

  assert.match(output, /pi session/);
  assert.match(output, /id     abc123/);
  assert.match(output, /resume pi --session \/tmp\/session\.jsonl/);
});
