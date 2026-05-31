import assert from "node:assert/strict";
import test from "node:test";
import { createResumeCommand, formatResumeHint, hasResumableConversation } from "../src/domain/resume-hint.ts";

const plainPalette = { muted: "", reset: "" };

test("creates a short resume command from the session id", () => {
  assert.equal(
    createResumeCommand("019e7ad2-fe20-7416-8469-156ef1fde687"),
    "pi --session 019e7ad2-fe20-7416-8469-156ef1fde687",
  );
});

test("formats only the copyable resume command", () => {
  const output = formatResumeHint(
    {
      sessionId: "019e7ad2-fe20-7416-8469-156ef1fde687",
    },
    plainPalette,
  );

  assert.equal(output, "\npi --session 019e7ad2-fe20-7416-8469-156ef1fde687\n");
  assert.doesNotMatch(output, /pi session/);
  assert.doesNotMatch(output, /resume /);
  assert.doesNotMatch(output, /[╭│╰]/);
});

test("wraps the resume command in muted color", () => {
  const output = formatResumeHint({
    sessionId: "019e7ad2-fe20-7416-8469-156ef1fde687",
  });

  assert.equal(output, "\n\u001b[90mpi --session 019e7ad2-fe20-7416-8469-156ef1fde687\u001b[0m\n");
});

test("detects sessions with user or assistant messages", () => {
  assert.equal(hasResumableConversation([]), false);
  assert.equal(hasResumableConversation([{ type: "model_change" }]), false);
  assert.equal(hasResumableConversation([{ type: "message", message: { role: "toolResult" } }]), false);
  assert.equal(hasResumableConversation([{ type: "message", message: { role: "user" } }]), true);
  assert.equal(hasResumableConversation([{ type: "message", message: { role: "assistant" } }]), true);
});
