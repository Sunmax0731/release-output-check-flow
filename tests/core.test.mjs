import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "release-1",
  "title": "出力・リリース確認フロー サンプル 1",
  "name": "release-output-check-flow",
  "version": "0.1.0",
  "artifactPath": "dist/sample-artifact.zip",
  "releaseNotes": "docs/release-notes.md",
  "testEvidence": "dist/test-report.txt"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "release-missing-required",
  "title": "必須項目不足サンプル",
  "version": "0.1.0",
  "artifactPath": "dist/sample-artifact.zip",
  "releaseNotes": "docs/release-notes.md",
  "testEvidence": "dist/test-report.txt"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
