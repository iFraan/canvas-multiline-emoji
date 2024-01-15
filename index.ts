import { fillTextWithTwemoji, strokeTextWithTwemoji } from "node-canvas-with-twemoji-and-discord-emoji";
import { CanvasRenderingContext2D } from "canvas";
import wordCounter from 'words-array';

export type Line = {
    text: string,
    x: number,
    y: number,
}

export type MultilineOptions = {
    font?: string,
    stroke?: boolean,
    verbose?: boolean,
    rect?: {
        x: number,
        y: number,
        width: number,
        height: number
    },
    lineHeight?: number,
    minFontSize?: number,
    maxFontSize?: number,
    logFunction?: Function,
};

export const drawText = async (ctx: CanvasRenderingContext2D, text: string, options: MultilineOptions = {}) => {

    const DEFAULT_OPTIONS = {
        font: 'sans-serif',
        stroke: false,
        verbose: false,
        rect: {
            x: 0,
            y: 0,
            width: ctx.canvas.width,
            height: ctx.canvas.height
        },
        lineHeight: 1,
        minFontSize: 8,
        maxFontSize: 100,
        logFunction: (...content: any[]) => console.log(content),
    };

    const parameters = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

    const words: string[] = wordCounter(text);

    if (parameters.verbose) parameters.logFunction(`Text contains ${words.length} words.`);

    const lines: Line[] = [];
    let fontSize: number;

    for (fontSize = parameters.minFontSize; fontSize <= parameters.maxFontSize; fontSize++) {
        const lineHeight = fontSize * parameters.lineHeight;

        ctx.font = `${fontSize}px ${parameters.font}`;

        let x = parameters.rect.x;
        let y = parameters.rect.y + fontSize;
        let currentLine = '';

        const inner: Line[] = [];

        for (const word of words) {
            const line = `${currentLine} ${word} `;

            if (ctx.measureText(line).width > parameters.rect.width) {
                /* --- push without the last word ---*/
                inner.push({ text: currentLine, x, y });
                /* --- start a new line with the word that didnt fit --- */
                currentLine = word + ' ';
                y += lineHeight;
            } else {
                currentLine = line;
            }
        }

        /* --- finally push the last words --- */
        inner.push({ text: currentLine, x, y });

        /* --- if im at the bottom, thats the max font i can use --- */
        if ((y + (fontSize * parameters.lineHeight)) > parameters.rect.height) {
            lines.push(...inner);
            break;
        }

    }

    if (parameters.verbose) parameters.logFunction('Font used: ' + ctx.font)

    /* --- print the text --- */
    for (const line of lines) {
        if (parameters.stroke) {
            await strokeTextWithTwemoji(ctx, line.text, line.x, line.y);
        } else {
            await fillTextWithTwemoji(ctx, line.text, line.x, line.y);
        }
    }

    return fontSize;

};

export default { drawText };