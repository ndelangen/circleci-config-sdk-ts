import { GenerableEnum } from '../../../Config/exports/Mapping';

/**
 * Interface for evaluating generable component's properties.
 */
export interface Evaluable<ResultType> {
  evaluate(ctx?: GenerableEnum): ResultType;
}
