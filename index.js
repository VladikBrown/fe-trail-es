var allBtns = document.querySelectorAll('.icon-circle');
var favoriteProducts = [];
var productsToCompare = [];
var hiddenProducts = [];

var allProducts = [...document.querySelectorAll('.component')]
    .map(component => component.id);

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


// for (i = 0; i < allBtns.length; i++) {
//     let btn = allBtns[i];
//     console.log(btn);
//     btn.addEventListener('click', function () {
//         console.log("button toggled to active");
//         let isActive;
//         // check for btn circle and change it's css class
//         if (btn.classList.contains('icon-circle') || btn.classList.contains('icon-circle-active')) {
//             if (!btn.classList.contains('icon-circle-active')) {
//                 btn.classList.remove('icon-circle');
//                 btn.classList.add('icon-circle-active');

//                 let btnNode = btn.childNodes[1];
//                 let filterMarker;

//                 if (btnNode.classList.contains('fa-scale-balanced')) {
//                     btnNode.classList.remove("fa-scale-balanced");
//                     btnNode.classList.add("fa-scale-unbalanced");
//                     filterMarker = 'added-to-comparison'
//                 } else {
//                     btnNode.classList.remove("fa-regular");
//                     btnNode.classList.add("fa-solid");
//                     if (btnNode.classList.contains('fa-heart')) {
//                         filterMarker = 'added-to-liked'
//                     }
//                 }

//                 if (filterMarker) {
//                     let componentNode = btn;
//                     while (!componentNode.classList.contains('component')) {
//                         componentNode = componentNode.parentNode;
//                     }

//                     componentNode.classList.add(filterMarker);
//                 }


//                 isActive = true;
//             } else {
//                 btn.classList.add('icon-circle');
//                 btn.classList.remove('icon-circle-active');
//                 btn.classList.remove('icon-active');

//                 let btnNode = btn.childNodes[1];
//                 let filterMarker;

//                 if (btnNode.classList.contains('fa-scale-unbalanced')) {
//                     btnNode.classList.remove("fa-scale-unbalanced");
//                     btnNode.classList.add("fa-scale-balanced");
//                     filterMarker = 'added-to-comparison'
//                 } else {
//                     btnNode.classList.remove("fa-solid");
//                     btnNode.classList.add("fa-regular");
//                     if (btnNode.classList.contains('fa-heart')) {
//                         filterMarker = 'added-to-liked'
//                     }
//                 }

//                 if (filterMarker) {
//                     let componentNode = btn;
//                     while (!componentNode.classList.contains('component')) {
//                         componentNode = componentNode.parentNode;
//                     }

//                     componentNode.classList.remove(filterMarker);
//                 }
//                 isActive = false;

//             }
//         }

//     })
// }


function handleInactiveProductStateButton(btn) {

    btn.classList.remove('icon-circle');
    btn.classList.add('icon-circle-active');

    let btnNode = btn.childNodes[1];

    if (btnNode.classList.contains('fa-scale-balanced')) {
        btnNode.classList.remove("fa-scale-balanced");
        btnNode.classList.add("fa-scale-unbalanced");

        getProductIdAndPushToCollection(btn, productsToCompare);
    } else
        if (btnNode.classList.contains('fa-heart')) {
            btnNode.classList.remove("fa-regular");
            btnNode.classList.add("fa-solid");

            getProductIdAndPushToCollection(btn, favoriteProducts);
        } else
            if (btnNode.classList.contains('fa-eye')) {
                btnNode.classList.remove("fa-regular");
                btnNode.classList.add("fa-solid");

                getProductElementAndDo(btn, (element) => {
                    element.classList.add("hidden-product");
                    hiddenProducts.push(element.id);
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
            productsToCompare = arrayRemove(productsToCompare, element.id);
        });
    } else
        if (btnNode.classList.contains('fa-heart')) {
            btnNode.classList.remove("fa-solid");
            btnNode.classList.add("fa-regular");

            getProductElementAndDo(btn, (element) => {
                favoriteProducts = arrayRemove(favoriteProducts, element.id);
            });
        } else
            if (btnNode.classList.contains('fa-eye')) {
                btnNode.classList.remove("fa-solid");
                btnNode.classList.add("fa-regular");

                getProductElementAndDo(btn, (element) => {
                    element.classList.remove("hidden-product");
                    hiddenProducts = arrayRemove(hiddenProducts, element.id);
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
    allProducts.forEach(id => {
        console.log(`Product with ${id} made visible}`);
        document.getElementById(id).hidden = false;
    });

    hiddenProducts.forEach(id => {
        document.getElementById(id).classList.add("hidden-product");
    });

    currentFiltering = () => handleAllFiltering();
}

//adding onclick handling for comparison button
let comparisonButton = document.getElementById("show-compared-button");
comparisonButton.addEventListener('click', () => handleCompareProductsClick())

function handleCompareProductsClick() {
    allProducts.forEach(id => {
        console.log(`Product with ${id} made visible}`);
        document.getElementById(id).hidden = true;
    });
    productsToCompare.forEach(id => {
        document.getElementById(id).hidden = false;
    });

    handleHiddenProductsFiltering(document.getElementById("hiddenCheckbox"), productsToCompare);
    currentFiltering = () => handleCompareProductsClick();
}

//adding onclink to show-liked button
let showLikedButton = document.getElementById("show-liked-button");
console.log(showLikedButton);
showLikedButton.addEventListener('click', () => handleShowLikedClick());


function handleShowLikedClick() { 
    allProducts.forEach(id => {
        document.getElementById(id).hidden = true;
    });
    favoriteProducts.forEach(id => {
        document.getElementById(id).hidden = false;
    });

    handleHiddenProductsFiltering(document.getElementById("hiddenCheckbox"), favoriteProducts);
    currentFiltering = () => handleShowLikedClick();
}

//handling checkbox
let showHiddenCheckbox = document.getElementById("hiddenCheckbox");
showHiddenCheckbox.addEventListener('click', (event) => handleHiddenProducts(event.target));

function handleHiddenProducts(showHiddenCheckbox) {
    if (showHiddenCheckbox.checked) {
        hiddenProducts.forEach(id => {
            document.getElementById(id).classList.remove("hidden-product");
        });
    } else {
        hiddenProducts.forEach(id => {
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
        hiddenProducts.forEach(id => {
            document.getElementById(id).hidden = true;
        });
    }
}