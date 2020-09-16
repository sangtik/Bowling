import * as React from 'react'; // 리액트 사용시 필요
import {inject, observer} from "mobx-react";
import {Link, NavLink} from "react-router-dom";
import playerStore from "../stores/playerStore";
import scoreStore from "../stores/scoreStore";
import "./GameSetting.module.css"


// 게임설정화면
@inject('playerStore', 'scoreStore')
@observer
export class GameSetting extends React.Component {
    // static defaultProps: { name: string };

    // {/* 1-3(?). MobX를 통한 값 제어(?) */}
    // {/* Observable State 만들기 */}
    playerNumberAlert = () => {
        alert('1~4의 인원으로 설정해주세요.');
    }

    getPlayerNumber = () => {
        return playerStore.number;
    }

    increaseNumber = () => {
        return playerStore.increaseNumber;
    }

    decreaseNumber = () => {
        return playerStore.decreaseNumber;
    }


    render() {
        // const {name} = this.props;
        // const playerStore = this.props.playerStore;
        console.log("GameSetting render in app");
        const player_number: number = this.getPlayerNumber();

        return (
            <div className={"set_frame"}>
                {/* 1-1. 템플릿 생성 및 호출(일단은 임시로 여기서 작성) */}

                <div className={"set_title"}> Bowling Game</div>
                <div className={"set_contents"}> Player Count : {player_number}

                    <button className={"up_btn"} onClick={playerStore.increaseNumber}>+1</button>
                    <button className={"down_btn"} onClick={playerStore.decreaseNumber}>-1</button>
                </div>
                {player_number >= 1 && player_number <= 4 ?
                    (
                    <button className={"start_btn"} onClick={() => scoreStore.setPlayerNum(player_number)}>
                        <Link to="/screen" className={"start_link"}>GameStart</Link>
                    </button>)
                    :
                    (
                    <button className={"start_btn"} onClick={this.playerNumberAlert}>
                        <Link to="/" className={"start_link"}>GameStart</Link>
                    </button>)
                }

            </div>
        );
    }
}

// GameSetting.defaultProps = {
//     name: 'no name'
// };