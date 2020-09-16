import {action, observable} from 'mobx';

export class PlayerStore {
    @observable
    number: number = 0;

    @action
    increaseNumber = () => {
        if (this.number < 4)
            this.number++;
    }

    @action
    decreaseNumber = () => {
        if (this.number > 0)
            this.number--;
    }
}

export default new PlayerStore();