import * as React from 'react';
import playerStore from "../stores/playerStore";
import scoreStore from "../stores/scoreStore";
import {LaneBox} from "../components/LaneBox";
import {inject} from "mobx-react";
import "./GameScreen.module.css"
import {action} from "mobx";
import {FrameLabel} from "../components/FrameLabel";

@inject('playerStore', 'scoreStore')
export class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  all_hit = () => {
    const all_hit:boolean = true;
    scoreStore.hit(all_hit);
  }

  hit = () => {
    const all_hit:boolean = false;
    scoreStore.hit(all_hit);
  }

  render() {

    const player_num = playerStore.getPlayerNumber();
    if (player_num < 1 || player_num > 4) return null;

    const header = Array(10).fill(null);
    const lane = Array(player_num).fill(null);
    const headers = header.map((value, key) => <FrameLabel key={key} f_index={key}>{value}</FrameLabel>);
    const lanes = lane.map((value, key) => <LaneBox key={key} p_index={key}>{value}</LaneBox>);

    return (
      <>
        <div className={"scr_layout"}>
          <div className={"scr_title"}> Bowling Game</div>
          <div className={"scr_subtitle"}> 게임 인원 : {player_num} </div>
          <div className={"scr_number"}>{headers}</div>
          <div className={"scr_contents"}>{lanes}</div>
          <div className={"scr_footer"}>
            <button className={"hit_btn"} onClick={() => this.hit()}> 그냥 치기 </button>
            <button className={"hit_btn"} onClick={() => this.all_hit()}> 모두 처리 </button>
          </div>
        </div>
      </>
    );
  }
}

// GameScreen.defaultProps = {
//     number: 1
// };