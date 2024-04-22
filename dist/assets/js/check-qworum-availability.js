// Checks whether the Qworum extension is running on the end-user's browser.
// Used by check-qworum-availability-LANG.html.

import { QworumScript, Qworum } from './deps.mjs';
import { Settings } from './models/settings.mjs';

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
Script = QworumScript.Script.build;

checkQworumAvailability();

async function checkQworumAvailability() {
  try {
    const settingsSd = SemanticData();

    await settingsSd.readFromUrl(new URL('/settings.ttl', `${location}`));

    const 
    settingsModel = await Settings.readFrom(settingsSd.value),
    settings      = {version: await settingsModel.getVersion()};

    await Qworum.checkAvailability();
    console.info(`The Qworum browser extension is running !`);

    await Qworum.eval(
      Script(
        Call('@', `/v${settings.version}/home/`)
      )
    );
  } catch (error) {
    console.error(`Error: ${error}`);

    // Ask the end-user to install Qworum
    document.querySelector('.hide').className = 'show';
    location.reload();

    // This is a workaround for the "prefetching" of this page by browsers.
    // Prefetching doesn't work with Qworum, because during prefetching the document.location URL does not point the actual page URL, but it points to whatever page the browser happens to be on when it does the prefetching.
    setInterval(() => location.reload(), 3000);
  }
}
