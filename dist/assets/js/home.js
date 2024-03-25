import { items } from "./modules/items.mjs"; // Articles on sale
import { Qworum } from './imports.mjs'; // The Qworum library.

const
// Qworum Data value types
Json         = Qworum.Json,
SemanticData = Qworum.SemanticData,
// Qworum instructions
Data     = Qworum.Data,
Return   = Qworum.Return,
Sequence = Qworum.Sequence,
Goto     = Qworum.Goto,
Call     = Qworum.Call,
Fault    = Qworum.Fault,
Try      = Qworum.Try,
// Qworum script
Script = Qworum.Script;

showItems();

function showItems() {
  // console.debug(`[home] showing ${items.length} items`);
  const contentArea = document.getElementById('items');

  for (let itemId = 0; itemId < items.length; itemId++) {
    // console.debug(`[home] showing item ${itemId}`);
    const
    item   = items[itemId],
    li     = document.createElement('li'),
    button = document.createElement('button');

    button.className = 'item-title';
    button.innerText = item.title;
    li.appendChild(button);
    contentArea.appendChild(li);

    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-item/', { name: 'item id', value: Json(itemId) }),
            Goto()
          )
        )
      );
    });
  }
}
