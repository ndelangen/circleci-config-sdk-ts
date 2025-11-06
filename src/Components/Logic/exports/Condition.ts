import { type Generable } from '../..';
import { type GenerableEnum } from '../../../Config/exports/Mapping';
import { type AnyConditionShape } from '../types';
import { type Evaluable } from './Evaluable';

export abstract class Condition implements Generable, Evaluable<boolean> {
  abstract evaluate(): boolean;
  abstract generate(flatten?: boolean): AnyConditionShape;
  abstract get generableType(): GenerableEnum;
}
