import express from 'express';
const app = new express();
import { router as products } from './products';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', express.static('api/public'));
app.use('/products', products);

app.listen(3000, () => {
  console.log('Magic happens on port 3000');
});
