import * as React from 'react';
import {FrameBox} from "../FrameBox";
import "./LaneBox.module.css"
import {inject, observer} from "mobx-react";
import scoreStore from "../../stores/scoreStore";

interface LaneProps {
  p_index: number;
}

@inject('scoreStore')
@observer
export class LaneBox extends React.Component<LaneProps> {
  constructor(props) {
    super(props);
  }

  getTotalScore = (p_index:number) => {
    return scoreStore.getTotal(p_index);
  }

  render() {
    const p_index = this.props.p_index;
    const frame_max_num: number = 10;
    const frames = Array(frame_max_num).fill(null);
    const frame_list = frames.map((value, key) => <FrameBox key={key} p_index={p_index} f_index={key}>{value}</FrameBox>);
    const total_score = this.getTotalScore(p_index);

    return (
      <div>
        {/*<div className={"layout"}>*/}
        {/*<div className={"normal"}> {p_index + 1}P</div>*/}
        {
          {} ?
            <div className={"turn_active"}> {p_index + 1}P </div>
            :
            <div className={"turn_normal"}> {p_index + 1}P </div>
        }
        {/*<div className={"contents"}><FrameBox   p_index={0} f_index={0} /></div>*/}

        <div className={"contents"}> {frame_list} </div>
        <div className={"total_box"}> {total_score} </div>


      </div>
    );
  }
}

//
// <div className={"lane_box"}>
//   <div className={"lane_player"}> A{p_index + 1} </div>
//   <div>
//     <div className={"lane_header"}>{header_list}</div>
//     <div className={"lane_frame"}>{frame_list}</div>
//   </div>
//   {/*<div style={tempStyle}></div>*/}
//   <div className={"lane_total"}> TOTAL SCORE : 1</div>
// </div>