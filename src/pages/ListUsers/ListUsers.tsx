import React from "react";
import CustomTable from "../../components/CustomTable";

const ListUsers = () => {
  const userColumns = [
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "lasttName",
      title: "Last Name",
      dataIndex: "lasttName",
    },
    {
      key: "maidenName",
      title: "Madiden Name",
      dataIndex: "maidenName",
    },
    {
      key: "userName",
      title: "User Name",
      dataIndex: "userName",
    },
    {
      key: "age",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "Gender",
      title: "Gender",
      dataIndex: "Gender",
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
    }
  ];
  return (
    <>
      <CustomTable columns={userColumns} dataSources={[]} totalData={0}  />
    </>
  );
};

export default ListUsers;
