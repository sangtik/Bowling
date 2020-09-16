import {action, observable} from 'mobx';

export class PlayerStore {
    @observable players: any = Array(null).fill(null);

    @action delPlayers = () => {
        if(this.players.length > 1){
            this.players.pop();
        }
    }
    @action addPlayer = () => {
        if(this.players.length < 4) {
            this.players.push("");
        }
    }

    getPlayerNumber = () => {
        // console.log(this.players.length)
        return this.players.length;
    }

    setPlayers = (id:number, value:string) => {
        this.players[id] = value;
    }

    getPlayers = () => {
        for(let i = 0; i < this.players.length; i++){
            console.log("[index] : " + i + " [player name] : " + this.players[i]);
        }
        return this.players;
    }
}

export default new PlayerStore();