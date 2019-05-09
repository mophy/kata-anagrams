import { createInterface } from 'readline';

import Anagrams from './anagrams';

(function processCommandLine() {
    const { stdin, stdout } = process;
    const rl = createInterface({ input: stdin, crlfDelay: Infinity });
    const anagrams = new Anagrams();

    rl.on('line', anagrams.addToDictionary.bind(anagrams));

    rl.once('close', () => {
        stdout.write(anagrams.generateFromDictionary());
    });
}());
