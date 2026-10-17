export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, unknown>
  | ClassValue[];

/**
 * Pure TypeScript class merging utility.
 * Concatenates truthy string and object keys without external dependencies (no tailwind-merge, no clsx).
 */
export function cn(...inputs: (ClassValue | ClassValue[])[]): string {
  const classes: string[] = [];

  function process(val: ClassValue): void {
    if (!val) return;
    if (typeof val === 'string' || typeof val === 'number') {
      const trimmed = String(val).trim();
      if (trimmed) classes.push(trimmed);
    } else if (Array.isArray(val)) {
      for (const item of val) {
        process(item);
      }
    } else if (typeof val === 'object') {
      for (const [key, condition] of Object.entries(val)) {
        if (condition && key) {
          classes.push(key.trim());
        }
      }
    }
  }

  for (const input of inputs) {
    process(input);
  }

  return classes.filter(Boolean).join(' ');
}

export default cn;
