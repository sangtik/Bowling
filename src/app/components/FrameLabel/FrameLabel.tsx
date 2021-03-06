import * as React from 'react';
import "./FrameLabel.module.css"


interface FrameProps {
    f_index: number;
}

export class FrameLabel extends React.Component<FrameProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const {f_index} = this.props;
        return (
            <div className={"label"}>{f_index + 1}F</div>
        );
    }
}
