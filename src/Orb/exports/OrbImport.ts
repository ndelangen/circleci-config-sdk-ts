import { type Generable } from '../../Components';
import { type CustomParametersList } from '../../Components/Parameters';
import {
  type AnyParameterLiteral,
  type CommandParameterLiteral,
  type ExecutorParameterLiteral,
  type JobParameterLiteral,
} from '../../Components/Parameters/types/CustomParameterLiterals.types';
import { GenerableEnum } from '../../Config/exports/Mapping';
import {
  type OrbDisplayMeta,
  type OrbImportManifest,
} from '../types/Orb.types';
import { OrbRef } from './OrbRef';

/**
 * A reference to an imported Orb.
 * {@label STATIC_2.1}
 */
export class OrbImport implements Generable {
  alias: string;
  namespace: string;
  name: string;
  version: string;

  jobs: Record<string, OrbRef<JobParameterLiteral>> = {};
  commands: Record<string, OrbRef<CommandParameterLiteral>> = {};
  executors: Record<string, OrbRef<ExecutorParameterLiteral>> = {};

  description?: string;
  display?: OrbDisplayMeta;

  constructor(
    alias: string,
    namespace: string,
    orb: string,
    version: string,
    description?: string,
    manifest?: OrbImportManifest,
    display?: OrbDisplayMeta
  ) {
    this.alias = alias;
    this.namespace = namespace;
    this.name = orb;
    this.version = version;
    this.description = description;
    this.display = display;

    if (manifest) {
      this.jobs = asImportManifest(manifest.jobs, this);
      this.commands = asImportManifest(manifest.commands, this);
      this.executors = asImportManifest(manifest.executors, this);
    }
  }

  generate(): Record<string, string> {
    return {
      [this.alias]: `${this.namespace}/${this.name}@${this.version}`,
    };
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.ORB_IMPORT;
  }
}

const asImportManifest = <Literal extends AnyParameterLiteral>(
  parameters: Record<string, CustomParametersList<Literal>>,
  orb: OrbImport
): Record<string, OrbRef<Literal>> => {
  const objs = Object.entries(parameters).map(([name, list]) => ({
    [name]: new OrbRef(name, list, orb),
  }));

  return Object.assign({}, ...objs);
};
