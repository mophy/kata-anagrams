import Anagrams from '../main/anagrams';
import AnagramsDictionary from '../main/anagrams-dictionary';

let dictionary;
let anagrams;

describe('Anagrams', () => {

    beforeEach(() => {
        anagrams = new Anagrams();
    });

    describe('toKey', () => {

        beforeEach(() => {
            dictionary = new AnagramsDictionary();
        });

        it('should handle empty string', () => {
            let word = '';

            let result = dictionary.toKey(word);

            expect(result).toEqual('');
        });

        it('should handle string with length 1', () => {
            let word = 'a';

            let result = dictionary.toKey(word);

            expect(result).toEqual('a');
        });

        it('should convert to lower case', () => {
            let word = 'A';

            let result = dictionary.toKey(word);

            expect(result).toEqual('a');
        });

        it('should handle string with length 2', () => {
            let word = 'ba';

            let result = dictionary.toKey(word);

            expect(result).toEqual('ab');
        });

        it('should handle string with length 3', () => {
            let word = 'cBa';

            let result = dictionary.toKey(word);

            expect(result).toEqual('abc');
        });

        it('should handle string with special chars', () => {
            let word = 'cB-a\'s';

            let result = dictionary.toKey(word);

            expect(result).toEqual('\'-abcs');
        });

    });

    describe('makeDictionary', () => {

        it('should make dict for 1 word', () => {
            let words = ['cba'];

            anagrams.makeDictionary(words);

            expect(anagrams.dictionary.size).toEqual(1);
            expect(anagrams.dictionary.get('abc').list).toEqual(['cba']);
        });

        it('should make dict for 2 words', () => {
            let words = ['cba', 'hello'];

            anagrams.makeDictionary(words);

            expect(anagrams.dictionary.size).toEqual(2);
            expect(anagrams.dictionary.get('abc').list).toEqual(['cba']);
            expect(anagrams.dictionary.get('ehllo').list).toEqual(['hello']);
        });

        it('should make dict for 2 anagram words', () => {
            let words = ['abc', 'cba'];

            anagrams.makeDictionary(words);

            expect(anagrams.dictionary.size).toEqual(1);
            expect(anagrams.dictionary.get('abc').list).toEqual(['abc', 'cba']);
        });

        it('should make dict for more words', () => {
            let words = ['abc', 'cba', 'hello', 'llohe', 'key', 'oelhl'];

            anagrams.makeDictionary(words);

            expect(anagrams.dictionary.size).toEqual(3);
            expect(anagrams.dictionary.get('abc').list).toEqual(['abc', 'cba']);
            expect(anagrams.dictionary.get('ehllo').list).toEqual(['hello', 'llohe', 'oelhl']);
            expect(anagrams.dictionary.get('eky').list).toEqual(['key']);
        });

        it('should make dict with lower case words', () => {
            let words = ['aBc', 'cbA', 'hELLo', 'llohe', 'key', 'oelhl'];

            anagrams.makeDictionary(words);

            expect(anagrams.dictionary.size).toEqual(3);
            expect(anagrams.dictionary.get('abc').list).toEqual(['abc', 'cba']);
            expect(anagrams.dictionary.get('ehllo').list).toEqual(['hello', 'llohe', 'oelhl']);
            expect(anagrams.dictionary.get('eky').list).toEqual(['key']);
        });

        it('should make dict without duplicated words', () => {
            let words = ['aBc', 'ABc', 'cbA', 'hELLo', 'llohe', 'key', 'oelhl'];

            anagrams.makeDictionary(words);

            expect(anagrams.dictionary.size).toEqual(3);
            expect(anagrams.dictionary.get('abc').list).toEqual(['abc', 'cba']);
            expect(anagrams.dictionary.get('ehllo').list).toEqual(['hello', 'llohe', 'oelhl']);
            expect(anagrams.dictionary.get('eky').list).toEqual(['key']);
        });

    });

    describe('generate', () => {

        it('should handle dict with 2 words', () => {
            let words = ['hello', 'olleh'];

            let result = anagrams.generate(words);

            expect(result).toEqual('hello olleh');
        });

        it('should handle dict with 3 words', () => {
            let words = ['hello', 'key', 'olleh', 'yek'];

            let result = anagrams.generate(words);

            expect(result).toEqual('hello olleh\nkey yek');
        });

        it('should omit lines without anagrams', () => {
            let words = ['hello', 'key', 'olleh'];

            let result = anagrams.generate(words);

            expect(result).toEqual('hello olleh');
        });

    });

});
