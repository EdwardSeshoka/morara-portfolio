import { Stage, type StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import type { AppEnvironment } from "./config/app-environment.js";
import { getEnvironmentConfiguration } from "./config/environment-configuration.js";
import type { DeploymentPortfolioConfiguration } from "./config/environment-resolver.js";
import { PortfolioStack } from "./stacks/portfolio-stack.js";

export type PortfolioStageProps = StageProps & {
  appEnvironment: AppEnvironment;
  portfolio: DeploymentPortfolioConfiguration;
};

export class PortfolioStage extends Stage {
  constructor(scope: Construct, id: string, props: PortfolioStageProps) {
    super(scope, id, props);

    const environmentConfiguration = getEnvironmentConfiguration(props.appEnvironment);

    new PortfolioStack(this, "portfolio", {
      appEnvironment: props.appEnvironment,
      stackName: `${environmentConfiguration.stackNamePrefix}-portfolio`,
      portfolioDomainName: props.portfolio.domainName,
      portfolioHostedZoneName: props.portfolio.hostedZoneName,
      portfolioHostedZoneId: props.portfolio.hostedZoneId,
      portfolioCertificateArn: props.portfolio.certificateArn
    });
  }
}
