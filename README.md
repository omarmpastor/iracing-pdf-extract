```sh
npm i "https://github.com/omarmpastor/iracing-pdf-extract" -S
```

```ts
import { parseIRacingSchedule } from 'iracing-pdf-extract'
import { readFileSync } from "fs";

const pdf = readFileSync('2024S2.pdf');

parseIRacingSchedule(pdf).then(doc => {
    console.log(JSON.stringify(doc, null, 2))
});
```
