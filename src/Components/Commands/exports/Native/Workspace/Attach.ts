import { GenerableEnum } from '../../../../../Config/exports/Mapping';
import { type StringParameter } from '../../../../Parameters/types';
import {
  type CommandParameters,
  type CommandShape,
} from '../../../types/Command.types';
import { type Command } from '../../Command';
/**
 * Special step used to attach the workflow’s workspace to the current container. The full contents of the workspace are downloaded and copied into the directory the workspace is being attached at.
 * @see {@link https://circleci.com/docs/configuration-reference#attachworkspace}
 */
export class Attach implements Command {
  parameters: AttachParameters;
  constructor(parameters: AttachParameters) {
    this.parameters = parameters;
  }
  /**
   * Generate Save.cache Command shape.
   * @returns The generated JSON for the Save.cache Commands.
   */
  generate(): AttachCommandShape {
    return {
      attach_workspace: { ...this.parameters },
    };
  }

  get name(): StringParameter {
    return 'attach_workspace';
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.ATTACH;
  }
}

/**
 * Generated Shape of the Attach command.
 */
interface AttachCommandShape extends CommandShape {
  attach_workspace: AttachParameters;
}

/**
 * Command parameters for the Attach command
 */
export interface AttachParameters extends CommandParameters {
  /**
   * Directory to attach the workspace to.
   */
  at: StringParameter;
}
