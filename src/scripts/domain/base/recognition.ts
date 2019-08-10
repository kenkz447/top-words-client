// tslint:disable:no-string-literal

const SpeechRecognition = window['SpeechRecognition'] || window['webkitSpeechRecognition'];
const SpeechGrammarList = window['SpeechGrammarList'] || window['webkitSpeechGrammarList'];

export const recognition = (term: string) => {
    const grammar = `
        #JSGF V1.0; 
        grammar conversations; 
        public <conversation> = ${term};
    `;

    const grammarList = new SpeechGrammarList();
    grammarList.addFromString(grammar);

    const speedRecognition = new SpeechRecognition();
    speedRecognition.lang = 'en-US';
    speedRecognition.grammar = grammarList;

    return new Promise<string>((resolve, reject) => {
        speedRecognition.start();

        speedRecognition.onresult = function (e) {

            const current = e.resultIndex;
            const transcript = e.results[current][0].transcript;

            const isMobileRepeatBug = (current === 1 && transcript === e.results[0][0].transcript);

            if (isMobileRepeatBug) {
                return;
            }

            resolve(transcript);
        };

        speedRecognition.onerror = function (e) {
            reject(e.error);
        };
    });
};