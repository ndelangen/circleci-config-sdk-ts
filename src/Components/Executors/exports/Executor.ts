import { GenerableEnum } from '../../../Config/exports/Mapping';
import { type Generable } from '../../index';
import { type CustomParametersList } from '../../Parameters';
import { type ExecutorParameterLiteral } from '../../Parameters/types/CustomParameterLiterals.types';
import {
  AnyResourceClass,
  type ExecutorLiteral,
  ExecutorShape,
} from '../types/Executor.types';
import { ReusableExecutor } from './ReusableExecutor';

/**
 * A generic reusable Executor.
 */
export abstract class Executor<
  ResourceClass extends AnyResourceClass = AnyResourceClass,
> implements Generable
{
  resource_class: ResourceClass;

  /**
   * @param resource_class - The resource class of the environment
   * @param parameters - Optional parameters to describe the executable environment
   */
  constructor(resource_class: ResourceClass) {
    this.resource_class = resource_class;
  }
  abstract get generableType(): GenerableEnum;
  abstract get executorLiteral(): ExecutorLiteral;
  abstract generateContents(): unknown;
  get generateResourceClass(): ResourceClass | string {
    return this.resource_class;
  }

  generate(): ExecutorShape {
    return {
      [this.executorLiteral]: this.generateContents(),
      resource_class: this.generateResourceClass,
    };
  }

  toReusable(
    name: string,
    parameters?: CustomParametersList<ExecutorParameterLiteral>
  ): ReusableExecutor {
    return new ReusableExecutor(name, this, parameters);
  }
}
