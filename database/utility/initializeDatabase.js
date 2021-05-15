import { getCollection } from '../.';
const brands = ["Shane's", 'Dilgas', 'KS', 'KJ original'];
const productTypes = ['Sweater', 'T-Shirt', 'Hat', 'Shoes'];
const colors = ['Black', 'White', 'Blue', 'Green'];
const sizes = ['Small', 'Medium', 'Large'];

let skuCounter = 1;
let price = 1;

function generateProducts() {
  const products = [];
  for (let brand of brands) {
    for (let color of colors) {
      for (let size of sizes) {
        for (let productType of productTypes) {
          products.push({
            SKU: skuCounter++,
            brand,
            color,
            size,
            productType,
            price: price++,
            quantity: 5,
          });
        }
      }
    }
  }
  return products;
}

(async function () {
  const products = generateProducts();
  const collection = await getCollection('store', 'products');
  await collection.deleteMany();
  await collection.insertMany(products);

  const tokens = await getCollection('auth', 'tokens');
  await tokens.insertOne({
    owner: 'CLIENT-1',
    value: 1234,
    expiry: null,
    canModifyProducts: true,
  });
  
  console.log('Done');
})();
