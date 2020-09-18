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
        if (p_index !== scoreStore.p_index) {
            turn = false;
        }
        return turn;
    }

    render() {
        const {p_index} = this.props;
        const frame_max_num: number = 10;
        const frames = Array(frame_max_num).fill(null);
        const frame_list = frames.map((value, key) =>
          <FrameBox key={key} p_index={p_index} f_index={key}>{value}</FrameBox>);
        const total_score = this.getTotalScore(p_index);
        const players = playerStore.getPlayers();
        const player_name = players[p_index];
        const turn: boolean = this.turnCheck(p_index);
        console.log("RENDER TURN : " + turn + " P_INDEX : " + p_index);

        return (
          <div>
              {turn ?
                <div
                  className={"turn_active"}> {(player_name === "" || player_name === null) ? <>{p_index + 1}P</> : <>{players[p_index]}</>} </div>
                :
                <div
                  className={"turn_normal"}> {(player_name === "" || player_name === null) ? <>{p_index + 1}P</> : <>{players[p_index]}</>} </div>
              }

              <div className={"contents"}> {frame_list} </div>
              <div className={"total_box"}> {total_score} </div>
          </div>
        );
    }
}