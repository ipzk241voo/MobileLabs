import React, { useState } from "react";
import styled from "styled-components/native";
import { GetIcon } from "../utils/LoadIcons";

export const TabList = ({ tabList }) => {
  const [activeTab, setActiveTab] = useState(tabList[0] || "");

  const handleTabPress = (tab: string) => setActiveTab(tab);

  const renderTabContent = (tab: string) => {
    const icon = GetIcon(tab, 16, "transparent", "transparent");
    return icon ? icon : tab;
  };

  return (
    <Tabs horizontal showsHorizontalScrollIndicator={false}>
      {tabList.map((tab) => {
        const selected = activeTab === tab;
        return (
          <Tab
            key={tab}
            selected={selected}
            onPress={() => handleTabPress(tab)}
          >
            <TabText>{renderTabContent(tab)}</TabText>
          </Tab>
        );
      })}
    </Tabs>
  );
};

const Tabs = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Tab = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? "#2d6cdf" : props.theme.tabList};
  padding: 12px 18px;
  border-radius: 12px;
  margin-right: 10px;
`;

const TabText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 13px;
`;
