const WORD_DELIMITER = ' ';

export default class AnagramsSet {

    constructor() {
        this.list = [];
    }

    add(word) {
        let normalized = this.normalize(word);
        if (!this.has(normalized)) this.list.push(normalized);
        return this;
    }

    normalize(word) {
        return word.toLowerCase();
    }

    has(normalized) {
        return this.list.indexOf(normalized) >= 0;
    }

    needed() {
        return this.list.length > 1;
    }

    toLine() {
        return this.list.join(WORD_DELIMITER);
    }

}
