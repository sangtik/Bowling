import * as React from 'react';
import {FrameBox} from "../FrameBox";
import "./LaneBox.module.css"
import {inject, observer} from "mobx-react";
import scoreStore from "../../stores/scoreStore";
import playerStore from "../../stores/playerStore";

interface LaneState {
    turn: boolean;
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
        let turn: boolean = false;
        if (p_index === scoreStore.p_index) {
            turn = true;
        }
        return turn;
    }

    render() {
        const {p_index} = this.props;
        const frame_max_num: number = 10;
        const frames = Array(frame_max_num).fill(null);
        const frame_list = frames.map((value, key) => <FrameBox key={key} p_index={p_index}
                                                                f_index={key}>{value}</FrameBox>);
        const total_score = this.getTotalScore(p_index);
        const players = playerStore.getPlayers();
        const player_name = players[p_index];
        const turn: boolean = this.turnCheck(p_index);

        return (
            <div>
                {/*<div className={"layout"}>*/}
                {/*<div className={"normal"}> {p_index + 1}P</div>*/}
                {/*{*/}
                {/*  {} ?*/}
                {/*    <div className={"turn_active"}> {p_index + 1}P </div>*/}
                {/*    :*/}
                {/*    <div className={"turn_normal"}> {p_index + 1}P </div>*/}
                {/*}*/}
                {/*<div className={"contents"}><FrameBox   p_index={0} f_index={0} /></div>*/}
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