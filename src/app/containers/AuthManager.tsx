import * as React from 'react';
import {inject, observer} from "mobx-react";
import {Route, Switch} from 'react-router-dom';
import {
  Home,
  GameScreen,
  GameSetting
} from "../pages";
import playerStore from "../stores/playerStore";
// TEST REF COUNTER
/* Home & gamescreen & gamesetting 화면 분기 */

export interface AuthManagerProps {
  isAuth?: boolean;
}

@inject('playerStore')
@observer
export class AuthManager extends React.Component<AuthManagerProps> {

  render() {
    // const { playerStore, scoreStore } = this.props;
    console.log('AuthManager render');
    return (

      <div>
        <Switch>
          {/*exact = exactly*/}
          <Route exact path="/" component={Home}/>
          <Route exact path="/setting" component={() => <GameSetting />}/>
          <Route exact path="/screen" component={() => <GameScreen />}/>
          <Route render={({location}) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              {/*<p>{location.pathname}</p>*/}
            </div>
          )}/>
        </Switch>

      </div>
    );
  }
}

// 20200906_1
// <div>
//
//     {this.props.isAuth ? <b>auth</b> : null}
//     {/* 삼항연산자 */}
//
//     {/*<CountButton />*/}
//     <GameSetting />
//
//     {/* 쿼리 OR 파라미터 타입으로 URL 호출 */}
//
// </div>