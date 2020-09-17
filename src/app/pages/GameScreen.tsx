import * as React from 'react';
import playerStore from "../stores/playerStore";
import scoreStore from "../stores/scoreStore";
import {LaneBox} from "../components/LaneBox";
import {inject} from "mobx-react";
import "./GameScreen.module.css"
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

    const players = playerStore.getPlayers();
    const player_number = playerStore.getPlayerNumber();
    if (player_number < 1 || player_number > 4) return null;

    const frames = Array(10).fill(null);

    const headers = frames.map((value, key) => <FrameLabel key={key} f_index={key}>{value}</FrameLabel>);
    const lanes = players.map((value, key) => <LaneBox key={key} p_index={key}>{value}</LaneBox>);

    return (
      <>
        <div className={"scr_layout"}>
          <div className={"scr_title"}> Bowling Game</div>
          <div className={"scr_subtitle"}> 게임 인원 : {player_number} </div>
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