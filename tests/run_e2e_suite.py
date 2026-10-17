#!/usr/bin/env python3
"""
Unified E2E Automated Test Suite Runner
Executes Tiers 1-4 for the Wonderbly UAE Replication Platform.
Produces executive summary and detailed tier-by-tier test results.
"""

import sys
import time
import unittest
from pathlib import Path

# Add repo root to python path
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from tests.test_tier1_feature_coverage import TestTier1FeatureCoverage
from tests.test_tier2_boundary_corner_cases import TestTier2BoundaryCornerCases
from tests.test_tier3_cross_feature_combinations import TestTier3CrossFeatureCombinations
from tests.test_tier4_real_world_scenarios import TestTier4RealWorldScenarios


def run_suite():
    print("=" * 78)
    print("🌟 WONDERBLY UAE REPLICATION — AUTOMATED E2E TEST SUITE")
    print("   Architecture: Next.js 16 (App Router) + Pure Web Audio + 300 DPI PDF Engine")
    print("=" * 78)

    tiers = [
        ("Tier 1: Feature Coverage (Features 1–40)", TestTier1FeatureCoverage),
        ("Tier 2: Boundary & Corner Cases", TestTier2BoundaryCornerCases),
        ("Tier 3: Cross-Feature Combinations", TestTier3CrossFeatureCombinations),
        ("Tier 4: Real-World Workload Scenarios", TestTier4RealWorldScenarios),
    ]

    total_tests = 0
    total_failures = 0
    total_errors = 0
    tier_results = []
    start_all = time.time()

    for tier_name, test_class in tiers:
        print(f"\n▶ Executing {tier_name}...")
        loader = unittest.TestLoader()
        suite = loader.loadTestsFromTestCase(test_class)
        runner = unittest.TextTestRunner(verbosity=1)
        start_tier = time.time()
        result = runner.run(suite)
        elapsed = time.time() - start_tier

        count = result.testsRun
        fails = len(result.failures)
        errs = len(result.errors)
        passed = count - fails - errs

        total_tests += count
        total_failures += fails
        total_errors += errs

        tier_results.append({
            "name": tier_name,
            "count": count,
            "passed": passed,
            "failures": fails,
            "errors": errs,
            "time": elapsed,
        })

    total_time = time.time() - start_all

    print("\n" + "=" * 78)
    print("📊 EXECUTIVE TEST SUMMARY REPORT")
    print("=" * 78)
    print(f"{'Tier Name':<45} | {'Tests':<6} | {'Passed':<6} | {'Failed':<6} | {'Time (s)':<8}")
    print("-" * 78)

    for r in tier_results:
        status_symbol = "✅" if r["failures"] == 0 and r["errors"] == 0 else "❌"
        print(
            f"{status_symbol} {r['name']:<42} | {r['count']:<6} | {r['passed']:<6} | {r['failures'] + r['errors']:<6} | {r['time']:<8.3f}"
        )

    print("-" * 78)
    total_passed = total_tests - total_failures - total_errors
    overall_status = "PASSED (100%)" if (total_failures == 0 and total_errors == 0) else "FAILED"
    print(
        f"TOTAL: {total_tests} tests across 4 tiers | Passed: {total_passed} | Failed: {total_failures + total_errors} | Total Time: {total_time:.3f}s"
    )
    print(f"OVERALL STATUS: {overall_status}")
    print("=" * 78)

    return 0 if (total_failures == 0 and total_errors == 0) else 1


if __name__ == "__main__":
    sys.exit(run_suite())
