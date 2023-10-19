function getComponentSample(productId) { return `<div id=${productId} class='component'>
                              <div class='product'>
                                  <div class='upper-label'>New</div>
                                  <div class='icon-circle'>
                                      <a class='fa-regular fa-eye'></a>
                                  </div>

                                  <div class='icon-circle'>
                                      <a class='fa-regular fa-heart'></a>
                                  </div>

                                  <div class='icon-circle'>
                                      <a class='fa-solid fa-scale-balanced'></a>
                                  </div>
                                  <img src='https://cdn.pixabay.com/photo/2023/09/19/12/13/flowers-8262456_1280.jpg'/>
                                  <div class='attributes'>
                                      <div>
                                          <p class='category'>T-SHIRTS</p>
                                      </div>
                                      <div class='rating'>
                                          <span class='fa fa-star checked'></span>
                                          <span class='fa fa-star checked'></span>
                                          <span class='fa fa-star checked'></span>
                                          <span class='fa fa-star'></span>
                                          <span class='fa fa-star'></span>
                                      </div>
                                      <p class='title'>Flared shift dress</p>
                                      <p class='price'>$14</p>
                                  </div>
                              </div>
                              <div>
                                  <button class='add-to-cart-button'>ADD TO CART</button>
                              </div>
                          </div>`}

const productGrid = document.getElementById("product-grid-1");
for (let i = 0; i < 9; i++) {
    productGrid.insertAdjacentHTML("beforeend", getComponentSample(i));
}