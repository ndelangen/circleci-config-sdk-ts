import { type CustomParametersList } from '..';
import { type Generable } from '../../index';
import { type Config } from '../../../Config';
import { type AnyParameterLiteral } from '../types/CustomParameterLiterals.types';

/**
 * Interface implemented on components to enforce parameter functionality.
 * {@label STATIC_2.1}
 */
export interface Parameterized<
  ParameterTypeLiteral extends AnyParameterLiteral,
> {
  parameters?: CustomParametersList<ParameterTypeLiteral>;

  defineParameter(
    name: string,
    type: ParameterTypeLiteral,
    defaultValue?: unknown,
    description?: string,
    enumValues?: string[]
  ): Generable | Config;
}
