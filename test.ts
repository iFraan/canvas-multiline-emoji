import fs from 'node:fs';
import { Canvas } from 'canvas';
import { drawText } from './index';

const canvas = new Canvas(500, 500);
const ctx = canvas.getContext('2d');
const text = 'The old rusted farm equipment 🤪 surrounded the house predicting its demise. He uses onomatopoeia as a weapon of mental destruction. 👍';
const options = {
    verbose: true,
    rect: {
        x: 50,
        y: 50,
        width: canvas.width - (50 * 2),
        height: canvas.height - (50 * 2),
    },
};

const test = async () => {
    /* --- background --- */
    ctx.fillStyle = '#4a4aad';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    /* --- font color --- */
    ctx.fillStyle = '#ceceec';

    const fontSizeUsed = await drawText(ctx, text, options);
    console.log('Font size used: ', fontSizeUsed);

    const buffer = canvas.toBuffer();
    fs.writeFileSync('test.png', buffer);
};

test();
