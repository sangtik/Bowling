import * as React from 'react';
import {FrameBox} from "../FrameBox";
import "./LaneBox.module.css"
import {inject, observer} from "mobx-react";
import scoreStore from "../../stores/scoreStore";
import playerStore from "../../stores/playerStore";

interface LaneState {
    turn: false;
}

interface LaneProps {
    p_index: number;
}

@inject('playerStore', 'scoreStore')
@observer
export class LaneBox extends React.Component<LaneProps, LaneState> {
    constructor(props) {
        super(props);
    }

    getTotalScore = (p_index: number) => {
        return scoreStore.getTotal(p_index);
    }

    turnCheck = (p_index: number): boolean => {
        let turn: boolean = true;
        if (p_index !== scoreStore.p_index) turn = false;
        return turn;
    }

    getRank = () => {
        return scoreStore.getRank(this.props.p_index) + 1;
    }

    getPlayer = () => {
        return playerStore.getPlayers();
    }

    render() {
        const {p_index} = this.props;
        const frame_max_num: number = 10;
        const frames = Array(frame_max_num).fill(null);
        const frame_list = frames.map((value, key) =>
          <FrameBox key={key} p_index={p_index} f_index={key}>{value}</FrameBox>);

        const players = this.getPlayer();
        const player_name = players[p_index];
        const rank = this.getRank();

        return (
          <div>
              {this.turnCheck(p_index) ?
                <div
                  className={"turn_active"}> {(player_name === "" || player_name === null) ? <>{p_index + 1}P</> : <>{players[p_index]}</>} </div>
                :
                <div
                  className={"turn_normal"}> {(player_name === "" || player_name === null) ? <>{p_index + 1}P</> : <>{players[p_index]}</>} </div>
              }

              <div className={"contents"}> {frame_list} </div>
              {/*<div className={"rank_box"}> {this.getRank() + 1}위 </div>*/}

              {rank > 0 ? <div className={"rank_box"}> {rank}위 </div> : <div className={"rank_box"}> {""} </div>}


              <div className={"total_box"}> {this.getTotalScore(p_index)} </div>
          </div>
        );
    }
}