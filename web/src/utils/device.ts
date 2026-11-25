import { STORAGE_KEY_PREFIX, USER_CODE_LENGTH } from "@/constants/device";
import { DeviceVerificationData } from "@/types/device";

export function normalizeUserCode(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, USER_CODE_LENGTH);
}

export function formatUserCode(value: string): string {
  const clean = normalizeUserCode(value);
  if (clean.length <= 4) return clean;
  return `${clean.slice(0, 4)}-${clean.slice(4)}`;
}

export function getInitials(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.split("@")[0] || "U";
  return source
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function parseScopes(scope?: string | null): string[] {
  if (!scope) return [];
  return scope
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getDeviceErrorMessage(
  err: { error_description?: string; statusText?: string } | null | undefined,
  fallback: string,
): string {
  const description = err?.error_description;
  if (description === "Invalid user code") {
    return "This code is invalid, expired, or has already been used. Please check your terminal or start a new login.";
  }
  return description || err?.statusText || fallback;
}

/* ---------------------------------- 
Stored desicison in session
------------------------------------*/


export function getStoredDecision(userCode: string): DeviceVerificationData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(
      `${STORAGE_KEY_PREFIX}${normalizeUserCode(userCode)}`,
    );
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DeviceVerificationData;
    if (parsed.status === "approved" || parsed.status === "denied") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function storeDecision(data: DeviceVerificationData): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      `${STORAGE_KEY_PREFIX}${normalizeUserCode(data.user_code)}`,
      JSON.stringify(data),
    );
  } catch {
    // Ignore storage errors in restricted browsing contexts
  }
}