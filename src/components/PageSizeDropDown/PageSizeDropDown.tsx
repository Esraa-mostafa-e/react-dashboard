import React from "react";
import { Row, Select } from "antd";
import styled from "styled-components";
import { theme } from "../../styles";

const StyledPageDropdown = styled(Row)`
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  padding-right: 10px;
  border-right: 1px solid ${theme.colors.grayColor};
`;
interface PageSizeDropdownProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const { Option } = Select;

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  const handleChange = (value: number) => {
    onPageSizeChange(value);
  };

  return (
    <>
      <StyledPageDropdown>
        <span>Entries</span>
        <Select value={pageSize} onChange={handleChange} style={{ width: 70 }}>
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
        </Select>
      </StyledPageDropdown>
    </>
  );
};

export default PageSizeDropdown;