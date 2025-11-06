import { GenerableEnum } from '../../../../Config/exports/Mapping';
import { type OrbRef } from '../../../../Orb';
import { type StringParameter } from '../../../Parameters/types';
import { type CommandParameterLiteral } from '../../../Parameters/types/CustomParameterLiterals.types';
import {
  type CommandParameters,
  type CommandShape,
} from '../../types/Command.types';
import { type Command } from '../Command';
import { type ReusableCommand } from './ReusableCommand';

/**
 * Use a reusable command with parameters.
 *
 * {@label STATIC_2.1}
 */
export class ReusedCommand implements Command {
  parameters?: CommandParameters;
  name: StringParameter;

  /**
   * Reuse user defined functionality by adding a reusable command to a job.
   * @param command - A custom command to be reused.
   * @param parameters - the parameters to be passed to the custom command.
   */
  constructor(
    command: ReusableCommand | string | OrbRef<CommandParameterLiteral>,
    parameters?: CommandParameters
  ) {
    this.name = typeof command === 'string' ? command : command.name;
    this.parameters = parameters;

    //TODO: Parse that CommandParameters parameters do exist on ReusableCommand
  }

  /**
   * @returns JSON representation of the reusable command being called
   */
  generate(): CommandShape | string {
    if (this.parameters === undefined) {
      return this.name;
    }

    return {
      [this.name]: this.generateContents(),
    };
  }

  generateContents(): CommandParameters {
    return { ...this.parameters };
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.REUSED_COMMAND;
  }
}
