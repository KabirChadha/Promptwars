import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple CSS class names and Tailwind CSS classes into a merged string,
 * automatically resolving conflicting Tailwind utility classes.
 *
 * @param inputs - Array of class values or conditional expressions.
 * @returns Merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Anonymizes raw text by scrubbing known worker identifiers, supervisor tags,
 * phone numbers, email addresses, and employee badge codes with `[REDACTED]`.
 *
 * @param rawText - The raw grievance or incident text.
 * @param workerName - Optional worker name to explicitly redact.
 * @param workerId - Optional worker ID to explicitly redact.
 * @returns Sanitized string with PII replaced by `[REDACTED]`.
 */
export function clientScrubPII(
  rawText: string,
  workerName?: string,
  workerId?: string
): string {
  if (!rawText) return "";
  let sanitized = rawText;

  if (workerName && workerName.trim().length > 1) {
    const escaped = workerName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sanitized = sanitized.replace(new RegExp(`\\b${escaped}\\b`, "gi"), "[REDACTED]");
  }

  if (workerId && workerId.trim().length > 1) {
    const escapedId = workerId.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sanitized = sanitized.replace(new RegExp(`\\b${escapedId}\\b`, "gi"), "[REDACTED]");
  }

  sanitized = sanitized.replace(/\b(?:EMP|WRK|ID|BADGE)[-:#]?\s*[A-Z0-9-]+\b/gi, "[REDACTED]");
  sanitized = sanitized.replace(
    /\b(?:supervisor|foreman|manager|contractor|in-charge|boss)(?:\s+[A-Z][a-z]+)?\b/gi,
    "[REDACTED]"
  );
  sanitized = sanitized.replace(
    /\b(?:Mr\.|Mrs\.|Ms\.|Shri|Smt\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi,
    "[REDACTED]"
  );
  sanitized = sanitized.replace(
    /(?:\+?\d{1,3}[-.\s]?)?(?:\d{5}[-.\s]?\d{5}|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})/g,
    "[REDACTED]"
  );
  sanitized = sanitized.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    "[REDACTED]"
  );

  return sanitized;
}
