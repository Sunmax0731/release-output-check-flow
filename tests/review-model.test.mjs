import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, buildReviewModel, renderHtmlReport } from '../src/core.mjs';

test('review model exposes status cards and next actions', () => {
  const report = analyzeItems({ items: [{
  "id": "release-output-check-flow-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "version": "0.2.0",
  "artifactPath": "dist/product.zip",
  "releaseNotes": "docs/release-checklist.md",
  "testEvidence": "docs/manual-test.md"
}] });
  const model = buildReviewModel(report);
  assert.equal(model.statusLabel, '要修正');
  assert.ok(model.completionRate < 100);
  assert.ok(model.cards.length >= 4);
  assert.match(renderHtmlReport(report), /Next Actions/);
});
