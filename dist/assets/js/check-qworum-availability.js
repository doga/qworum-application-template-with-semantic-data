// Checks whether the Qworum extension is running on the end-user's browser.
// Used by check-qworum-availability-LANG.html.

import { QworumScript as QS, Qworum } from './deps.mjs';

const
// Data values
Json         = QS.Json.build,
SemanticData = QS.SemanticData.build,
// Instructions
Data     = QS.Data.build,
Return   = QS.Return.build,
Sequence = QS.Sequence.build,
Goto     = QS.Goto.build,
Call     = QS.Call.build,
Fault    = QS.Fault.build,
Try      = QS.Try.build,
// Script
Script = QS.Script.build;
// console.debug(`[pm app]Script`,Script);


checkQworumAvailability();

async function checkQworumAvailability() {
  try {
    const 
    searchParams = new URLSearchParams(document.location.search),
    pathToCall = searchParams.get('call');

    // console.info(`checking Qworum availability …`);
    await Qworum.checkAvailability();
    // console.info(`The Qworum browser extension is running !`);

    await Qworum.eval(
      Script(
        Call('@', pathToCall)
      )
    );
  } catch (error) {
    console.error(`Error: ${error}`);

    // Ask the end-user to install Qworum
    document.querySelector('.hide').className = 'show';
    // location.reload();

    // This is a workaround for the "prefetching" of this page by browsers.
    // Prefetching doesn't work with Qworum, because during prefetching the document.location URL does not point the actual page URL, but it points to whatever page the browser happens to be on when it does the prefetching.
    setInterval(() => location.reload(), 3000);
  }
}
