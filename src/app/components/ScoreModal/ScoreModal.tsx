import * as React from 'react';
import './ScoreModalModule.css';
import {observer} from "mobx-react";

interface ScoreModalProps {
  onClose: any;
  status: string;
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

    return (
      <>
        {this.props.status === "turkey" &&
            <div className={"score_modal"}><img src="./../../../../public/turkey.png"/></div>
        }
        {this.props.status === "double" &&
            <div className={"score_modal"}><img src="./../../../../public/double.png"/></div>
        }
        {this.props.status === "strike" &&
            <div className={"score_modal"}><img src="./../../../../public/strike.png"/></div>
        }
        {this.props.status === "spare" &&
            <div className={"score_modal"}><img src="./../../../../public/spare.png"/></div>
        }
        {this.props.status === "gutter" &&
            <div className={"score_modal"}><img src="./../../../../public/gutter.png"/></div>
        }
      </>
    );
  }
}
