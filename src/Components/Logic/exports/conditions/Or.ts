import { identityOrTruthy } from '.';
import { GenerableEnum } from '../../../../Config/exports/Mapping';
import { ConditionOrValue, OrConditionShape } from '../../types';
import { Condition } from '../Condition';

/**
 * True if any argument is truthy.
 * @see {@link https://circleci.com/docs/configuration-reference#logic-statements}
 */
export class Or extends Condition {
  conditions: Condition[];

  constructor(conditions: ConditionOrValue[]) {
    super();
    this.conditions = conditions.map(identityOrTruthy);
  }

  evaluate(): boolean {
    for (const condition of this.conditions) {
      if (condition.evaluate()) {
        return true;
      }
    }

    return false;
  }

  generate(): OrConditionShape {
    return { or: this.conditions.map((c) => c.generate()) };
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.OR;
  }
}
