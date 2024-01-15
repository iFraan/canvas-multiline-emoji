import { Canvas } from 'canvas';
import { drawText } from './index';

const canvas = new Canvas(512, 512);
const ctx = canvas.getContext('2d');
const text = 'The old rusted farm equipment surrounded the house predicting its demise. He uses onomatopoeia as a weapon of mental destruction.';
const options = {
    rect: {
        x: 25,
        y: 25,
        width: canvas.width - 25,
        height: canvas.height - 25
    },
};

const test = async () => {
    const fontSizeUsed = await drawText(ctx, text, options);
    console.log('Font size used: ', fontSizeUsed)
};

test();
