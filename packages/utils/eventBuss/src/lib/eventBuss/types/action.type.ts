export interface Action<T> {
	  /**
   * The type of the action, typically a string constant.
   */
  type: ActionType;

  /**
   * The payload of the action, which can be any data type.
   */
  payload?: T;

  /**
   * Optional metadata associated with the action.
   */
  meta?: Record<string, any>;
}

export enum ActionType {
	LOGIN
}