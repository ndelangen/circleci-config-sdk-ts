import { type Command } from '../../Commands/exports/Command';
import { type Executor } from '../../Executors';
import { type ReusedExecutor } from '../../Executors/exports/ReusedExecutor';
import {
  type AnyExecutorShape,
  type ExecutableProperties,
} from '../../Executors/types/Executor.types';
import { CustomParametersList } from '../../Parameters';
import {
  type CustomParametersListShape,
  type EnvironmentParameter,
} from '../../Parameters/types';
import { type JobParameterLiteral } from '../../Parameters/types/CustomParameterLiterals.types';

export type JobContentsShape = {
  steps: unknown[];
  parallelism?: number;
  circleci_ip_ranges?: boolean;
} & AnyExecutorShape &
  JobEnvironmentShape;

export type JobsShape = {
  [key: string]: JobContentsShape;
};

export type JobEnvironmentShape = {
  environment?: EnvironmentParameter;
};

export type AnyExecutor = ReusedExecutor | Executor;

export type ParameterizedJobContents = JobContentsShape & {
  parameters: CustomParametersListShape;
};

export type JobDependencies = {
  executor: AnyExecutor;
  steps: Command[];
  parametersList?: CustomParametersList<JobParameterLiteral>;
};

export type JobOptionalProperties = {
  parallelism?: number;
  circleci_ip_ranges?: boolean;
} & ExecutableProperties;

export type UnknownJobShape = {
  [key: string]: unknown;
  steps: { [key: string]: unknown }[];
  resource_class: string;
  parameters?: { [key: string]: unknown };
  environment?: { [key: string]: string };
};
