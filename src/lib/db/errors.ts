// Phase D — pg error inspection helpers for admin write APIs.

export interface PgError {
  code: string;
  constraint?: string;
  detail?: string;
}

export function isPgError(err: unknown): err is PgError {
  return typeof err === "object" && err !== null && "code" in err;
}

export function isUniqueViolation(err: unknown): err is PgError {
  return isPgError(err) && err.code === "23505";
}