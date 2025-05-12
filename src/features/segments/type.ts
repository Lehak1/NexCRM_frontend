export type Operator = ">" | "<" | "=" | ">=" | "<=";

export interface Condition {
  field: "totalSpend" | "visitCount" | "lastActiveDate";
  operator: Operator;
  value: number | string;
}

export interface RuleGroup {
  conditions: Condition[];
  combinator: "AND" | "OR";
}
