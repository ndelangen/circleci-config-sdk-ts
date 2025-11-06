import { type Generable } from '../..';
import { GenerableEnum } from '../../../Config/exports/Mapping';
import { CustomParametersList } from '../../Parameters';
import { type Parameterized } from '../../Parameters/exports/Parameterized';
import { type ExecutorParameterTypes } from '../../Parameters/types/ComponentParameters.types';
import { type ExecutorParameterLiteral } from '../../Parameters/types/CustomParameterLiterals.types';
import {
  ReusableExecutorJobRefShape,
  ReusableExecutorsShape,
} from '../types/ReusableExecutor.types';
import { Executor } from './Executor';
import { ReusedExecutor } from './ReusedExecutor';
/**
 * A 2.1 wrapper for reusing CircleCI executor.
 * @see {@link https://circleci.com/docs/2.0/reusing-config/#the-executors-key}
 * {@label STATIC_2.1}
 */
export class ReusableExecutor
  implements Generable, Parameterized<ExecutorParameterLiteral>
{
  /**
   * The name of a defined executor to use.
   */
  name: string;

  /**
   * The referenced executor to use.
   */
  executor: Executor;

  /**
   * Parameters to assign to the executor
   */
  parameters?: CustomParametersList<ExecutorParameterLiteral>;

  constructor(
    name: string,
    executor: Executor,
    parameters?: CustomParametersList<ExecutorParameterLiteral>
  ) {
    this.name = name;
    this.executor = executor;
    this.parameters = parameters;
  }
  /**
   * Generate Reusable Executor schema.
   * @returns The generated JSON for the Reusable Executor.
   */
  generate(): ReusableExecutorsShape | ReusableExecutorJobRefShape {
    return {
      [this.name]: {
        ...this.executor.generate(),
        parameters: this.parameters?.generate(),
      },
    };
  }

  defineParameter(
    name: string,
    type: ExecutorParameterLiteral,
    defaultValue?: unknown,
    description?: string,
    enumValues?: string[]
  ): ReusableExecutor {
    if (!this.parameters) {
      this.parameters = new CustomParametersList<ExecutorParameterLiteral>();
    }

    this.parameters.define(name, type, defaultValue, description, enumValues);

    return this;
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.REUSABLE_EXECUTOR;
  }

  reuse(parameters?: Record<string, ExecutorParameterTypes>): ReusedExecutor {
    return new ReusedExecutor(this, parameters);
  }
}
