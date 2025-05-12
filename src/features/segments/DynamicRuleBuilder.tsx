// features/segments/DynamicRuleBuilder.tsx

import React from "react";
import type { Condition } from "./type";

interface Props {
  rules: Condition[];
  setRules: React.Dispatch<React.SetStateAction<Condition[]>>;
  combinator: "AND" | "OR";
  setCombinator: React.Dispatch<React.SetStateAction<"AND" | "OR">>;
}

const fields = ["totalSpend", "visitCount", "lastActiveDate"];
const operators = [">", "<", "=", ">=", "<="];

const DynamicRuleBuilder: React.FC<Props> = ({ rules, setRules, combinator, setCombinator }) => {
  const handleChange = (
    index: number,
    key: keyof Condition,
    value: string | number
  ) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [key]: value };
    setRules(updated);
  };

  const addCondition = () => {
    setRules((prev) => [...prev, { field: "totalSpend", operator: ">", value: 0 }]);
  };

  const removeCondition = (index: number) => {
    const updated = [...rules];
    updated.splice(index, 1);
    setRules(updated);
  };

  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="mb-4">
        <label className="mr-2 font-medium">Combinator:</label>
        <select
          value={combinator}
          onChange={(e) => setCombinator(e.target.value as "AND" | "OR")}
          className="border p-1 rounded"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {rules.map((rule, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <select
            value={rule.field}
            onChange={(e) => handleChange(index, "field", e.target.value)}
            className="border p-1 rounded"
          >
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          <select
            value={rule.operator}
            onChange={(e) => handleChange(index, "operator", e.target.value)}
            className="border p-1 rounded"
          >
            {operators.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

          <input
            type={rule.field === "lastActiveDate" ? "date" : "number"}
            value={rule.value}
            onChange={(e) =>
              handleChange(index, "value", rule.field === "lastActiveDate" ? e.target.value : +e.target.value)
            }
            className="border p-1 rounded w-32"
          />

          <button
            onClick={() => removeCondition(index)}
            type="button"
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addCondition}
        type="button"
        className="mt-2 text-blue-600 hover:underline"
      >
        + Add Condition
      </button>
    </div>
  );
};

export default DynamicRuleBuilder;
