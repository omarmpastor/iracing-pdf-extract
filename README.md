```sh
npm i "https://github.com/omarmpastor/iracing-pdf-extract --save"
```

```ts
import { parseIRacingSchedule } from 'iracing-pdf-extract'
import { readFileSync, writeFileSync } from "fs";

const pdf = readFileSync('2024S2.pdf');

parseIRacingSchedule(pdf).then(doc => {
    writeFileSync('data.json', JSON.stringify(doc, null, 2))
});
```
