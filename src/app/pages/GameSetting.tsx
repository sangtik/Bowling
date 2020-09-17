import * as React from 'react'; // 리액트 사용시 필요
import {inject, observer} from "mobx-react";
import {Link, NavLink} from "react-router-dom";
import playerStore from "../stores/playerStore";
import scoreStore from "../stores/scoreStore";
import "./GameSetting.module.css"
import {InputModal} from "../components/InputModal";


interface SettingProps {
}

interface SettingState {
    modal: boolean;
}

// 게임설정화면
@inject('playerStore', 'scoreStore')
@observer
export class GameSetting extends React.Component<SettingProps, SettingState> {
    static defaultProps: {};

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    handleOpenModal = () => {
        this.setState({modal: true});
    }

    handleCloseModal = () => {
        this.setState({modal: false});
    }

    increasePlayerNumber = () => {
        playerStore.addPlayer();
    }

    decreasePlayerNumber = () => {
        playerStore.delPlayers();
    }

    playerNumberAlert = () => {
        alert('1~4의 인원으로 설정해주세요.');
    }

    setPlayerNumber = () => {
        scoreStore.setPlayerNum(this.getPlayerNumber());
    }

    getPlayerNumber = () => {
        return playerStore.getPlayerNumber();
    }


    render() {

        console.log("GameSetting render in app");
        const player_number: number = this.getPlayerNumber();

        return (
            <div className={"set_frame"}>
                {/* 1-1. 템플릿 생성 및 호출(일단은 임시로 여기서 작성) */}

                <img src="./../../../public/logo.png"/>

                {/*<div className={"set_title"}> Bowling Game</div>*/}
                <div className={"set_contents"}> Player Count : {this.getPlayerNumber()}

                    <button className={"up_btn"} onClick={this.increasePlayerNumber}>+1</button>
                    <button className={"down_btn"} onClick={this.decreasePlayerNumber}>-1</button>
                </div>
                <div>
                    <button className={"set_btn"} onClick={() => {
                        this.setPlayerNumber();
                        this.handleOpenModal();
                    }}>
                        사용자 설정
                    </button>
                    {this.state.modal && <InputModal onClose={this.handleCloseModal}/>}
                </div>

                {player_number >= 1 && player_number <= 4 ?
                    (
                        <button className={"start_btn"} onClick={this.setPlayerNumber}>
                            <Link to="/screen" className={"start_link"}>GameStart</Link>
                        </button>
                    )
                    :
                    (
                        <button className={"start_btn"} onClick={this.playerNumberAlert}>
                            <Link to="/" className={"start_link"}>GameStart</Link>
                        </button>
                    )
                }

            </div>
        );
    }
}

// GameSetting.defaultProps = {
//     name: 'no name'
// };