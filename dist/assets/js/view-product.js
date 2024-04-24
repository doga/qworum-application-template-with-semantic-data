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

await showItem();

async function showItem() {
  const
  params = {
    product: {sd: await Qworum.getData('product')}
  },
  product = {
    model: (await Product.readFrom(params.product.sd.value))[0],
    sd   : SemanticData(),
  };

  await product.sd.readFromUrl(
    new URL(
      `/rdf-store/${encodeURIComponent(encodeURIComponent(product.model.id))}.ttl`, 
      `${location}`
    )
  );
  
  product.model.datasets.add(product.sd.value);
  
  product.names        = await product.model.getNames();
  product.offers       = await product.model.getOffers();
  product.descriptions = await product.model.getDescriptions();

  const
  // UI
  closeButton = document.getElementById('close'),
  title       = document.getElementById('product-title'),
  price       = document.getElementById('product-price'),
  details     = document.getElementById('product-details');

  for (const name of product.names) {
    title.innerText = name; 
    break;
  }

  for (const offer of product.offers) {
    price.innerText = `${offer.price} ${offer.priceCurrency}`; 
    break;
  }

  for (const description of product.descriptions) {
    details.innerText = description.value; 
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
