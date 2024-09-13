import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { UserProvider } from "../../context/UserContext";
import SearchInput from "../../components/SearchInput";
import UserFilter from "../../components/UserFilter";
import PageSizeDropDown from "../../components/PageSizeDropDown";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  username: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
  eyeColor: string;
  bloodGroup: string;
  height: number;
  weight: number;
  [key: string]: any; // This index signature allows additional dynamic keys
}


const fetchUserData = async (page: number, limit: number) => {
  const response = await axios.get('https://dummyjson.com/users', {
    params: { limit, skip: (page - 1) * limit },
  });
  return {
    data: response.data.users,
    total: response.data.total,
  };
};

const ListUsers = () => {
  const [searchParams] = useSearchParams();
  const [usersData, setUsersData] = useState<User[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchUserData(page, limit);
      setUsersData(result.data);
      setTotalData(result.total);
      setLoading(false);
    };
    fetchData();
  }, [page, limit]);

  // Columns Definition: Ensure each API field is mapped correctly
  const userColumns = [
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "lastName",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "maidenName",
      title: "Maiden Name",
      dataIndex: "maidenName",
    },
    {
      key: "username",
      title: "User Name",
      dataIndex: "username",
    },
    {
      key: "age",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "gender",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "birthDate",
      title: "Birth Date",
      dataIndex: "birthDate",
    },
    {
      key: "eyeColor",
      title: "Eye Color",
      dataIndex: "eyeColor",
    },
    {
      key: "bloodGroup",
      title: "Blood Group",
      dataIndex: "bloodGroup",
    },
    {
      key: "height",
      title: "Height",
      dataIndex: "height",
    },
    {
      key: "weight",
      title: "Weight",
      dataIndex: "weight",
    },
  ];

  return (
    <>
      <UserProvider>
        <SearchInput />
        <UserFilter />
        <PageSizeDropDown />
        <CustomTable
          columns={userColumns}
          dataSources={usersData}
          totalData={totalData}
          loading={loading}
        />
      </UserProvider>
    </>
  );
};

export default ListUsers;
