import * as React from 'react';
import "./FrameBox.module.css"
import {inject, observer} from "mobx-react";
import scoreStore from "../../stores/scoreStore";

interface FrameProps {
  p_index: number,
  f_index: number;
}

@inject('scoreStore')
@observer
export class FrameBox extends React.Component<FrameProps> {
// 점수 기록 컴포넌트를 관리
    constructor(props) {
        super(props);
    }

    blankCheck = (first_score: number, second_score: number, frame_total: number) => {
        // 토탈 스코어 안보이는 조건
        let blank: boolean = false;
        if (second_score === null) blank = true; // 아직 치기 전
        // else if (f_index === 9 && third_score === null) blank = true; // 아직 치기 전
        else if (frame_total === null || frame_total < 0) blank = true;
        return blank;
    }

    getScore = (p_index: number, f_index: number) => {
        // 프레임 첫번째 두번째 점수 가져오기
        let score = {first_score: null, second_score: null, third_score: null};
        score.first_score = scoreStore.scores[p_index][(f_index * 2)];
        score.second_score = scoreStore.scores[p_index][(f_index * 2) + 1];
        if (f_index === 9 && scoreStore.scores[p_index][(f_index * 2) + 2] !== null) score.third_score = scoreStore.scores[p_index][(f_index * 2) + 2];
        return score;
    }

    getFrameTotalScore = (p_index: number, f_index: number) => {
        // 프레임 총점 가져오기
        return scoreStore.getFrameTotal(p_index, f_index);
    }

    getStatus = (first_score: number, second_score: number) => {
        // 프레임 상태 가져오기
        let status: string = "";
        if (first_score == 10) status = "strike";
        else if (first_score + second_score == 10) status = "spare";
        else status = "none";
        return status;
    }

    getStatus10F = (first_score: number, second_score: number, third_score: number) => {
        // 프레임 상태 가져오기
        let status: any = {first: "", second: ""};
        if (first_score === 10 && second_score == 10 && third_score == 10) {
            status.first = "turkey";
            status.second = "none";
        } else if (first_score == 10 && second_score == 10) {
            status.first = "double";
            status.second = "none";
        } else if (first_score == 10) {
            status.first = "strike";
            (second_score + third_score === 10) ? status.second = "spare" : status.second = "none";
        } else if (first_score + second_score == 10) {
            status.first = "spare";
            (third_score === 10) ? status.second = "strike" : status.second = "none";
        } else {
            status.first = "none";
            status.second = "none";
        }
        console.log("status.first : [" + status.first + "] status.first : [" + status.second + "]");
        return status;
    }

    render() {
        const {p_index, f_index} = this.props;
        const {first_score, second_score, third_score} = this.getScore(p_index, f_index);
        const frame_total = this.getFrameTotalScore(p_index, f_index);
        const blank = this.blankCheck(first_score, second_score, frame_total);
        console.log("first_score, second_score, third_score : " + first_score + " " + second_score + " " + third_score);
        let status = (f_index < 9) ? this.getStatus(first_score, second_score) : this.getStatus10F(first_score, second_score, third_score);

        // console.log("p_index : " +p_index + " f_index : " + f_index + " Total : " + frame_total);

        return (
            <>
                <div className={"frame_layout"}>
                    <div className={"frame_top"}>
                        {f_index !== 9 ?
                            (<>
                                    {status === "strike" ?
                                        <>X</>
                                        :
                                        <>
                                            <div className={"frame_top_left"}>{first_score}</div>
                                            {status === "spare" ?
                                                <div className={"frame_top_right"}>/</div>
                                                :
                                                <div className={"frame_top_right"}>{second_score}</div>
                                            }
                                        </>
                                    }
                                </>
                            )
                            :
                            (
                                <>
                                    {status.first === "turkey" &&
                                    <>
                                        <div className={"frame_top_first"}>X</div>
                                        <div className={"frame_top_second"}>X</div>
                                        <div className={"frame_top_third"}>X</div>
                                    </>}
                                    {status.first === "double" &&
                                    <>
                                        <div className={"frame_top_first"}>X</div>
                                        <div className={"frame_top_second"}>X</div>
                                        <div className={"frame_top_third"}>{third_score}</div>
                                    </>}
                                    {(status.first === "strike" && status.second === "spare") &&
                                    <>
                                        <div className={"frame_top_first"}>X</div>
                                        <div className={"frame_top_second"}>{second_score}</div>
                                        <div className={"frame_top_third"}>/</div>
                                    </>}
                                    {(status.first === "strike" && status.second === "none") &&
                                    <>
                                        <div className={"frame_top_first"}>X</div>
                                        <div className={"frame_top_second"}>{second_score}</div>
                                        <div className={"frame_top_third"}>{third_score}</div>
                                    </>}
                                    {(status.first === "spare" && status.second === "strike") &&
                                    <>
                                        <div className={"frame_top_first"}>{first_score}</div>
                                        <div className={"frame_top_first"}>/</div>
                                        <div className={"frame_top_third"}>X</div>
                                    </>}
                                    {(status.first === "spare" && status.second === "none") &&
                                    <>
                                        <div className={"frame_top_first"}>{first_score}</div>
                                        <div className={"frame_top_first"}>/</div>
                                        <div className={"frame_top_third"}>{third_score}</div>
                                    </>}
                                    {(status.first === "none" && status.second === "none") &&
                                    <>
                                        <div className={"frame_top_first"}>{first_score}</div>
                                        <div className={"frame_top_second"}>{second_score}</div>
                                        <div className={"frame_top_third"}>{third_score}</div>
                                    </>}
                                </>
                            )
                        }
                    </div>
                    <div className={"frame_bottom"}>
                        {blank ? <div>{'　'}</div> : <div>{frame_total || '　'}</div>}
                    </div>
                </div>
            </>
        );
    }
}
