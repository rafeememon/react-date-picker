import {DateInput} from "@rafeememon/react-date-picker";
import * as React from "react";

interface IDateInputDemoState {
    date: Date;
}

export class DateInputDemo extends React.PureComponent<{}, IDateInputDemoState> {

    public state = {
        date: new Date(),
    };

    public render() {
        const {date} = this.state;
        return (
            <div>
                Date input:<br />
                <DateInput value={date} onChange={this.handleChange} /><br /><br />
                Date:<br />
                {date.toLocaleDateString()}
            </div>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>, date: Date | null) => {
        if (date != null) {
            this.setState({date});
        }
    }

}
