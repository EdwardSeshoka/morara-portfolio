import type { AppEnvironment } from "./app-environment.js";

const DEFAULT_AWS_REGION = "af-south-1";

export type EnvironmentConfiguration = Readonly<{
  appEnvironment: AppEnvironment;
  stackNamePrefix: string;
  infrastructure: Readonly<{
    allowDestructiveChanges: boolean;
    defaultRegion: string;
  }>;
}>;

export const ENVIRONMENT_CONFIGURATIONS: Record<AppEnvironment, EnvironmentConfiguration> = {
  dev: {
    appEnvironment: "dev",
    stackNamePrefix: "morara-dev",
    infrastructure: {
      allowDestructiveChanges: true,
      defaultRegion: DEFAULT_AWS_REGION
    }
  },
  beta: {
    appEnvironment: "beta",
    stackNamePrefix: "morara-beta",
    infrastructure: {
      allowDestructiveChanges: false,
      defaultRegion: DEFAULT_AWS_REGION
    }
  },
  production: {
    appEnvironment: "production",
    stackNamePrefix: "morara-production",
    infrastructure: {
      allowDestructiveChanges: false,
      defaultRegion: DEFAULT_AWS_REGION
    }
  }
};

export function getEnvironmentConfiguration(
  appEnvironment: AppEnvironment
): EnvironmentConfiguration {
  return ENVIRONMENT_CONFIGURATIONS[appEnvironment];
}
