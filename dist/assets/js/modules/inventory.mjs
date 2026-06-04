import { QworumScript as QS, irl } from "../deps.mjs";
const SemanticData = QS.SemanticData.build;

/**
 * Returns the application's data.
 * @returns {QS.SemanticData}
 */
async function readInventory(){
  const inventory = SemanticData();
  await inventory.readFromUrl(irl`${location.origin}/data/inventory.ttl`);
  return inventory;
}

export {readInventory};
