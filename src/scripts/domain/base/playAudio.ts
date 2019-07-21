import { request, speechResources } from '@/restful';

const play = (blobUrl) => {
    return new Promise(resolve => {
        const audio = new Audio(blobUrl);
        audio.onloadedmetadata = () => {
            setTimeout(
                () => {
                    resolve();
                    audio.remove();
                },
                audio.duration * 1000
            );
        };
        audio.play();
    });
};

export const playAudio = async (text) => {
    const response = await request(
        speechResources.getSpeech,
        [{
            type: 'query',
            parameter: 'text',
            value: text
        }, {
            type: 'query',
            parameter: 'rate',
            value: .8
        }]
    );

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    await play(blobUrl);
};