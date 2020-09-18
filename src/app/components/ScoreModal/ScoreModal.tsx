import * as React from 'react';
import './ScoreModalModule.css';
import {observer} from "mobx-react";

interface ScoreModalProps {
    onClose: any;
}

@observer
export class ScoreModal extends React.Component<ScoreModalProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(this.props.onClose, 1000);
    }

    render() {

        const {onClose} = this.props;

        return (
            <div className={"score_modal"}>
                <img src="./../../../../public/strike.png"/>
            </div>
        );
    }
}
