// Checks whether the Qworum extension is running on the end-user's browser.
// Used by check-qworum-availability-LANG.html.

import { QworumScript, Qworum } from './deps.mjs';

const
// Data values
Json         = QworumScript.Json.build,
SemanticData = QworumScript.SemanticData.build,
// Instructions
Data     = QworumScript.Data.build,
Return   = QworumScript.Return.build,
Sequence = QworumScript.Sequence.build,
Goto     = QworumScript.Goto.build,
Call     = QworumScript.Call.build,
Fault    = QworumScript.Fault.build,
Try      = QworumScript.Try.build,
// Script
Script = QworumScript.Script.build,

siteVersion = new URLSearchParams(document.location.search).get('version');

console.log(`[Qworum availability checker] Site version: ${siteVersion}`);
// console.log(`[Qworum availability checker] Qworum.checkAvailability: ${Qworum.checkAvailability}`);

checkQworumAvailability();

async function checkQworumAvailability() {
  try {
    console.log(`checking `);
    await Qworum.checkAvailability();
    console.log(`The Qworum browser extension is running !`);

    // Execute a Qworum script
    // (See https://qworum.net/en/specification/v1/#script)
    await Qworum.eval(
      Script(
        // Call the `home` end-point
        Call('@', `/v${siteVersion}/home/`)

        // Fault('* test fault')
        // Return(Json('test value'))
      )
    );
  } catch (error) {
    console.log(`Error: ${error}`);

    // Ask the end-user to install Qworum
    document.querySelector('.hide').className = 'show';

    // This is a workaround for the "prefetching" of this page by browsers.
    // Prefetching doesn't work with Qworum, because during prefetching the document.location URL does not point the actual page URL, but it points to whatever page the browser happens to be on when it does the prefetching.
    setInterval(() => location.reload(), 10000);
  }
}
