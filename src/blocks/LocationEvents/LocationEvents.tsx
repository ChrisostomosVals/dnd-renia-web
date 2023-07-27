import { FC } from "react";
import * as Styled from "./LocationEvents.styles";
import { Typography } from "../../components/Typography/Typography.style";
export const LocationEvents: FC<{ events: string[] }> = ({ events }) => {
  return (
    <>
      {!!events.length ? (
        <Styled.Container>
          <Typography variant="heading1" align="center">Events</Typography>
          {events.map((event, index) => (
            <Styled.Item key={event + index}>
              <Typography variant="paragraphMedium">{event}</Typography>
              <Styled.HorizontalLine/>
            </Styled.Item>
          ))}
        </Styled.Container>
      ) : (
        <Typography variant="paragraphMedium">Nothing Happend here</Typography>
      )}
    </>
  );
};
