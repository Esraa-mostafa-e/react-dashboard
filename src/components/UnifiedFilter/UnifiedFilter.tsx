import React, { useState } from "react";
import { Input, Button } from "antd";
import { FilterFieldConfig } from "../../types/filter.types";
import StyledInputWrapper from "../../styles/common.styles";
import { CustomFilterWrapper } from "./UnifiedFilter.styles";

interface UnifiedFilterProps {
  filterFields: FilterFieldConfig[];
  initialState: Record<string, string>;
  onApply: (filters: Record<string, string>) => void;
}

const UnifiedFilter: React.FC<UnifiedFilterProps> = ({
  filterFields,
  initialState,
  onApply,
}) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    ...initialState,
  });
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null);

  const handleFormFilter = (fieldId: string, value: string) => {
    setFilterValues((prevState) => {
      const newFilters = Object.keys(prevState).reduce(
        (acc, key) => {
          if (key === fieldId) {
            acc[key] = value;
          } else {
            acc[key] = "";
          }
          return acc;
        },
        {} as Record<string, string>
      );

      onApply(newFilters);
      return newFilters;
    });
  };

  const toggleVisibility = (fieldId: string) => {
    setVisibleFilter((prevVisible) =>
      prevVisible === fieldId ? null : fieldId
    );
  };

  return (
    <CustomFilterWrapper>
      {filterFields.map((field) => (
        <div key={field.id} style={{ position: "relative" }}>
          <Button
            onClick={() => toggleVisibility(field.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {field.label}
          </Button>

          {visibleFilter === field.id && (
            <StyledInputWrapper>
              <Input
                value={filterValues[field.id] ?? ""}
                placeholder={`Enter ${field.label}`} 
                id={field.id}
                type="text"
                onChange={(e) => handleFormFilter(field.id, e.target.value)}
                allowClear
                style={{ width: "100%" }}
              />
            </StyledInputWrapper>
          )}
        </div>
      ))}
    </CustomFilterWrapper>
  );
};

export default UnifiedFilter;