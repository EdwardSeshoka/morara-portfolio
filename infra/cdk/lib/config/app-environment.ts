export const APP_ENVIRONMENTS = ["dev", "beta", "production"] as const;

export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

export const DEFAULT_APP_ENVIRONMENT: AppEnvironment = "dev";

const APP_ENVIRONMENT_ALIASES: Record<string, AppEnvironment> = {
  dev: "dev",
  development: "dev",
  local: "dev",
  beta: "beta",
  int: "beta",
  integration: "beta",
  uat: "beta",
  staging: "beta",
  production: "production",
  prod: "production"
};

export function parseAppEnvironment(value: unknown): AppEnvironment | null {
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;

  return APP_ENVIRONMENT_ALIASES[normalized] ?? null;
}

export function parseAppEnvironmentList(value: unknown): AppEnvironment[] {
  if (typeof value !== "string") return [];

  const resolved = new Set<AppEnvironment>();

  for (const token of value.split(/[,\s]+/)) {
    const appEnvironment = parseAppEnvironment(token);
    if (appEnvironment) resolved.add(appEnvironment);
  }

  return [...resolved];
}

export function toScopedEnvironmentVariableName(
  appEnvironment: AppEnvironment,
  keySuffix: string
): string {
  return `${appEnvironment.toUpperCase()}_${keySuffix}`;
}

export function toScopedContextKey(appEnvironment: AppEnvironment, keySuffix: string): string {
  return `${appEnvironment}${keySuffix}`;
}
