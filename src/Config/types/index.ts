import { type ReusableCommandShape } from '../../Components/Commands/types/Command.types';
import { type ReusableExecutor } from '../../Components/Executors/exports/ReusableExecutor';
import { type ReusableExecutorsShape } from '../../Components/Executors/types/ReusableExecutor.types';
import { type Job } from '../../Components/Job';
import { type JobsShape } from '../../Components/Job/types/Job.types';
import { type CustomParametersList } from '../../Components/Parameters';
import { type ParameterShape } from '../../Components/Parameters/types';
import { type AnyParameterLiteral } from '../../Components/Parameters/types/CustomParameterLiterals.types';
import { type Workflow } from '../../Components/Workflow/exports/Workflow';
import { type WorkflowsShape } from '../../Components/Workflow/types/Workflow.types';
import { type OrbImport } from '../../Orb';
import { type OrbImportsShape } from '../../Orb/types/Orb.types';
import { type Generable } from '../../Components';
import { type ReusableCommand } from '../../Components/Reusable';
import * as mapping from './Mapping.types';

/**
 * Selected config version
 */
export type ConfigVersion = 2 | 2.1;

/**
 * Orb import object
 */
export type ConfigOrbImport = Record<string, string>;

/**
 * CircleCI configuration object
 */
export type CircleCIConfigObject = {
  version: ConfigVersion;
  jobs?: Job[];
  executors?: ReusableExecutor[];
  commands?: ReusableCommand[];
  workflows?: Workflow[];
  orbs?: OrbImport[];
};

/**
 * Generated Shape of the CircleCI config.
 */
export type CircleCIConfigShape = {
  version: ConfigVersion;
  setup: boolean;
  parameters?: Record<string, ParameterShape>;
  executors?: ReusableExecutorsShape;
  orbs?: OrbImportsShape;
  jobs: JobsShape;
  commands?: ReusableCommandShape;
  workflows: WorkflowsShape;
};

export type UnknownConfigShape = {
  setup: boolean;
  orbs?: Record<string, unknown>;
  executors?: Record<string, unknown>;
  jobs: Record<string, unknown>;
  commands?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  workflows: Record<string, unknown>;
};

export type ConfigDependencies = {
  jobList: Job[];
  workflows: Workflow[];
  executorList?: ReusableExecutor[];
  commandList?: ReusableCommand[];
  parameterList?: CustomParametersList<AnyParameterLiteral>;
};

export { mapping, Generable };
