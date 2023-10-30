const FAVORITE_PRODUCTS_KEY = "favorite_products";
const PRODUCTS_TO_COMPARE_KEY = "products_to_compare";
const HIDDEN_PRODUCTS_KEY = "hidden_products";
const ALL_PRODUCTS_KEY = "all_products";

var currentFiltering = () => handleAllFiltering();

//init local storage lists
!(localStorage.getItem(FAVORITE_PRODUCTS_KEY)) && localStorage.setItem(FAVORITE_PRODUCTS_KEY, JSON.stringify([]));
!(localStorage.getItem(PRODUCTS_TO_COMPARE_KEY)) && localStorage.setItem(PRODUCTS_TO_COMPARE_KEY, JSON.stringify([]));
!(localStorage.getItem(HIDDEN_PRODUCTS_KEY)) && localStorage.setItem(HIDDEN_PRODUCTS_KEY, JSON.stringify([]));
localStorage.setItem(ALL_PRODUCTS_KEY, JSON.stringify(
    [...document.querySelectorAll('.component')]
        .map(component => component.id)));


document.addEventListener("DOMContentLoaded", () => {

    let favoriteProducts = getItemFromLocalStorage(FAVORITE_PRODUCTS_KEY);

    if (favoriteProducts) {
        favoriteProducts.forEach(id => {
            let elemToUpdade = document.getElementById(id).getElementsByClassName("fa-heart")[0];
            let iconCircleElement = elemToUpdade.parentElement;
            enableHeartIcon(iconCircleElement); 
        });
    }

    let productForComparison = getItemFromLocalStorage(PRODUCTS_TO_COMPARE_KEY);

    if (productForComparison) {
        productForComparison.forEach(id => {
            let elemToUpdade = document.getElementById(id).getElementsByClassName("fa-scale-balanced")[0];
            let iconCircleElement = elemToUpdade.parentElement;
            enableScalesIcon(iconCircleElement);
        });
    }

    let hiddenProducts = getItemFromLocalStorage(HIDDEN_PRODUCTS_KEY);

    if (hiddenProducts) {
        hiddenProducts.forEach(id => {
            let productElement = document.getElementById(id);
            let elemToUpdade = productElement.getElementsByClassName("fa-eye")[0];
            let iconCircleElement = elemToUpdade.parentElement;

            enableEyeIcon(iconCircleElement);
            productElement.hidden = true;
        });
    }
});

var allBtns = document.querySelectorAll('.icon-circle');

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

var handleInactiveProductStateButton = function (btn) {
    let iconNode = btn.childNodes[1];

    switch (true) {
        case iconNode.classList.contains('fa-scale-balanced'): {
            handleAddToComparisonButton(btn);
            break;
        }
        case iconNode.classList.contains('fa-heart'): {
            handleAddToFavoritesButton(btn);
            break;
        }
        case iconNode.classList.contains('fa-eye'): {
            handleAddToHiddenButton(btn);
            break;
        }
    }
}

var handleActiveProductStateButton = function (btn) {
    let iconNode = btn.childNodes[1];

    switch (true) {
        case iconNode.classList.contains('fa-scale-unbalanced'): {
            handleRemoveToComparisonButton(btn);
            break;
        }
        case iconNode.classList.contains('fa-heart'): {
            handleRemoveFromFavoritesButton(btn);
            break;
        }
        case iconNode.classList.contains('fa-eye'): {
            handleRemoveFromHiddenButton(btn);
            break;
        }
    }
}


//active button product state button handlers
var handleRemoveToComparisonButton = function (btnNode) {
    disableScalesIcon(btnNode);
    getProductElementAndDo(btnNode, (element) => {
        removeFromLocalStorageArray(PRODUCTS_TO_COMPARE_KEY, element.id);
    });
}

var handleRemoveFromFavoritesButton = function (btnNode) {
    disableHeartIcon(btnNode);
    getProductElementAndDo(btnNode, (element) => {
        removeFromLocalStorageArray(FAVORITE_PRODUCTS_KEY, element.id);
    });
}

var handleRemoveFromHiddenButton = function (btnNode) {
    disableEyeIcon(btnNode);
    getProductElementAndDo(btnNode, (element) => {
        removeFromLocalStorageArray(HIDDEN_PRODUCTS_KEY, element.id);
    });
}

//inactive button product state button handlers
var handleAddToComparisonButton = function (btnNode) {
    enableScalesIcon(btnNode);
    getElementIdAndPushToLocalStorageArray(PRODUCTS_TO_COMPARE_KEY, btnNode);
}

var handleAddToFavoritesButton = function (btnNode) {
    enableHeartIcon(btnNode);
    getElementIdAndPushToLocalStorageArray(FAVORITE_PRODUCTS_KEY, btnNode);
}

var handleAddToHiddenButton = function (btnNode) {
    enableEyeIcon(btnNode);
    getProductElementAndDo(btnNode, (element) => {
        let hiddenProducts = getItemFromLocalStorage(HIDDEN_PRODUCTS_KEY);
        element.hidden = true;
        hiddenProducts.push(element.id);
        localStorage.setItem(HIDDEN_PRODUCTS_KEY, JSON.stringify(hiddenProducts))
    });
}

