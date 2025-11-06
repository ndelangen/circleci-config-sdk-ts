import { type Generable } from '../../..';
import { GenerableEnum } from '../../../../Config/exports/Mapping';
import { CustomParametersList } from '../../../Parameters';
import { type Parameterized } from '../../../Parameters/exports/Parameterized';
import { type CommandParameterLiteral } from '../../../Parameters/types/CustomParameterLiterals.types';
import {
  type AnyCommandShape,
  type CommandParameters,
  type ReusableCommandBodyShape,
  type ReusableCommandShape,
} from '../../types/Command.types';
import { type Command } from '../Command';
import { ReusedCommand } from './ReusedCommand';

/**
 * Define a custom Command with custom parameters
 * {@label STATIC_2.1}
 */
export class ReusableCommand
  implements Generable, Parameterized<CommandParameterLiteral>
{
  /**
   * Name used to reference this command definition from command steps.
   */
  name: string;
  /**
   * Steps this command will execute when called.
   */
  steps: Command[];
  /**
   * Custom list of parameters that can be used when calling this command.
   */
  parameters?: CustomParametersList<CommandParameterLiteral>;

  /**
   * A string that describes the purpose of the command
   */
  description?: string;

  constructor(
    name: string,
    steps?: Command[],
    parameters?: CustomParametersList<CommandParameterLiteral>,
    description?: string
  ) {
    this.name = name;
    this.steps = steps || [];
    this.parameters = parameters;
    this.description = description;
  }

  generate(flatten?: boolean): ReusableCommandShape {
    return {
      [this.name]: this.generateContents(flatten),
    };
  }

  generateContents(flatten?: boolean): ReusableCommandBodyShape {
    const generatedSteps: AnyCommandShape[] = this.steps.map((step) =>
      step.generate(flatten)
    );

    return {
      parameters: this.parameters?.generate(),
      steps: generatedSteps,
      description: this.description,
    };
  }

  /**
   * @param parameters - The parameters to be passed to the command.
   * @returns A parameterized implementation of this command.
   */
  toReused(parameters?: CommandParameters): ReusedCommand {
    return new ReusedCommand(this, parameters);
  }

  addStep(step: Command): ReusableCommand {
    this.steps.push(step);

    return this;
  }

  defineParameter(
    name: string,
    type: CommandParameterLiteral,
    defaultValue?: unknown,
    description?: string,
    enumValues?: string[]
  ): ReusableCommand {
    if (!this.parameters) {
      this.parameters = new CustomParametersList<CommandParameterLiteral>();
    }

    this.parameters.define(name, type, defaultValue, description, enumValues);

    return this;
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.REUSABLE_COMMAND;
  }
}
