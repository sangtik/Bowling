import * as React from 'react';
import './InputModalModule.css';
import playerStore from "../../stores/playerStore";
import {inject, observer} from "mobx-react";
// import { IconAI } from "react-icons/ai";

interface InputModalProps {
    onClose: any;
}

@inject('playerStore')
@observer
export class InputModal extends React.Component<InputModalProps> {
    constructor(props) {
        super(props);
    }

    getPlayers = () => {
        return playerStore.getPlayers();
    }

    handleChange = (e) => {
        playerStore.setPlayers(e.target.id, e.target.value);
    }

    render() {

        const {onClose} = this.props;
        // console.log(onClose);

        const players = this.getPlayers();
        console.log(players.length);
        const players_list = players.map((value, key) =>
            <div key={key} id={key}>
                {/*<AiOutlineSmile />*/}
                <label className={"label"}>{key + 1}Player</label>
                {players[key] !== null && players[key] !== "" ?
                    <input className={"input_box"} id={key} defaultValue={players[key]} maxLength={3} onChange={this.handleChange}/>
                    :
                    <input className={"input_box"} id={key} placeholder="플레이어 이름을 입력하세요." maxLength={3} onChange={this.handleChange}/>
                }
            </div>);

        return (

            <div className={"input_modal"}>
                <div className={"content"}>
                    <h3>플레이어 목록</h3>
                    <div>{players_list}</div>
                    <button className={"close_button"} onClick={onClose}>확인</button>
                </div>
            </div>

        );
    }
}
