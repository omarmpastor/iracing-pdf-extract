```sh
npm i "https://github.com/omarmpastor/iracing-pdf-extract" -S
```

```ts
const iracingPdfExtract require('iracing-pdf-extract')
const fs require("fs")

const pdf = fs.readFileSync('2024S2.pdf');

iracingPdfExtract.parseIRacingSchedule(pdf).then(doc => {
    console.log(JSON.stringify(doc, null, 2))
});
```
