import { type Generable } from '../..';
import { GenerableEnum } from '../../../Config/exports/Mapping';
import { type AnyConditionShape } from '../types';
import { type Condition } from './Condition';

/**
 * 2.1 Conditional logic class component.
 */
export class When implements Generable {
  condition: Condition;

  constructor(condition: Condition) {
    this.condition = condition;
  }

  generate(): AnyConditionShape {
    return this.condition.generate();
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.WHEN;
  }
}
