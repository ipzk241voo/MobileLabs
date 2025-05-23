import styled from "styled-components/native";
import {
  ArrowDownFromLine,
  CheckCircle,
  ChevronsLeft,
  ChevronsRight,
  Circle,
  Fingerprint,
  MapPinCheck,
  MousePointerClick,
  Scaling,
  ScanHeart,
} from "lucide-react-native";

const iconMapping = {
  tenclicks: [Fingerprint, "#FFB300"],
  doubletap: [MousePointerClick, "#42A5F5"],
  longpress: [MapPinCheck, "#AB47BC"],
  drag: [ArrowDownFromLine, "#66BB6A"],
  swiperight: [ChevronsRight, "#FFA726"],
  swipeleft: [ChevronsLeft, "#29B6F6"],
  pinch: [Scaling, "#EC407A"],
  score100: [ScanHeart, "#FF7043"],
};

const getIcon = (iconName) => iconMapping[iconName] || null;

const TaskButton = ({ goalKey, title, subtitle, isChecked, progress }) => {
  const iconData = getIcon(goalKey);
  const Icon = iconData ? iconData[0] : null;
  const iconColor = iconData ? iconData[1] : "#BDBDBD";
  const progressValue = typeof progress === "number"
    ? Math.max(0, Math.min(progress, 100))
    : 0;

  return (
    <Container checked={isChecked} activeOpacity={0.88}>
      <IconCircle>
        {Icon && <Icon color={iconColor} size={28} />}
      </IconCircle>
      <TextContainer>
        <Title>{title}</Title>
        <Subtitle numberOfLines={2}>{subtitle}</Subtitle>
        {progress !== undefined && (
          <>
            <ProgressBarContainer>
              <ProgressBarFill style={{ width: `${progressValue}%` }} />
            </ProgressBarContainer>
            <ProgressText>{progressValue}% виконано</ProgressText>
          </>
        )}
      </TextContainer>
      <StatusContainer>
        {isChecked
          ? <CheckCircle color="#43A047" size={28} />
          : <Circle color="#BDBDBD" size={28} />
        }
      </StatusContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ checked }) => (checked ? "#F5FFF7" : "#F7F8FA")};
  padding: 20px 22px;
  border-radius: 18px;
  margin: 14px 10px;
  border-width: 1.5px;
  border-color: ${({ checked }) => (checked ? "#43A047" : "#E3E7ED")};
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.10;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
`;

const IconCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  box-shadow: 0px 2px 8px rgba(67,160,71,0.08);
`;

const TextContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 19px;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.1px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: #6D7A8A;
  margin-top: 4px;
  font-weight: 400;
`;

const ProgressBarContainer = styled.View`
  width: 100%;
  height: 8px;
  background-color: #e3e7ed;
  border-radius: 4px;
  margin-top: 14px;
  overflow: hidden;
`;

const ProgressBarFill = styled.View`
  height: 100%;
  background-color: #43a047;
  border-radius: 4px;
  transition: width 0.35s;
`;

const ProgressText = styled.Text`
  font-size: 13px;
  color: #388e3c;
  font-weight: 600;
  margin-top: 5px;
  letter-spacing: 0.2px;
`;

const StatusContainer = styled.View`
  margin-left: 18px;
  align-items: center;
  justify-content: center;
`;

export default TaskButton;
