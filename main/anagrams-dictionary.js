export default class AnagramsDictionary {

    constructor(SetClass) {
        this.map = new Map();
        this.SetClass = SetClass;
    }

    add(word) {
        let key = this.toKey(word);
        this.setSet(key, this.getSet(key).add(word));
    }

    setSet(key, set) {
        this.map.set(key, set);
    }

    getSet(key) {
        return this.map.get(key) || this.createSet();
    }

    words() {
        return Array.from(this.map.values());
    }

    createSet() {
        return new this.SetClass();
    }

    toKey(word) {
        return word
            .toLowerCase()
            .split('')
            .sort((a, b) => a.codePointAt(0) - b.codePointAt(0))
            .join('');
    }

    get(key) {
        return this.map.get(key);
    }

    get size() {
        return this.map.size;
    }

}
