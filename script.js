const navigation = document.getElementById('nav');
const menu = document.getElementById('menu');
let productLineResponse = [];
let rawcatogriyList = [];
let uniqueCategory = [];
let productInfoResponse = [];
let categoryMenu = document.getElementById('categoryMenu');
let choseProducts = document.getElementById('choseProducts');
let productInfo = document.getElementById('productInfo');

menu.addEventListener('click', () => {
  navigation.style.setProperty('--childenNumber', navigation.children.length);

  navigation.classList.toggle('active');
  menu.classList.toggle('active');
});

const getCategories = async () => {
  try {
    await fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((result) => (rawcatogriyList = result));
  } catch (error) {
    console.log('error', error);
  }

  rawcatogriyList.filter((catergory) => {
    const isDuplicate = uniqueCategory.includes(catergory.productLine);

    if (!isDuplicate) {
      uniqueCategory.push(catergory.productLine);
      return uniqueCategory;
    }
    return false;
  });

  for (let i = 0; i < uniqueCategory.length; i++) {
    let button = document.createElement('button');
    button.textContent = uniqueCategory[i];
    button.id = uniqueCategory[i];
    button.className = 'btn';
    button.addEventListener('click', () => {
      choseProducts.innerHTML = '';
      chosenCatergory(uniqueCategory[i]);
    });
    categoryMenu.append(button);
  }
};

const chosenCatergory = async (category) => {
  console.log(category);

  try {
    await fetch(`http://localhost:3000/products/${category}`)
      .then((response) => response.json())
      .then((result) => (productLineResponse = result));
  } catch (error) {
    console.log('error', error);
  }
  console.log(productLineResponse);

  for (let i = 0; i < productLineResponse.length; i++) {
    let button = document.createElement('button');
    button.textContent = productLineResponse[i];
    button.id = productLineResponse[i];
    button.className = 'btn';

    button.addEventListener('click', () => {
      chosenProduct(productLineResponse[i]);
    });

    choseProducts.append(button);
  }
};

const chosenProduct = async (product) => {
  console.log(product);

  try {
    await fetch(`http://localhost:3000/product/${product}`)
      .then((response) => response.json())
      .then((result) => (productInfoResponse = result));
  } catch (error) {
    console.log('error', error);
  }

  let textField = document.createElement('p');
  productInfoResponse.forEach((product) => {
    let html = `<h2>product name: ${product.productName}</h2>
    <br />
    <p>product line: ${product.productLine}</p>
    <br />
    <p>product scale: ${product.productScale}</p>
    <br />
    <p>product vendor: ${product.productVendor}</p>
    <br />
    <p>product description: ${product.productDescription}</p>
    <br />
    <p>product quantityInStock: ${product.quantityInStock}</p>
    <br />
    <p>product buyPrice: ${product.buyPrice}</p>
    <br />
    <p>product MSRP: ${product.MSRP}</p>
    <br />`;
    productInfo.innerHTML = html;
  });
};

getCategories();
