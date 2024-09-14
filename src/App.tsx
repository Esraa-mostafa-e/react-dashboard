import React, { useState } from "react";
import { Tabs  } from "antd";
import ListUsers from "./pages/ListUsers";
import ListProducts from "./pages/ListProducts";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

function App() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    navigate("?");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Tabs activeKey={activeTab} onChange={handleTabChange} defaultActiveKey="1">
        <TabPane tab="Users" key="1">
          <ListUsers />
        </TabPane>

        <TabPane tab="Products" key="2">
          <ListProducts />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
