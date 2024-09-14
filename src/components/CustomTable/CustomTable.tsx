import React, { useState, useEffect } from "react";
import { TablePaginationConfig } from "antd";
import {
  CustomTableWrapper,
  FilterWrapper,
  StyledTable,
} from "./CustomTable.styles";
import { ICustomTable } from "./CustomTable.types";
import PageSizeDropDown from "../PageSizeDropDown";
import SearchBar from "../Search";
import UnifiedFilter from "../UnifiedFilter"; // Import UnifiedFilter
import { useSearchParams } from "react-router-dom";

const CustomTable = <T extends {}>({
  columns,
  dataSources,
  totalData,
  placeholder,
  filterFields,
  initialFilterState,
  onApplyFilters,
  onPageChange
}: ICustomTable<T> & {
  filterFields?: { id: string; label: string }[];
  initialFilterState?: Record<string, string>;
  onApplyFilters?: (filters: Record<string, string>) => void;
  onPageChange?: (page: number, pageSize: number) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[] | undefined>(dataSources);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    searchParams.get("limit") ? Number(searchParams.get("limit")) : 5
  );
  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(searchParams.entries())
  );

  useEffect(() => {
    const applyFilters = () => {
      if (dataSources) {
        let filtered = dataSources;

        // Apply client-side filters
        if (Object.keys(filters).length > 0) {
          filtered = filtered.filter((item: any) =>
            Object.entries(filters).every(
              ([key, value]) => {
                const itemValue = item[key];
                return itemValue !== undefined &&
                  itemValue.toString().toLowerCase().includes(value.toLowerCase());
              }
            )
          );
        }

        // Apply search query
        if (searchQuery) {
          filtered = filtered.filter((item: any) =>
            Object.values(item).some((value: any) =>
              value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }

        setFilteredData(filtered);
      }
    };

    applyFilters();
  }, [searchQuery, dataSources, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...newFilters });
    if (onApplyFilters) {
      onApplyFilters(newFilters); // Apply filters to the table data
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      limit: size.toString(),
    });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage, pageSize);
    }
  }, [currentPage, pageSize]);

  const tablePagination: TablePaginationConfig = {
    total: totalData,
    showSizeChanger: false,
    pageSize,
    current: currentPage,
    onChange: (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize);
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page.toString(), limit: pageSize.toString() });
    },
  };

  return (
    <>
      <FilterWrapper>
        <PageSizeDropDown
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        <SearchBar
          onSearch={handleSearch}
          placeholder={placeholder || "Search..."}
        />
        {filterFields && initialFilterState && onApplyFilters && (
          <UnifiedFilter
            filterFields={filterFields}
            initialState={initialFilterState}
            onApply={handleApplyFilters}
          />
        )}
      </FilterWrapper>

      <CustomTableWrapper>
        <StyledTable
          columns={columns}
          dataSource={filteredData}
          pagination={tablePagination}
        />
      </CustomTableWrapper>
    </>
  );
};

export default CustomTable;