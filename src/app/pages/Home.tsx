import * as React from 'react';
import {GameSetting} from "./GameSetting";

export class Home extends React.Component{

    render() {

        console.log("Home render in app");
        return (
            <div>
                {/* Auth 절차 생성 필요*/}
                <GameSetting />
            </div>
        );
    }
}