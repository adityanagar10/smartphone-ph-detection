import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Open = styled(SvgXml)`
    flex-direction: row;
`

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;