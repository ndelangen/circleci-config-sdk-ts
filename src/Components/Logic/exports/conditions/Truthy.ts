import { GenerableEnum } from '../../../../Config/exports/Mapping';
import { ConditionValue } from '../../types';
import { Condition } from '../Condition';

export class Truthy extends Condition {
  constructor(private value?: ConditionValue | undefined) {
    super();
  }

  evaluate(): boolean {
    if (this.value) {
      return true;
    }

    return false;
  }

  generate(): ConditionValue | undefined {
    return this.value;
  }

  get generableType(): GenerableEnum {
    return GenerableEnum.TRUTHY;
  }
}
