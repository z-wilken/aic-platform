import unittest
import pandas as pd
import numpy as np
from app.services.bias_analysis import analyze_disparate_impact, analyze_equalized_odds

class TestFairnessMetrics(unittest.TestCase):

    def setUp(self):
        # Create a sample dataset
        self.data = [
            {"race": "Group A", "hired": 1, "actual": 1, "predicted": 1},
            {"race": "Group A", "hired": 1, "actual": 1, "predicted": 1},
            {"race": "Group A", "hired": 0, "actual": 0, "predicted": 0},
            {"race": "Group A", "hired": 0, "actual": 0, "predicted": 0},
            {"race": "Group B", "hired": 1, "actual": 1, "predicted": 1},
            {"race": "Group B", "hired": 0, "actual": 1, "predicted": 0},
            {"race": "Group B", "hired": 0, "actual": 0, "predicted": 0},
            {"race": "Group B", "hired": 0, "actual": 0, "predicted": 0}
        ]

    def test_disparate_impact_pass(self):
        # Group A: 2/4 = 0.5 selection rate
        # Group B: 1/4 = 0.25 selection rate
        # Ratio: 0.25 / 0.5 = 0.5 (Should fail Four-Fifths rule)
        result = analyze_disparate_impact(self.data, "race", "hired")
        self.assertEqual(result["overall_status"], "BIASED")
        self.assertEqual(result["detailed_analysis"]["Group B"]["disparate_impact_ratio"], 0.5)

    def test_equalized_odds(self):
        # Threshold 0.1
        result = analyze_equalized_odds(self.data, "race", "actual", "predicted", threshold=0.1)
        # TPR Group A: 2/2 = 1.0
        # TPR Group B: 1/2 = 0.5
        # TPR Diff: 0.5 (Exceeds 0.1)
        self.assertEqual(result["overall_status"], "FAIL")
        self.assertFalse(result["tpr_parity"])

    def test_empty_groups(self):
        # Test with data missing one group's outcomes
        bad_data = [
            {"race": "Group A", "hired": 1},
            {"race": "Group B", "hired": 0}
        ]
        result = analyze_disparate_impact(bad_data, "race", "hired")
        self.assertIn("detailed_analysis", result)

if __name__ == '__main__':
    unittest.main()
