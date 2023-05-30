$("document").ready(() => 
{
    const currency = document.getElementsByTagName("select")[0];
    let page = window.location.pathname.split('.')[0];
    let productPage;

    switch(page)
    {
        case "/page1":
            productPage = "fruit";
            break;
        case "/page2":
            productPage = "sweet";
            break;
        case "/page3":
            productPage = "vegetable";
            break;
        case "/page4":
            productPage = "bakery";
            break;
    }
    
    function fetchApi(currency, product) 
    {
        fetch(`./app/app.php?currency=${currency}&product=${product}`)
        .then(response => response.json())
        .then(result => {
          const container = document.getElementsByClassName("container-body")[0];

          let productElement = "";

          for(let i = 0; i < result.length; i++)
          {
            productElement += `
            <div class="product-block">
                <img
                    src="${result[i].image}" />
                <div class="h">${result[i].name}</div>
                <div class="price-block">
                    <span>${Math.floor(result[i].price * result[i].currency)} ${result[i].currencyUnit}</span>
                </div>
            </div>
            `;
          }

          container.innerHTML = productElement;

        });
    }

    currency.addEventListener("change", () =>
    {
        fetchApi(currency.value.toLowerCase().trim(), productPage); 
    });


    fetchApi(currency.value.toLowerCase().trim(), productPage);
});
