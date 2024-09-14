import React, { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StyledInputWrapper from "../../styles/common.styles";

const SearchBar = ({
  onSearch,
  placeholder,
}: {
  onSearch: (query: string) => void;
  placeholder: string;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        icon={<SearchOutlined />}
        onClick={toggleDropdown}
        style={{ border: "none", background: "transparent" }}
      />

      {isDropdownVisible && (
        <StyledInputWrapper>
          <Input
            value={searchValue}
            onChange={handleChange}
            placeholder={placeholder}
            style={{ width: "100%" }}
            allowClear
          />
        </StyledInputWrapper>
      )}
    </div>
  );
};

export default SearchBar;