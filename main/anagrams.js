import AnagramsDictionary from './anagrams-dictionary';
import AnagramsSet from './anagrams-set';

const LINE_DELIMITER = '\n';

export default class Anagrams {

    constructor() {
        this.dictionary = new AnagramsDictionary(AnagramsSet);
    }

    generate(words) {
        this.makeDictionary(words);
        return this.generateFromDictionary();
    }

    makeDictionary(words) {
        words.forEach(this.addToDictionary.bind(this));
    }

    addToDictionary(word) {
        this.dictionary.add(word);
    }

    generateFromDictionary() {
        return this.dictionary.words()
            .filter(set => set.needed())
            .map(set => set.toLine())
            .join(LINE_DELIMITER);
    }

}
