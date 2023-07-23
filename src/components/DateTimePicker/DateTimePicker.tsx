import { FC } from "react";
import { StyledDateTimePicker, ReactIcon} from './DateTimePicker.styles';
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { FaCalendarDays } from "react-icons/fa6";
export const DateTimePicker: FC<{date:Date, onChange(value: Value): void}> = ({date, onChange}) => {
    return (
      <StyledDateTimePicker
        onChange={onChange}
        value={date}
        format="d M yyyy"
        calendarIcon={<ReactIcon><FaCalendarDays size={30}/></ReactIcon>}
        clearIcon={null}
      />
    );
  };
  