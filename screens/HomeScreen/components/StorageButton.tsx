import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LucideIcon } from "lucide-react-native";

interface Props {
  label: string;
  Icon: LucideIcon;
  color: string;
  onPress?: () => void;
}

export const StorageButton: React.FC<Props> = ({
  label,
  Icon,
  color,
  onPress,
}) => {
  return (
    <ButtonContainer onPress={onPress} activeOpacity={0.8}>
      <IconWrapper>
        <Icon color={color} size={26} />
      </IconWrapper>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: #232946;
  border-radius: 12px;
  padding: 16px 28px;
  margin: 10px 0;
  width: 240px;
  align-self: center;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
`;

const IconWrapper = styled.View`
  margin-right: 18px;
`;

const Label = styled.Text`
  color: #eebbc3;
  font-size: 18px;
  font-weight: 600;
  flex: 1;
  text-align: center;
  letter-spacing: 1px;
`;
