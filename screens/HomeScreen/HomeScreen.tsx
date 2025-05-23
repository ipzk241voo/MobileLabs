import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import * as FileSystem from "expo-file-system";
import { Smartphone } from "lucide-react-native";
import { StorageButton } from "./components/StorageButton";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const appDataDir = FileSystem.documentDirectory + "AppData";
  const [totalSpace, setTotalSpace] = useState<number | null>(null);
  const [freeSpace, setFreeSpace] = useState<number | null>(null);

  useEffect(() => {
    const prepareStorage = async () => {
      const dirInfo = await FileSystem.getInfoAsync(appDataDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(appDataDir, {
          intermediates: true,
        });
      }

      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      setTotalSpace(total);
      setFreeSpace(free);
    };

    prepareStorage();
  }, []);

  const usedPercentage =
    totalSpace && freeSpace
      ? Math.round(((totalSpace - freeSpace) / totalSpace) * 100)
      : 0;

  const handleMainStorage = () => {
    navigation.navigate("MainStorage" as never);
  };

  return (
    <Container>
      <Header>
        <Title>File Explorer</Title>
        {totalSpace === null || freeSpace === null ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <StorageInfo>
            <Percentage>{usedPercentage}%</Percentage>
            <Text style={{ color: "#b8c1ec" }}>Main storage</Text>
            <Text style={{ color: "#b8c1ec" }}>
              {((totalSpace - freeSpace) / 1e9).toFixed(1)} GB /{" "}
              {(totalSpace / 1e9).toFixed(1)} GB
            </Text>
            <StorageBar>
              <StorageFill width={`${usedPercentage}%`} />
            </StorageBar>
          </StorageInfo>
        )}
      </Header>

      <ButtonWrapper>
        <StorageButton
          label="Main storage"
          Icon={Smartphone}
          color="#eebbc3"
          onPress={handleMainStorage}
        />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #16161a;
`;

const Header = styled.View`
  background-color: #232946;
  padding: 40px 16px 28px 16px;
  align-items: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  elevation: 6;
`;

const Title = styled.Text`
  color: #eebbc3;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 1.5px;
`;

const StorageInfo = styled.View`
  align-items: center;
`;

const Percentage = styled.Text`
  font-size: 28px;
  color: #eebbc3;
  font-weight: bold;
`;

const StorageBar = styled.View`
  height: 8px;
  width: 220px;
  background-color: #393a4c;
  border-radius: 4px;
  margin-top: 10px;
`;

const StorageFill = styled.View<{ width: string }>`
  height: 100%;
  width: ${(props) => props.width};
  background-color: #eebbc3;
  border-radius: 4px;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 48px;
`;
