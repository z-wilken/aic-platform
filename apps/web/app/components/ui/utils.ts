type ClassValue = string | undefined | null | false | 0 | ClassValue[];

/**
 * Lightweight cn utility — merges Tailwind class names without external dependencies.
 * For production use, consider adding clsx + tailwind-merge to package.json.
 */
export function cn(...inputs: ClassValue[]): string {
  return (inputs.flat(Infinity as 1) as (string | undefined | null | false | 0)[])
    .filter(Boolean)
    .join(" ");
}
