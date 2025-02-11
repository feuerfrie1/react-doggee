import React from "react";
import { formatDate } from "../../../../utils/helpers/date/formatDate";
import { useOnClickOutside } from "../../../../utils/helpers/hooks/useOnClickOutside";

import { Calendar } from "../../../Calendar/Calendar";
import Input, { FieldProps, MAX_LENGHT } from "../Input/Input";

import styles from "./DateInput.module.css";

interface DateInputProps extends Omit<FieldProps, "value" | "onChange"> {
  locale?: string;
  value: Date;
  onChange: (date: Date) => void;
}

const getDateStringFormat = (value: string) => {
  const date = value.replaceAll(".", "");
  const day = date.substring(0, 2);
  const month = date.substring(2, 4);
  const year = date.substring(4, 8);
  return { day, month, year };
};

export const DateInput: React.FC<DateInputProps> = ({
  value,
  disabled,
  locale = "default",
  ...props
}) => {
  const inputValue = formatDate(value, "DD.MM.YYYY");
  const calendarContainerRef = React.useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = React.useState(false);

  useOnClickOutside(calendarContainerRef, () => setShowCalendar(false));

  const CalendarIcon = React.useCallback(
    () => (
      <div onClick={() => !disabled && setShowCalendar(!showCalendar)}>
        <div className={styles.calendar_icon} />
      </div>
    ),
    [showCalendar, disabled]
  );

  return (
    <div className={styles.date_input_container}>
      <Input
        components={{ indicator: CalendarIcon }}
        availableChars={/^[0-9.]+$/g}
        disabled={disabled}
        {...props}
        maxLength={MAX_LENGHT.DATE}
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const caretStart = event.target.selectionStart;
          const isDeletedCharIsDot =
            caretStart &&
            event.target.value.length < inputValue.length &&
            inputValue[caretStart] === ".";

          const isAdditingCharIsDot =
            event.target.value.length > inputValue.length &&
            (event.target.value.replaceAll(".", "").length % 3 === 0 ||
              event.target.value.replaceAll(".", "").length % 5 === 0);

          const { year, month, day } = getDateStringFormat(
            isDeletedCharIsDot
              ? event.target.value.slice(0, caretStart - 1) +
                  event.target.value.slice(caretStart)
              : event.target.value
          );

          props.onChange(new Date(+year, +month - 1, +day));

          const updateCaret = (caretStart: number) =>
            window.requestAnimationFrame(() => {
              event.target.selectionStart = caretStart;
              event.target.selectionEnd = caretStart;
            });

          if (isAdditingCharIsDot && !!caretStart) {
            return updateCaret(caretStart + 1);
          }

          if (isDeletedCharIsDot && !!caretStart) {
            return updateCaret(caretStart - 1);
          }

          updateCaret(caretStart ?? 0);
        }}
      />
      {showCalendar && (
        <div ref={calendarContainerRef} className={styles.calendar_container}>
          <Calendar
            locale={locale}
            selectDate={props.onChange}
            selectedDate={value}
          />
        </div>
      )}
    </div>
  );
};
