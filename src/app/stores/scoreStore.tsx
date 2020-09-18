import {action, observable} from 'mobx';

export class ScoreStore {

    @observable p_max: number;
    s_max: number = 21; // 전체 게임 숫자
    f_max: number = 10; // 프레임 최대값

    p_index: number = 0; // 플레이어 차례 (0~3 : 10)
    f_index: number = 0; // 프레임 차례 (0~9 : 10)
    s_index: number = 0; // 게임 차례 (0: 첫번째, 1: 두번째)

    @observable game_set: boolean = false;

    @observable point: number = 0; // 데이터 현재 입력 차례

    @observable scores; // 스코어 전체 점수를 저장하는 리스트
    @observable f_scores; // 프레임 전체 점수를 저장하는 리스트

    @action setPlayerNum = (number: number) => { // 플레이어 숫자 설정
        this.p_max = number;
        this.scores = Array.from(Array(this.p_max), () => Array(this.s_max).fill(null));
        this.f_scores = Array.from(Array(this.p_max), () => Array(this.f_max).fill(null));
    }

    @action setInitialize = () => { // 기록 초기화
        this.p_index = 0;
        this.f_index = 0;
        this.s_index = 0;
        this.point = 0;
        this.scores = null;
        this.f_scores = null;
        this.game_set = false;
    }

    @action private setScore = (score) => {
        console.log("insert score : " + this.p_index + " / " + this.f_index + " / " + this.s_index + " / " + score);
        this.scores[this.p_index][(this.f_index * 2) + this.s_index] = score;
        if (score === 10 && this.s_index === 0 && this.f_index !== 9) { // 스트라이크 쳤을 때
            this.scores[this.p_index][(this.f_index * 2) + this.s_index + 1] = 0;
        }

    }

    @action
    setFrameScore = (status: string, score: number) => {

        if (this.f_index >= this.f_max) return false;
        // console.log(" setFrameScore Params : " + status + " score : " + score + " f_index " + this.f_index);

        switch (status) {
            case "strike" :
                this.f_scores[this.p_index][this.f_index] = -1;
                break;
            case "spare" :
                this.f_scores[this.p_index][this.f_index] = -2;
                break;
            case "none" :
                // 버그 : 0 값 입력시 안더함 그래서 옵저버 발동 안함함
              if(score === 0){
                  this.f_scores[this.p_index][this.f_index] ++;
                  this.f_scores[this.p_index][this.f_index] --;
              }
                this.f_scores[this.p_index][this.f_index] += score;
                break;
            default :
        }
        // -1 STRIKE, -2 SPARE
    }

    @action private setPrevFrameScore = (prev_score:number, status: string, score: number) => {
        // console.log("setPrevFrameScore(status, score) : " + status + " , " + score);
        switch (status) {
            case "double" :
                console.log("이전에 더블이었음!!!")
                if (this.f_index < 10) {
                    if (this.s_index === 0) {
                        this.f_scores[this.p_index][this.f_index - 2] = 20;
                        this.f_scores[this.p_index][this.f_index - 2] += score;
                    }
                    else if (this.s_index === 1) {
                        this.f_scores[this.p_index][this.f_index - 1] = 10;
                        this.f_scores[this.p_index][this.f_index - 1] += score;
                        this.f_scores[this.p_index][this.f_index - 1] += prev_score;
                    }
                } else {
                    this.f_scores[this.p_index][this.f_index - 1] = 10;
                    this.f_scores[this.p_index][this.f_index - 1] += score;
                }
                break;

            case "strike" :
                console.log("이전에 스트라이크였음!!!");
                if (this.s_index === 1) {
                    this.f_scores[this.p_index][this.f_index - 1] = 10;
                    this.f_scores[this.p_index][this.f_index - 1] += score;
                    this.f_scores[this.p_index][this.f_index - 1] += prev_score;
                }
                break;

            case "spare" :
                console.log("이전에 스페어였음!!!");
                if (this.s_index === 0) {
                    this.f_scores[this.p_index][this.f_index - 1] = 10;
                    this.f_scores[this.p_index][this.f_index - 1] += score;
                }
                break;

            default :
        }
    }

