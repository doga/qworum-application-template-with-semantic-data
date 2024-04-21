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

await showItem();

async function showItem() {
  // console.debug(`showing item `);
  const
  params = {
    product: await Qworum.getData('product'), // SemanticData
  };

  // console.log(`Product info is semantic data: ${params.product.getTag && params.product.getTag() === 'semantic'}\nProduct info: ${params.product}`);

  const
  productModel     = Product.readFrom(params.product)[0],   // Product
  productDetailsSd = SemanticData();

  await productDetailsSd.readFromUrl(
    new URL(
      `/rdf-store/${encodeURIComponent(productModel.id)}.ttl`, 
      `${location}`
    )
  );

  productModel.datasets.add(productDetailsSd.value);

  const
  product = {
    names       : await productModel.getNames(),
    descriptions: await productModel.getDescriptions(),
  },

  // UI
  closeButton = document.getElementById('close'),
  title       = document.getElementById('product-title'),
  details     = document.getElementById('product-details');

  for (const productName of product.names) {
    title.innerText = productName; 
    break;
  }
  for (const productDescription of product.descriptions) {
    details.innerText = productDescription.value; 
    break;
  }

  closeButton.addEventListener('click', (event) => {
    // event.preventDefault();
    Qworum.eval(
      Script(
        Return(SemanticData())
      )
    );
  });

}
