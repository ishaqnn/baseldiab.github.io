class Cart {
  constructor() {
    this.apiUrl = "https://fakestoreapi.com/";
  }
  // =========================================================================
  getProductToCart() {
    fetch(this.apiUrl + "products")
      .then((res) => res.json())
      .then(function (data) {
        const items = readFromStorage("cart");
        let cartProducts = [];
        let totalPrice = 0;
        let siglll = 0;
        //
        for (let i = 0; i < items.length; i++) {
          const item = data.filter((product, index) => product.id == items[i]);
          cartProducts.push(item);
        }
        // console.log(cartProducts);
        $(cartProducts).each(function (i, product) {
          const count = i + 1;
          siglll = product[0].price;
          // =========================================================
          // let singlePrice = product[0].id;
          $(".cart__content").append(
            '<tr id="' +
              product[0].id +
              '"><th scope="row">' +
              count +
              '</th><td class= "fs-6 w-50" >' +
              product[0].title +
              '</td><td class="text-danger fw-bold my-auto  cart__singlePrice  ' +
              '"> ' +
              product[0].price +
              " " +
              // quantity======================
              '</td><td class= "quantity"></i><input type="number" id="quantity"  name="quantity" min="1" value="1" class="cart__box border rounded border-danger text-danger fw-bold  text-center onchange=(' +
              product[0].price +
              ')" >' +
              "</td><td> " +
              '<div class="d-flex justify-content-center align-items-center ' +
              // buttons======================
              ' text-center products__buttons"> ' +
              '<button id="cart__closeButton" class="btn btn-danger mx-2  product__button" onclick="deleteCartElement(' +
              (product[0].id, i) +
              ')"> ' +
              '<i class="fa-solid fa-xmark"></i></button>' +
              '<button id="wish-button" class="btn btn-primary  mx-2 product__button "onclick="addToWish(' +
              product[0].id +
              ',this)">' +
              ' <i class="fa-solid fa-heart"></i> ' +
              "</button></div> </td></tr>"
          );

          // ===================================================
          // Total price
          totalPrice += product[0].price;
        });

        // ===================================================
        // Calculate total price
        $(".cart__price").html("$ " + totalPrice.toFixed(2));
        // ====================================================
        $(".cart__box").on("change", function () {
          let count = Number($(this).val());
          // alert(count);
          $(".cart__box").each(function () {
            $(".cart__singlePrice").each(function (e, i) {
              let price = Number($(this).html());
              let singlePrice = price * count;
              $(this).html(singlePrice.toFixed(2));
            });
            // alert(singlePrice);
          });
        });
        // ====================================================
        // number of cart product in the navbar
        $(".cartCount").html(cartProducts.length);
      });
  }

  // =========================================================================
  // ====================================================================================
}
