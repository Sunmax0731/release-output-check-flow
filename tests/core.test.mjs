import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "release-output-check-flow-1",
  "title": "リリース成果物確認フロー サンプル1",
  "status": "ready",
  "name": "release-output-check-flow",
  "version": "0.2.0",
  "artifactPath": "dist/product.zip",
  "releaseNotes": "docs/release-checklist.md",
  "testEvidence": "docs/manual-test.md"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "release-output-check-flow-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "version": "0.2.0",
  "artifactPath": "dist/product.zip",
  "releaseNotes": "docs/release-checklist.md",
  "testEvidence": "docs/manual-test.md"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