    private generateScore(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    @action hit = (all_hit) => {

        if(this.game_set) return 0;

        let score: number;
        let point: number = (this.f_index * 2) + this.s_index;
        let prev_score: number;
        let prev_before_score: number;

        if (point > 0) {
            prev_score = this.getPrevScore(point, 1)
            if (point > 1) prev_before_score = this.getPrevScore(point, 2)
        }

        if (this.f_index < 9) { // 1~9 FRAME
            if (all_hit) {
                score = (this.s_index === 0) ? this.generateScore(10, 10) : this.generateScore((10 - prev_score), (10 - prev_score));
            } else {
                score = (this.s_index === 0) ? this.generateScore(0, 10) : this.generateScore(0, (10 - prev_score));
            }
        } else { // 10 FRAME
            if (all_hit) {

                switch (this.s_index) {
                    case 0 :
                        score = this.generateScore(10, 10);
                        break;
                    case 1 :
                        score = (prev_score === 10) ? this.generateScore(10, 10) : this.generateScore((10 - prev_score), (10 - prev_score));
                        break;
                    case 2 :
                        score = (prev_score === 10 || prev_before_score + prev_score === 10) ? this.generateScore(10, 10) : this.generateScore((10 - prev_score), (10 - prev_score));
                        break;
                    default :
                }
            } else {
                switch (this.s_index) {
                    case 0:
                        score = this.generateScore(0, 10);
                        break;
                    case 1:
                        score = (prev_score === 10) ? this.generateScore(0, 10) : this.generateScore(0, (10 - prev_score));
                        break;
                    case 2:
                        score = (prev_score === 10 || prev_before_score + prev_score === 10) ? this.generateScore(0, 10) : this.generateScore(0, (10 - prev_score));
                        break;
                    default:
                }
            }
        }

        console.log("[player] : " + this.p_index + " [frame_index] : " + this.f_index + " [score_index] : " + this.s_index);

        // 이전 프레임 점수 갱신
        const prevFrameScore = this.prevFrameScoreCheck(point);
        this.setPrevFrameScore(prev_score, prevFrameScore, score);

        // 현재 프레임 점수 갱신
        const thisFrameScore = this.thisFrameScoreCheck(prev_score, prevFrameScore, score);

        // this.printAllScore();
        // this.printAllFrameScore();

        if(this.f_index === this.f_max){
            this.game_set = true;
            console.log("Game End..!")
        }

        return thisFrameScore;
    }

    getNextTurn() {
        let next_p_index: number = 0;
        if (this.f_index < 9) {
            if (this.s_index === 1)
                next_p_index = (this.p_index + 1) % this.p_max;
        } else {
            if (this.s_index === 2)
                next_p_index = (this.p_index + 1) % this.p_max;
        }
        console.log("next : " + next_p_index);
        return next_p_index;
    }

    getTotal(p_index: number): number {
        let total = 0;
        for (let i = 0; i < this.f_scores[p_index].length; i++) {
            if (this.f_scores[p_index][i] >= 0)
                total += this.f_scores[p_index][i];
        }
        // console.log("p_index : " + p_index + " total : " + total);
        return total;
    }

    getRank(p_index: number): number {
        let rank: number = 0;
        // console.log("game_set : " + this.game_set);

        let totals = new Array(this.p_max); // 점수 담을 그릇 생성
        for (let i = 0; i < this.p_max; i++) { // 총합 점수 담기
            totals[i] = this.getTotal(i);
            // console.log("getTotal : " + totals[i]);
        }
        for (let i = 0; i < totals.length; i++) { // 총합 비교
            if (totals[p_index] < totals[i]) rank++;
        }
        // 인자로 들어온 인덱스 값과 일치하는 등수 확인
        // console.log("rank : [" + rank + "]");
        if (!this.game_set) rank = -1; // 게임 끝났는지 확인
        return rank;
    }

    private prevFrameScoreCheck(now_s_index: number): string {
        // PREV FRAME SCORE CHECK ( STRIKE? SPARE? )
        let score = {prev1: 0, prev2: 0, before_prev1: 0, before_prev2: 0};

        if (this.s_index === 0) {
            score.prev1 = this.getPrevScore(now_s_index, 2);
            score.prev2 = this.getPrevScore(now_s_index, 1);
            score.before_prev1 = this.getPrevScore(now_s_index, 4);
            score.before_prev2 = this.getPrevScore(now_s_index, 3);
        } else if (this.s_index === 1) {
            score.prev1 = this.getPrevScore(now_s_index, 3);
            score.prev2 = this.getPrevScore(now_s_index, 2);
            score.before_prev1 = this.getPrevScore(now_s_index, 5);
            score.before_prev2 = this.getPrevScore(now_s_index, 4);
        }

        if (score.prev1 === 10 && score.prev2 === 0) { // PREV FRAME SCORE = STIRKE
            return (score.before_prev1 === 10 && score.before_prev2 === 0) ? "double" : "strike";

        } else if (score.prev1 + score.prev2 === 10) { // PREV FRAME SCORE = SPARE
            return "spare";

        } else { // PREV FRAME = NONE
            return "none";
        }
    }

    private nextPlayer = () => {
        this.s_index = 0;
        this.p_index++;
        this.p_index = this.p_index % (this.p_max);
        if (this.p_index === 0) {
            this.f_index++;
        }
    }

    private nextScore = () => {
        this.s_index++;
    }

    private getPrevScore = (now_s_index: number, prev_count: number) => {
        // console.log("prev score : " + this.scores[this.p_index][(now_s_index) - prev_count]);
        return this.scores[this.p_index][now_s_index - prev_count];
    }

    getFrameTotal = (now_p_index: number, now_f_index: number) => {
        let total: number = 0;
        let f_score: number = this.f_scores[now_p_index][now_f_index];
        // console.log("f_score : " + f_score);

        if (f_score !== null && f_score >= 0) {
            for (let i = 0; i < now_f_index + 1; i++)
                total += this.f_scores[now_p_index][i];
            return total;
        }
        return f_score;
    }

    private thisFrameScoreCheck(prev_score: number, prevFrameScore: string, score: number) {
        let rt_val:string = "none";

        // 10 Frame
        if (this.f_index === 9 && this.s_index === 0  && score === 10) {// 10F STRIKE0
            console.log("10F STRIKE0");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextScore();
            rt_val = "strike";

        }else if (this.f_index === 9 &&  this.s_index === 1 && score === 10) {// 10F STRIKE1
            console.log("10F STRIKE1");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextScore();
            (prev_score === 0) ? rt_val = "spare" : rt_val = "strike";

        }else if (this.f_index === 9 &&  this.s_index === 2 && score === 10) {// 10F STRIKE2
            console.log("10F STRIKE2");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextPlayer();
            (prev_score === 0) ? rt_val = "spare" : rt_val = "strike";

        } else if (this.f_index === 9 && (prev_score + score) === 10 && this.s_index === 1 && prev_score !== 10) {// 10F SPARE1
            console.log("10F SPARE1");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextScore();
            rt_val = "spare";

        } else if (this.f_index === 9 && (prev_score + score) === 10 && this.s_index === 2 && prev_score !== 10) {// 10F SPARE2
            console.log("10F SPARE2");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextPlayer();
            rt_val = "spare";

        } else if (this.f_index === 9 && this.s_index === 0) {// 10F NONE
            console.log("10F NONE 1");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextScore();

        } else if (this.f_index === 9 && this.s_index === 1 && prev_score === 10) {// 10F NONE
            console.log("10F NONE 2");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextScore();

        } else if (this.f_index === 9 && (this.s_index === 1 || this.s_index === 2)) {// 10F NONE
            console.log("10F NONE 3");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextPlayer();

            // 1~9 Frame
        } else if (score === 10 && this.s_index === 0) { // STRIKE
            console.log("10F NONE STRIKE");
            this.setFrameScore("strike", score);
            this.setScore(score);
            this.nextPlayer();
            rt_val = "strike";

        } else if ((prev_score + score) === 10 && this.s_index === 1) { // SPARE
            console.log("1~9F NONE SPARE");
            this.setFrameScore("spare", score);
            this.setScore(score);
            this.nextPlayer();
            rt_val = "spare";

        } else if (this.s_index === 0) { // 한번 쳤을 경우 (score index 변경)
            console.log("1~9F NONE 0");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextScore();

        } else if (this.s_index === 1 && this.f_index < 9) { // 두번째 쳤을 경우
            console.log("1~9F NONE 1");
            this.setFrameScore("none", score);
            this.setScore(score);
            this.nextPlayer();
        }

        if(prevFrameScore === "double" && rt_val === "strike") rt_val = "turkey";
        else if(prevFrameScore === "strike" && rt_val === "strike") rt_val = "double";

        return rt_val;
    }

    private printAllScore() {
        // 전체 스코어 확인
        for (let i = 0; i < this.scores.length; i++) {
          for (let j = 0; j < this.scores[i].length; j++) {
            if (this.scores[i][j] !== null)
              console.log("[player] : " + i + " [score_index] : " + j + " [score] : " + this.scores[i][j]);
          }
        }
    }

    private printAllFrameScore() {
        // 전체 스코어 프레임 확인
        for (let i = 0; i < this.f_scores.length; i++) {
          for (let j = 0; j < this.f_scores[i].length; j++) {
            if (this.f_scores[i][j] !== null)
              console.log("[player] : " + i + " [f_scores_index] : " + j + " [f_scores] : " + this.f_scores[i][j]);
          }
        }
    }
}

export default new ScoreStore();