var allBtns = document.querySelectorAll('.icon-circle');

const FAVORITE_PRODUCTS_KEY = "favorite_products";
const PRODUCTS_TO_COMPARE_KEY = "products_to_compare";
const HIDDEN_PRODUCTS_KEY = "hidden_products";
const ALL_PRODUCTS_KEY = "all_products";

localStorage.setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify([]));
localStorage.setItem(PRODUCTS_TO_COMPARE_KEY, JSON.stringify([]));
localStorage.setItem(HIDDEN_PRODUCTS_KEY, JSON.stringify([]));
localStorage.setItem(ALL_PRODUCTS_KEY, JSON.stringify(
    [...document.querySelectorAll('.component')]
        .map(component => component.id)));

var currentFiltering = () => handleAllFiltering();

for (i = 0; i < allBtns.length; i++) {
    let btn = allBtns[i];

    btn.addEventListener('click', function () {
        // check for btn circle and change it's css class
        if (btn.classList.contains('icon-circle-active')) {

            handleActiveProductStateButton(btn);
        } else if (btn.classList.contains('icon-circle')) {

            handleInactiveProductStateButton(btn)
        }
    })
}

function handleInactiveProductStateButton(btn) {

    btn.classList.remove('icon-circle');
    btn.classList.add('icon-circle-active');

    let btnNode = btn.childNodes[1];

    if (btnNode.classList.contains('fa-scale-balanced')) {
        btnNode.classList.remove("fa-scale-balanced");
        btnNode.classList.add("fa-scale-unbalanced");

        let productsToCompare = getProductIdAndPushToCollection(btn, JSON.parse(localStorage.getItem(PRODUCTS_TO_COMPARE_KEY)));
        localStorage.setItem(PRODUCTS_TO_COMPARE_KEY, JSON.stringify(productsToCompare));
    } else
        if (btnNode.classList.contains('fa-heart')) {
            btnNode.classList.remove("fa-regular");
            btnNode.classList.add("fa-solid");

            let favoriteProducts = getProductIdAndPushToCollection(btn, JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY)));
            localStorage.setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify(favoriteProducts));
        } else
            if (btnNode.classList.contains('fa-eye')) {
                btnNode.classList.remove("fa-regular");
                btnNode.classList.add("fa-solid");

                getProductElementAndDo(btn, (element) => {
                    element.classList.add("hidden-product");
                    let hiddenProducts = JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY));
                    hiddenProducts.push(element.id);
                    localStorage.setItem(HIDDEN_PRODUCTS_KEY, JSON.stringify(hiddenProducts))
                });
            }
}

function handleActiveProductStateButton(btn) {
    console.log(btn);
    btn.classList.add('icon-circle');
    btn.classList.remove('icon-circle-active');

    let btnNode = btn.childNodes[1];

    if (btnNode.classList.contains('fa-scale-unbalanced')) {
        btnNode.classList.remove("fa-scale-unbalanced");
        btnNode.classList.add("fa-scale-balanced");

        getProductElementAndDo(btn, (element) => {
            localStorage.setItem(PRODUCTS_TO_COMPARE_KEY,
                JSON.stringify(arrayRemove(JSON.parse(localStorage.getItem(PRODUCTS_TO_COMPARE_KEY)), element.id)));
        });
    } else
        if (btnNode.classList.contains('fa-heart')) {
            btnNode.classList.remove("fa-solid");
            btnNode.classList.add("fa-regular");

            getProductElementAndDo(btn, (element) => {
                localStorage.setItem(FAVORITE_PRODUCTS_KEY,
                    JSON.stringify(arrayRemove(JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY)), element.id)));
            });
        } else
            if (btnNode.classList.contains('fa-eye')) {
                btnNode.classList.remove("fa-solid");
                btnNode.classList.add("fa-regular");

                getProductElementAndDo(btn, (element) => {
                    element.classList.remove("hidden-product");
                    localStorage.setItem(HIDDEN_PRODUCTS_KEY,
                        JSON.stringify(arrayRemove(JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY)), element.id)));
                });
            }
}

function getProductElementAndDo(element, func) {
    while (!element.classList.contains('component')) {
        element = element.parentNode;
    }

    func(element);
}

function getProductIdAndPushToCollection(element, collection) {
    while (!element.classList.contains('component')) {
        element = element.parentNode;
    }

    collection.push(element.id);
    return collection;
}

function arrayRemove(arr, value) {

    return arr.filter(function (arrElem) {
        return arrElem != value;
    });

}

function handleLikedFilter(event) {
    var components = document.querySelectorAll('component');
    for (i = 0; i < components.length; i++) {
        if (components[i].classList.contains('added-to-liked')) {
            components[i].hidden = true;
        }
    }
}

//adding onclick handling for show-all button
let allButton = document.getElementById("show-all-button");
allButton.addEventListener('click', () => handleAllFiltering());

function handleAllFiltering() {
    JSON.parse(localStorage.getItem(ALL_PRODUCTS_KEY)).forEach(id => {
        console.log(`Product with ${id} made visible}`);
        document.getElementById(id).hidden = false;
    });

    currentFiltering = () => handleAllFiltering();
}

//adding onclick handling for comparison button
let comparisonButton = document.getElementById("show-compared-button");
comparisonButton.addEventListener('click', () => handleCompareProductsClick())

function handleCompareProductsClick() {
    JSON.parse(localStorage.getItem(ALL_PRODUCTS_KEY)).forEach(id => {
        document.getElementById(id).hidden = true;
    });
    JSON.parse(localStorage.getItem(PRODUCTS_TO_COMPARE_KEY)).forEach(id => {
        document.getElementById(id).hidden = false;
    });

    handleHiddenProductsFiltering(document.getElementById("hiddenCheckbox"), JSON.parse(localStorage.getItem(PRODUCTS_TO_COMPARE_KEY)));
    currentFiltering = () => handleCompareProductsClick();
}

//adding onclink to show-liked button
let showLikedButton = document.getElementById("show-liked-button");
console.log(showLikedButton);
showLikedButton.addEventListener('click', () => handleShowLikedClick());


function handleShowLikedClick() {
    JSON.parse(localStorage.getItem(ALL_PRODUCTS_KEY)).forEach(id => {
        document.getElementById(id).hidden = true;
    });
    JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY)).forEach(id => {
        document.getElementById(id).hidden = false;
    });

    handleHiddenProductsFiltering(document.getElementById("hiddenCheckbox"), JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS_KEY)));
    currentFiltering = () => handleShowLikedClick();
}

//handling checkbox
let showHiddenCheckbox = document.getElementById("hiddenCheckbox");
showHiddenCheckbox.addEventListener('click', (event) => handleHiddenProducts(event.target));

function handleHiddenProducts(showHiddenCheckbox) {
    console.log(JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY)));
    if (showHiddenCheckbox.checked) {
        JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY)).forEach(id => {
            document.getElementById(id).classList.remove("hidden-product");
        });
    } else {
        JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY)).forEach(id => {
            document.getElementById(id).classList.add("hidden-product");
        });
    }

    currentFiltering();
}


function handleHiddenProductsFiltering(showHiddenCheckbox, filteredProducts) {
    if (showHiddenCheckbox.checked) {
        filteredProducts.forEach(id => {
            document.getElementById(id).hidden = false;
        });
    } else {
        JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY)).forEach(id => {
            document.getElementById(id).hidden = true;
        });
    }
}
