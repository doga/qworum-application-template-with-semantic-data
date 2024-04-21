import { Product } from "./modules/product.mjs"; 
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
  productInventorySd      = SemanticData(),
  productInventoryDataset = productInventorySd.value;

  await productInventorySd.readFromUrl(new URL('/rdf-store/inventory.ttl', `${location}`));

  // read the products from database
  const 
  productModels = await Product.readFrom(productInventoryDataset),
  contentArea   = document.getElementById('products');

  for (const productModel of productModels) {
    const
    productSd      = SemanticData(),
    productDataset = productSd.value;

    productModel.writeTo(productDataset);
    
    
    const
    productNames = await productModel.getNames();
    li           = document.createElement('li'),
    button       = document.createElement('button');

    for (const productName of productNames) {
      button.className = 'product-title';
      button.innerText = productModel.title;
      li.appendChild(button);
      contentArea.appendChild(li);
      break;
    }

  // send to product to the view-product endpoint
    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-product/', { name: 'product', value: productSd }),
            Goto()
          )
        )
      );
    });
  }
}
