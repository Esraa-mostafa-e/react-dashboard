import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useSearchParams } from "react-router-dom";
import { ProductProvider } from "../../context/ProductsContext";
import fetchProductsData from "../../apis/Products";
import CustomTable from "../../components/CustomTable";
import { Product } from "../../types/products.types";


const ListProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [totalData, setTotalData] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchProductsData({ page, limit });
      setProductsData(result.data);
      setTotalData(result.total);
    };
    fetchData();
  }, [page, limit]);

  const productColumns = [
    { key: "id", title: "Id", dataIndex: "id" },
    { key: "title", title: "Title", dataIndex: "title" },
    { key: "category", title: "Category", dataIndex: "category" },
    { key: "price", title: "Price", dataIndex: "price" },
    { key: "discountPercentage", title: "Discount Percentage", dataIndex: "discountPercentage" },
    { key: "rating", title: "Rating", dataIndex: "rating" },
    { key: "stock", title: "Stock", dataIndex: "stock" },
    { key: "brand", title: "Brand", dataIndex: "brand" },
    { key: "sku", title: "SKU", dataIndex: "sku" },
    { key: "weight", title: "Weight", dataIndex: "weight" },
  ];

  const productFilterFields = [
    { id: "title", type: "Text", label: "Title" },
    { id: "brand", type: "Text", label: "Brand" },
    { id: "category", type: "Text", label: "Category" },
  ];

  const productInitialState = { title: "", brand: "", category: "" };

  const handleApplyFilters = (filters: Record<string, string>) => {
    setSearchParams(filters);
  };

  return (
    <ProductProvider>
        <Breadcrumb style={{ margin: '30px 0 50px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item ><span  style={{
              borderBottom:  "8px solid #fdc936",
            }}>Products</span></Breadcrumb.Item>
      </Breadcrumb>
      <CustomTable
        columns={productColumns as []}
        dataSources={productsData}
        totalData={totalData}
        placeholder="Search products..."
        filterFields={productFilterFields}
        initialFilterState={productInitialState}
        onApplyFilters={handleApplyFilters}
        onPageChange={(page, pageSize) => {
          setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: page.toString(),
            limit: pageSize.toString(),
          });
        }}
      />
    </ProductProvider>
  );
};

export default ListProducts;