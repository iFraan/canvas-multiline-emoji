<div align="center">
    <h1>canvas-multiline-emoji</h1>
    <p>Typesafe multiline text on canvas with emoji support</p>
</div>

Draws text in a rectangle on a canvas, on multiple lines.

## Instalattion
To install use:
```shell
npm i canvas-multiline-emoji
```

## Usage
Exports a single function that draws text on a canvas, breaking it into multiple lines if needed. 

Also shrinks the font size to make in fit in the defined rectangle.

> Returns the font size used

```ts
const fontSize = await drawText(canvas2Dcontext, text, options);
```

### Example
```js
import { drawText } from 'canvas-multiline-emoji';
const canvas = new Canvas(512, 512);
const ctx = canvas.getContext('2d');
const text = 'The old rusted farm equipment surrounded the house predicting its demise. He uses onomatopoeia as a weapon of mental destruction.':
const options = {
    font: 'OpenSans',
    rect: {
        x: 25,
        y: 25,
        width: canvas.width - 25,
        height: canvas.height - 25
    },
    minFontSize: 10,
    maxFontSize: 40,
    lineHeight: 1.2
};

const fontSizeUsed = await drawText(ctx, text, options);

console.log('Font size used: ', fontSizeUsed)
```

#### Options
The `options` type is defined as `MultilineOptions` and (almost) all its keys are optional.

|   Parameter   | Description                                                                | Default       |
| :-----------: | -------------------------------------------------------------------------- | ------------- |
|    `font`     | Font name / family to use                                                  | `sans-serif`  |
|    `rect`     | Rectangle object with x, y, width, height. Text will be drawn inside this. | Canvas Size   |
| `minFontSize` | Minimum font size to use.                                                  | `8`           |
| `maxFontSize` | Maximum font size to use.                                                  | `100`         |
| `lineHeight`  | Multiplicator for line height                                              | `1`           |
|   `stroke`    | Defines whether `strokeText` will be used instead of `fillText`            | `false`       |
|   `verbose`   | Defines whether if should print debug info                                 | `false`       |
| `logFunction` | Custome function for logging.                                              | `console.log` |

## Dependencies
This module require some kind of Canvas object.

> Inspired on: https://gitlab.com/davideblasutto/canvas-multiline-text