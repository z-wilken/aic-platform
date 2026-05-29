import os
import re

files = [
    "apps/platform/app/(modules)/hq/governance/expansion/page.tsx",
    "apps/platform/app/(modules)/hq/growth/revenue/page.tsx",
    "apps/platform/app/(modules)/hq/intelligence/engine/page.tsx",
    "apps/platform/app/(modules)/hq/operations/qc/page.tsx",
    "apps/platform/app/(modules)/hq/people/performance/page.tsx",
    "apps/platform/app/(modules)/hq/training/curriculum/bias-methodology/page.tsx",
    "apps/platform/app/api/audit-logs/labor/route.ts",
    "apps/platform/app/api/audit-logs/privacy/route.ts",
    "apps/platform/app/api/health/route.ts",
    "apps/platform/app/api/incidents/escalate/route.ts",
    "apps/platform/app/api/settings/route.ts",
    "apps/platform/app/components/XAIExplanation.tsx",
    "apps/platform/app/error.tsx",
    "apps/platform/db/schema.sql",
    "apps/platform/lib/engine-client.ts",
    "apps/web/__tests__/lib/report-generator.test.ts",
    "apps/web/__tests__/lib/scoring.test.ts",
    "apps/web/app/error.tsx",
    "apps/web/app/global-error.tsx",
    "apps/web/middleware.ts",
    "packages/auth/package.json",
    "packages/auth/src/index.ts",
    "packages/legal/src/index.ts",
    "packages/types/index.ts",
    "packages/types/package.json"
]

def resolve_conflict(content):
    # Regex to find conflict markers
    pattern = re.compile(r'<<<<<<< HEAD\n(.*?)\n=======\n(.*?)\n>>>>>>> [a-zA-Z0-9/._-]+', re.DOTALL)
    
    def replacement(match):
        head = match.group(1)
        incoming = match.group(2)
        
        # Simple heuristic: if head is more comprehensive or uses standard imports, keep it.
        # Otherwise, if they are almost same, pick head.
        if head.strip() == incoming.strip():
            return head
        
        # Prefer Head for imports if it uses @aic/ or current structure
        if "from '@aic/" in head or "from '@/lib/" in head:
            return head
            
        # Default to Head
        return head

    return pattern.sub(replacement, content)

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        new_content = resolve_conflict(content)
        
        # If markers still exist (nested or complex), we might need manual help, but this should clear most
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Processed {file_path}")
