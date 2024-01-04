const inputProduct = document.querySelector(`.product-name`);
const inputPrice = document.querySelector(`.product-price`);
const selectCategory = document.querySelector(`.category`);
const inputImage = document.querySelector(`.image`);
const buttonSubmit = document.querySelector(`.btn-submit`);
const tableBody = document.querySelector('tbody');
let productName = [];
let productPrice = [];
let productCategory = [];
let productImage = [];

buttonSubmit.addEventListener(`click`, function () {
    let nameValue = inputProduct.value;
    let priceValue = parseFloat(inputPrice.value);
    let categoryValue = selectCategory.value;
    let imageValue = inputImage.value;


    //Why ot create an object to every songle one? 
    // you needed to create an single object to each item and then push it to a single array.
    let nameOfProduct = {
        name: nameValue,
    };

    let priceOfProduct = {
        price: priceValue.toFixed(2),
    };

    let categoryOfProduct = {
        category: categoryValue,
    };

    let imageOfProduct = {
        image: imageValue,
    };

    productName.push(nameOfProduct);
    productPrice.push(priceOfProduct);
    productCategory.push(categoryOfProduct);
    productImage.push(imageOfProduct);

    saveInLocalStorage(productName, productPrice, productCategory, productImage);
    // Added element to what? need more decriptive name to this method 
    //addElementToHtml/write to html etc.. 
    addElement(inputProduct.value, inputPrice.value, selectCategory.value, inputImage.value);
    // I would extract this to a function
    inputProduct.value = "";
    inputPrice.value = "";
    inputImage.value = "";
})
//this saves you only the latest product to the local storage each time.
function saveInLocalStorage(productName, productPrice, productCategory, productImage) {
    localStorage.setItem(`productName`, JSON.stringify(productName));
    localStorage.setItem(`productPrice`, JSON.stringify(productPrice));
    localStorage.setItem(`productCategory`, JSON.stringify(productCategory));
    localStorage.setItem(`productImage`, JSON.stringify(productImage));
}
//Amazing!!!
function addElement(nameValue, priceValue, categoryValue, imageValue) {
    const newTr = document.createElement(`tr`);
    
    const nameTd = document.createElement('td');
    const nameText = document.createTextNode(nameValue);
    nameTd.appendChild(nameText);
    newTr.appendChild(nameTd);

    const priceTd = document.createElement('td');
    const priceText = document.createTextNode(priceValue);
    priceTd.appendChild(priceText);
    newTr.appendChild(priceTd);

    const categoryTd = document.createElement('td');
    const categoryText = document.createTextNode(categoryValue);
    categoryTd.appendChild(categoryText);
    newTr.appendChild(categoryTd);

    const imageTd = document.createElement(`td`);
    const imageElement = document.createElement(`img`);
    imageElement.src = imageValue;
    imageElement.style.height = `50px`;
    imageElement.style.width = `50px`;
    imageTd.appendChild(imageElement);
    newTr.appendChild(imageTd);

    const deleteButton = document.createElement(`button`);
    const buttonText = document.createTextNode(`X`);
    deleteButton.appendChild(buttonText);
    newTr.appendChild(deleteButton);
    deleteButton.classList.add(`deleteButton`);

    deleteButton.addEventListener(`click`, function () {
        deleteRow(newTr);
    });

    const editTd = document.createElement('td');
    const editBtn = document.createElement('button');
    const editBtnText = document.createTextNode(`Edit`);
    editBtn.appendChild(editBtnText);
    //Aluf!!!
    editBtn.classList.add(`editBtn`);
    editTd.appendChild(editBtn);
    newTr.appendChild(editTd);
    // Amazinggggg!!!!!! 
    editBtn.addEventListener('click', () => {
        const index = Array.from(tableBody.children).indexOf(newTr);

        inputProduct.value = productName[index].name;
        inputPrice.value = productPrice[index].price;
        inputImage.value = productImage[index].image;

        buttonSubmit.addEventListener('click', () => {
            deleteRow(newTr);
        })
    });

    const tableBody = document.querySelector('tbody');
    tableBody.appendChild(newTr);
}



function takeFromLocalStorage() {
    //NICE! but still, You need to think of another way to store the data.
    productName = JSON.parse(localStorage.getItem(`productName`)) || [];
    productPrice = JSON.parse(localStorage.getItem(`productPrice`)) || [];
    productCategory = JSON.parse(localStorage.getItem(`productCategory`)) || [];
    productImage = JSON.parse(localStorage.getItem(`productImage`)) || [];
}

(function () {
    takeFromLocalStorage();
    for (let index = 0; index < productName.length; index++) {
        addElement(productName[index].name, productPrice[index].price, productCategory[index].category, productImage[index].image);
    }
})();

function deleteRow(newTr) {
    const index = Array.from(tableBody.children).indexOf(newTr);

    productName.splice(index, 1);
    productPrice.splice(index, 1);
    productCategory.splice(index, 1);
    productImage.splice(index, 1);

    tableBody.removeChild(newTr);

    saveInLocalStorage(productName, productPrice, productCategory, productImage);
}
