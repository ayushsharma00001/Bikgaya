let mongoose = require("mongoose");
let express = require("express");
let app = express();
let Women = require("./modals/women");
let Men = require("./modals/men");
let User = require("./modals/user");

let Womendata = [
  {
    name: 'Floral Maxi Dress',
    description: 'A stunning floral print maxi dress, perfect for summer outings.',
    price: 3400,
    img: {
      url:'https://ladybaazar.com/cdn/shop/files/W344.jpg?v=1692338555',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20
  },
  {
    name: 'Leather Tote Bag',
    description: 'Genuine leather tote bag with multiple compartments for everyday use.',
    price: 1299,
    img: {
      url:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1679941102-Belmont-Structured-Tote-Tan-059-359-Lifestyle_fullsize.jpg?crop=1xw:1.00xh;center,top&resize=980:*',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  },
  {
    name: 'Ankle Strap Heels',
    description: 'Elegant ankle strap heels, suitable for formal occasions.',
    price: 999,
    img: {
      url:'https://www.lulus.com/images/product/xlarge/5479850_1070402.jpg',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  },
  {
    name: 'Striped Cotton Shirt',
    description: 'Comfortable and stylish striped cotton shirt for a casual look.',
    price: 799,
    img: {
      url:'https://img3.junaroad.com/uiproducts/19784865/pri_175_p-1683042980.jpg',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  },
  {
    name: 'Statement Earrings',
    description: 'Bold and eye-catching statement earrings to elevate your style.',
    price: 1049,
    img: {
      url:'https://odette.in/cdn/shop/products/turquoise-blue-sunshine-statement-earrings-odette-1.jpg?v=1663166384',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  }
]




let Mendata = [
  {
    name: 'Slim Fit Jeans',
    description: 'Classic slim fit denim jeans, perfect for casual wear.',
    price: 1500,
    img: {
      url:'https://images.bestsellerclothing.in/data/JJ/2-jan-2023/297915001_g2.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  },
  {
    name: 'Leather Bifold Wallet',
    description: 'Genuine leather bifold wallet with multiple card slots and compartments.',
    price: 599,
    img: {
      url:'https://www.thepostbox.in/cdn/shop/products/08_a3366988-9ab3-43ca-8409-e5d1ab7c8594_1200x630.jpg?v=1604171441',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  },
  {
    name: 'Cotton Polo Shirt',
    description: 'Comfortable cotton polo shirt suitable for everyday use.',
    price: 700,
    img: {
      url:'https://faso.in/file/wp-content/uploads/2021/10/1-FA-5001-DEEPRED.jpg',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  },
  {
    name: 'Canvas Sneakers',
    description: 'Casual and versatile canvas sneakers for a laid-back style.',
    price: 1999,
    img: {
      url:'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71nX9gLCjFL._SL1200_.jpg',
      filename:"product"
    },
    owner:"658bc2f21a518af159fb1ded",
    stock:20

  }
]





let url = `${process.env.ATLASDB_URL}`;
async function main(){
    await mongoose.connect(url);
}
main()
.then(()=>{
    console.log("Successfully connected to database");
})
.catch((err)=>{
    console.log(err);
})


async function dataInsert(){
    await Women.deleteMany({});
    await Women.insertMany(Womendata);
    await Men.deleteMany({});
    await Men.insertMany(Mendata);

}

dataInsert();

  