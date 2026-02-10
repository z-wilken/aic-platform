from typing import List, Dict, Any
import hashlib
import json

def verify_hash_chain(entries: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Verifies a sequence of audit log entries to ensure the chain is unbroken.
    Each entry must contain 'data', 'integrity_hash', and optionally 'previous_hash'.
    """
    verification_results = []
    is_valid = True
    
    for i, entry in enumerate(entries):
        data = entry.get("data", {})
        current_hash = entry.get("integrity_hash")
        previous_hash = entry.get("previous_hash")
        
        # Recalculate hash
        payload = {"data": data}
        if previous_hash:
            payload["previous_hash"] = previous_hash
            
        expected_hash = hashlib.sha256(json.dumps(payload, sort_keys=True, default=str).encode()).hexdigest()
        
        entry_valid = (expected_hash == current_hash)
        
        # Also check link to previous entry if not the first one
        link_valid = True
        if i > 0:
            link_valid = (previous_hash == entries[i-1].get("integrity_hash"))
            
        if not entry_valid or not link_valid:
            is_valid = False
            
        verification_results.append({
            "index": i,
            "entry_valid": entry_valid,
            "link_valid": link_valid,
            "current_hash": current_hash,
            "expected_hash": expected_hash
        })
        
    return {
        "is_valid": is_valid,
        "results": verification_results
    }
