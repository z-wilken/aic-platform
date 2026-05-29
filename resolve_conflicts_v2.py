import os
import re

files = [
    "apps/platform/app/(modules)/hq/governance/expansion/page.tsx",
    "apps/platform/app/(modules)/hq/growth/revenue/page.tsx",
    "apps/platform/app/(modules)/hq/intelligence/engine/page.tsx",
    "apps/platform/app/(modules)/hq/operations/qc/page.tsx",
    "apps/platform/app/(modules)/hq/people/performance/page.tsx",
    "apps/platform/app/(modules)/hq/training/curriculum/bias-methodology/page.tsx",
    "apps/platform/db/schema.sql",
    "apps/platform/lib/engine-client.ts",
    "apps/web/app/global-error.tsx",
    "apps/web/middleware.ts"
]

def resolve_conflict(content):
    # More aggressive regex for multiline conflicts
    pattern = re.compile(r'<<<<<<< HEAD\s*(.*?)\s*=======\s*(.*?)\s*>>>>>>> [a-zA-Z0-9/._-]+', re.DOTALL)
    
    def replacement(match):
        head = match.group(1)
        return head

    return pattern.sub(replacement, content)

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        new_content = resolve_conflict(content)
        
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Processed {file_path}")
