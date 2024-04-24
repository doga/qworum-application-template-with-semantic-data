import { Product } from "./models/product.mjs"; 
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
Script = QworumScript.Script.build;

await showItems();

async function showItems() {
  const 
  inventory = {
    sd : SemanticData(),
    url: new URL('/rdf-store/inventory.ttl', `${location}`)
  };

  // read the products from database
  await inventory.sd.readFromUrl(inventory.url);
  inventory.products = await Product.readFrom(inventory.sd.value);

  const contentArea = document.getElementById('products');

  for (const p of inventory.products) {
    const
    product = {
      model: p,
      names: await p.getNames(),
      sd   : SemanticData(),
    };
    await product.model.writeTo(product.sd.value);

    const
    li     = document.createElement('li'),
    button = document.createElement('button');

    for (const productName of product.names) {
      button.className = 'product-title';
      button.innerText = productName;
      li.appendChild(button);
      contentArea.appendChild(li);
      break;
    }

    // send to product to the view-product endpoint
    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-product/', { name: 'product', value: product.sd }),
            Goto()
          )
        )
      );
    });
  }
}
