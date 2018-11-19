import formatDate from "date-fns/esm/format";
import parseDate from "date-fns/esm/parse";
import * as React from "react";
import {isSameDay, Omit} from "./util";

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface IDateInputProps extends Omit<InputProps, "value" | "onChange"> {
    value?: Date | null;
    dateFormat?: string;
    onChange?(event: React.ChangeEvent<HTMLInputElement>, date: Date | null): void;
}

export interface IDateInputState {
    text: string | undefined;
    focused: boolean;
}

export const DEFAULT_DATE_FORMAT = "M/d/yyyy";

export class DateInput extends React.PureComponent<IDateInputProps, IDateInputState> {

    public state = {
        text: this.getText(),
        focused: false,
    };

    public componentDidUpdate(prevProps: IDateInputProps) {
        if (!isSameDay(this.props.value, prevProps.value) && !this.state.focused) {
            this.setState({text: this.getText()});
        }
    }

    public render() {
        return (
            <input
                {...this.props}
                value={this.state.text}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            />
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {dateFormat, onChange} = this.props;
        const text = event.target.value;
        const date = parseDate(text, dateFormat || DEFAULT_DATE_FORMAT, new Date());
        const dateOrNull = !isNaN(date.valueOf()) ? date : null;
        if (onChange) {
            onChange(event, dateOrNull);
        }
        if (!event.isDefaultPrevented()) {
            this.setState({text});
        }
    }

    private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const {onFocus} = this.props;
        if (onFocus) {
            onFocus(event);
        }
        if (!event.isDefaultPrevented()) {
            this.setState({focused: true});
        }
    }

    private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const {onBlur} = this.props;
        if (onBlur) {
            onBlur(event);
        }
        if (!event.isDefaultPrevented()) {
            this.setState({
                text: this.getText(),
                focused: false,
            });
        }
    }

    private getText() {
        const {value, dateFormat} = this.props;
        return value ? formatDate(value, dateFormat || DEFAULT_DATE_FORMAT) : undefined;
    }

}
