import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import fetchUserData from "../../apis/Users";
import { UserProvider } from "../../context/UserContext";
import { useSearchParams } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import { User } from "../../types/users.types";


const ListUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersData, setUsersData] = useState<User[]>([]);
  const [totalData, setTotalData] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const email = searchParams.get("email") || "";
  const firstName = searchParams.get("firstName") || "";
  const gender = searchParams.get("gender") || "";
  const birthDate = searchParams.get("birthDate") || "";

  const filters: Record<string, string> = {};
  if (email) filters.email = email;
  if (firstName) filters.firstName = firstName;
  if (gender) filters.gender = gender;
  if (birthDate) filters.birthDate = birthDate;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchUserData({ page, limit, filters });
      setUsersData(result.data);
      setTotalData(result.total);
    };
    fetchData();
  }, [page, limit, filters]);

  const userColumns = [
    { key: "firstName", title: "First Name", dataIndex: "firstName" },
    { key: "lastName", title: "Last Name", dataIndex: "lastName" },
    { key: "username", title: "User Name", dataIndex: "username" },
    { key: "age", title: "Age", dataIndex: "age" },
    { key: "gender", title: "Gender", dataIndex: "gender" },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "phone", title: "Phone", dataIndex: "phone" },
    { key: "birthDate", title: "Birth Date", dataIndex: "birthDate" },
    { key: "height", title: "Height", dataIndex: "height" },
    { key: "weight", title: "Weight", dataIndex: "weight" },
  ];

  const userFilterFields = [
    { id: "firstName", type: "Text", label: "Name" },
    { id: "email", type: "Text", label: "Email" },
    { id: "gender", type: "Text", label: "Gender" },
    { id: "birthDate", type: "Text", label: "Birth Date" },
  ];

  const userInitialState = { firstName: "", email: "", gender: "", birthDate: "" };

  const handleApplyFilters = (filters: Record<string, string>) => {
    setSearchParams(filters);
  };

  return (
    <UserProvider>
        <Breadcrumb style={{ margin: '30px 0 50px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item ><span  style={{
              borderBottom:  "8px solid #fdc936",
            }}>Users</span></Breadcrumb.Item>
      </Breadcrumb>
      <CustomTable
        columns={userColumns}
        dataSources={usersData}
        totalData={totalData}
        placeholder="Search users..."
        filterFields={userFilterFields} // Pass filterFields
        initialFilterState={userInitialState} // Pass initialFilterState
        onApplyFilters={handleApplyFilters} // Pass onApplyFilters
        />
    </UserProvider>
  );
};

export default ListUsers;