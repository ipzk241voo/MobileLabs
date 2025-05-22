import styled from "styled-components/native";

type ThemedViewProps = {
  padding?: string;
};

const ThemedView = styled.View<ThemedViewProps>`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: ${(props) => props.padding || "20px"};
  height: 100%;
`;

export default ThemedView;