//adding onclick handling for show-all button
let allButton = document.getElementById("show-all-button");
allButton.addEventListener('click', () => handleAllFiltering());

var handleAllFiltering = function () {
    handleProductsFiltering(getItemFromLocalStorage(ALL_PRODUCTS_KEY));
    currentFiltering = () => handleAllFiltering();
}

//adding onclick handling for comparison button
let comparisonButton = document.getElementById("show-compared-button");
comparisonButton.addEventListener('click', () => handleCompareProductsClick())

var handleCompareProductsClick = function () {
    getItemFromLocalStorage(ALL_PRODUCTS_KEY).forEach(id => {
        document.getElementById(id).hidden = true;
    });

    handleProductsFiltering(getItemFromLocalStorage(PRODUCTS_TO_COMPARE_KEY));
    currentFiltering = () => handleCompareProductsClick();
}

//adding onclink to show-liked button
let showLikedButton = document.getElementById("show-liked-button");
showLikedButton.addEventListener('click', () => handleShowLikedClick());

var handleShowLikedClick = function () {
    getItemFromLocalStorage(ALL_PRODUCTS_KEY).forEach(id => {
        document.getElementById(id).hidden = true;
    });

    handleProductsFiltering(getItemFromLocalStorage(FAVORITE_PRODUCTS_KEY));
    currentFiltering = () => handleShowLikedClick();
}

//handling checkbox
let showHiddenCheckbox = document.getElementById("hiddenCheckbox");
showHiddenCheckbox.addEventListener('click', () => handleHiddenProducts());

var handleHiddenProducts = function () {
    currentFiltering();
}

function handleProductsFiltering(filteredProducts) {
    let showHiddenCheckbox = document.getElementById("hiddenCheckbox");

    filteredProducts.forEach(id => {
        document.getElementById(id).hidden = false;
    });

    if (!showHiddenCheckbox.checked) {
        getItemFromLocalStorage(HIDDEN_PRODUCTS_KEY).forEach(id => {
            document.getElementById(id).hidden = true;
        });
    }
}


//icons appearence change
var enableHeartIcon = function (btnNode) {
    btnNode.classList.remove('icon-circle');
    btnNode.classList.add('icon-circle-active');

    let iconElement = btnNode.childNodes[1];
    iconElement.classList.remove("fa-regular");
    iconElement.classList.add("fa-solid");
}

var enableScalesIcon = function (btnNode) {
    btnNode.classList.remove('icon-circle');
    btnNode.classList.add('icon-circle-active');

    let iconElement = btnNode.childNodes[1];
    iconElement.classList.remove("fa-scale-balanced");
    iconElement.classList.add("fa-scale-unbalanced");
}

var enableEyeIcon = function (btnNode) {
    btnNode.classList.remove('icon-circle');
    btnNode.classList.add('icon-circle-active');

    let iconElement = btnNode.childNodes[1];
    iconElement.classList.remove("fa-regular");
    iconElement.classList.add("fa-solid");
}

var disableScalesIcon = function(btnNode) {
    btnNode.classList.add('icon-circle');
    btnNode.classList.remove('icon-circle-active');

    let iconElement = btnNode.childNodes[1];

    iconElement.classList.remove("fa-scale-unbalanced");
    iconElement.classList.add("fa-scale-balanced");
}

var disableHeartIcon = function(btnNode) {
    btnNode.classList.add('icon-circle');
    btnNode.classList.remove('icon-circle-active');

    let iconElement = btnNode.childNodes[1];

    iconElement.classList.remove("fa-solid");
    iconElement.classList.add("fa-regular");
}

var disableEyeIcon = function(btnNode) {
    btnNode.classList.add('icon-circle');
    btnNode.classList.remove('icon-circle-active');

    let iconElement = btnNode.childNodes[1];

    iconElement.classList.remove("fa-solid");
    iconElement.classList.add("fa-regular");
}

//util functions
var getProductElementAndDo = function (element, func) {
    while (!element.classList.contains('component')) {
        element = element.parentNode;
    }

    func(element);
}

var getProductIdAndPushToCollection = function (element, collection) {
    while (!element.classList.contains('component')) {
        element = element.parentNode;
    }

    if (collection) {
        collection.push(element.id);
    } else {
        collection = [element.id];
    }
    return collection;
}

var arrayRemove = function (arr, value) {

    return arr.filter(function (arrElem) {
        return arrElem != value;
    });

}

var removeFromLocalStorageArray = function (localStorageKey, elem) {
    localStorage.setItem(localStorageKey,
        JSON.stringify(arrayRemove(JSON.parse(localStorage.getItem(localStorageKey)), elem)));
}

var getElementIdAndPushToLocalStorageArray = function (localStorageKey, htmlElem) {
    let array = getProductIdAndPushToCollection(htmlElem, getItemFromLocalStorage(localStorageKey));
    localStorage.setItem(localStorageKey, JSON.stringify(array));
}

var getItemFromLocalStorage = function (localStorageKey) {
    return JSON.parse(localStorage.getItem(localStorageKey));
}