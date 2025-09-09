const CategoriesContainer = document.getElementById('CategoriesContainer')
const cardContainer = document.getElementById('cardContainer');
const YourcardContainer = document.getElementById('YourcardContainer');
const TotalMoney = document.getElementById('TotalMoney')

let cart = [];

const loadplants = () => {
     CategoriesSpiner(true)
     const url = 'https://openapi.programming-hero.com/api/categories';
     fetch(url)
          .then(res => res.json())
          .then(data => {
               loadplantsdaitls(data.categories)
          })
}

const removwActiveButton = () => {
     const activeRemoveBtn = document.querySelectorAll('.activeRemoveBtn');
     activeRemoveBtn.forEach(remove => remove.classList.remove('active'))
}

const CategoriesSpiner = (stats) => {
     if (stats) {
          document.getElementById('CategoriesContainer').classList.add('hidden');
          document.getElementById('CategoriesSpiner').classList.remove('hidden')
     } else {
          document.getElementById('CategoriesContainer').classList.remove('hidden');
          document.getElementById('CategoriesSpiner').classList.add('hidden')
     } 
}

const cardSpiner = (stats) => {
     if (stats) {
          document.getElementById('CategoriesSpinerTwo').classList.remove('hidden')
          document.getElementById('cardContainer').classList.add('hidden')
     } else {
          document.getElementById('CategoriesSpinerTwo').classList.add('hidden')
          document.getElementById('cardContainer').classList.remove('hidden')
     }
}

const LoeadCategories = () => {
     cardSpiner(true)
     const url = 'https://openapi.programming-hero.com/api/plants';
     fetch(url)
          .then(res => res.json())
          .then(data => {
               displayCategories(data.plants)
          });
}

const LoadSingelCategories = (id) => {
     cardSpiner(true)
     const url = `https://openapi.programming-hero.com/api/category/${id}`;
     fetch(url)
          .then(res => res.json())
          .then(data => {
               removwActiveButton()
               const clickBtn = document.getElementById(`clickBtn${id}`);
               clickBtn.classList.add('active')
               handelSingelCategories(data.plants)
          })
}

// All Button click event
const loadplantsDaitlsFun = async (id) => {
     const url = `https://openapi.programming-hero.com/api/plant/${id}`;
     const res = await fetch(url);
     const daitls = await res.json();
     displayLoadPlantsDailtsFunction(daitls.plants)
}

const displayLoadPlantsDailtsFunction = (words) => {
     const dailtsboxContainer = document.getElementById('daitlsContainer')
     dailtsboxContainer.innerHTML = ` 
       <div class="bg-white shadow p-5 overflow-hidden rounded-md">
              <h1 class="font-bold text-xl mb-2">${words.name}</h1>
                <div class="w-full ">
                  <img src=${words.image} alt="" class="object-cover h-[300px] w-full">
                </div>
                <p class="text-black font-bold mr-3 text-lg">category:<span class="font-normal text-gray-500"></span> ${words.category}</p>
                <p class="font-bold text-lg">price: <span class="font-normal text-gray-500">${words.price}</span></p>
                <p class="text-gray-700 text-base md:text-lg"> <span class="font-bold text-black"> description : </span>${words.description}</p>
            </div>
    `
     document.getElementById('my_modal_5').showModal()
}

const handelSingelCategories = (valus) => {
     cardContainer.innerHTML = '';

     valus.forEach(value => {
          const div = document.createElement('div');
          div.innerHTML = `
        <div class="bg-white shadow  p-3 m-10 md:m-0 rounded-xl transition-all hover:bg-gray-200 hover:translate-y-[-5px] cursor-pointer">
                     <div class="">
                        <img src=${value.image} alt="" class="md:h-[200px] md:w-[340px]  w-full h-[300px] object-cover mx-auto">
                     </div>
                     <h2 class="text-lg font-bold" onclick="loadplantsDaitlsFun(${value.id})" >${value.name}</h2>
                     <p class="text-[15px] text-gray-800 h-[100px]">${value.description}</p>
                     <div class="flex justify-between pt-2 items-center">
                        <div class="bg-green-200 px-3 py-1 rounded-3xl text-green-600">
                            ${value.category}
                        </div>
                        <span class="text-lg font-bold">$${value.price}</span>
                     </div>
                     <button  class="btn bg-green-600 text-center w-full mt-2 rounded-xl text-white text-lg"  id="AddmoneyButton${value.id}">Add to Cart</button>
               </div>
      `
          cardContainer.append(div);

          // add to cart event
          document.getElementById(`AddmoneyButton${value.id}`)
            .addEventListener("click", () => addToCart(value));
     })
     cardSpiner(false)
}

LoadSingelCategories();

const displayCategories = (dataload) => {
     dataload.forEach(data => {
          const div = document.createElement('div');
          div.innerHTML = `
       <div class="bg-white shadow  p-3 m-10 md:m-0 rounded-xl transition-all hover:bg-gray-200 hover:translate-y-[-5px] cursor-pointer">
                     <div class="">
                        <img src=${data.image} alt="" class="md:h-[200px] md:w-[340px]  w-full h-[300px] object-cover mx-auto">
                     </div>
                     <h2 class="text-lg font-bold" onclick="loadplantsDaitlsFun(${data.id})" >${data.name}</h2>
                     <p class="text-[15px] text-gray-800">${data.description}</p>
                     <div class="flex justify-between pt-2 items-center">
                        <div class="bg-green-200 px-3 py-1 rounded-3xl text-green-600">
                            ${data.category}
                        </div>
                        <span class="text-lg font-bold">$${data.price}</span>
                     </div>
                     <button  class="btn bg-green-600 text-center w-full mt-2 rounded-xl text-white text-lg" id="AddmoneyButton${data.id}" >Add to Cart</button>
               </div>
        `
          cardContainer.append(div);

          // add to cart event
          document.getElementById(`AddmoneyButton${data.id}`)
            .addEventListener("click", () => addToCart(data));
     })
     cardSpiner(false)
}

LoeadCategories()

const loadplantsdaitls = (data) => {
     CategoriesContainer.innerHTML = '';
     const crealemeneAll = document.createElement('p');
         crealemeneAll.innerHTML =  `
        <div id="clickBtns" 
             onclick="handelAllBtn()" 
             class="transition-all hover:bg-green-600 p-2 rounded-sm cursor-pointer w-[290px] my-4 activeRemoveBtn">
          <p class="text-xl hover:text-white">All Tree</p>
        </div>
     `
     CategoriesContainer.appendChild(crealemeneAll)

     data.forEach(words => {
          const div = document.createElement('div');
          div.innerHTML = `
            <div id="clickBtn${words.id}" onclick="LoadSingelCategories(${words.id})" class="transition-all hover:bg-green-600 p-2 rounded-sm cursor-pointer  mb-5 displayButton activeRemoveBtn">
                 <p class="text-xl hover:text-white"> ${words.category_name}</p>
            </div>
       `
          CategoriesContainer.append(div)
     })
     CategoriesSpiner(false)
}

loadplants();

const handelAllBtn = () => {
     removwActiveButton();
     document.getElementById("clickBtns").classList.add("active");
     LoeadCategories(); 
}



const addToCart = (product) => {
   const existing = cart.find(item => item.id === product.id);
   if(existing){
      existing.quantity += 1;
   }else{
      cart.push({...product, quantity: 1});
   }
   updateCartUI();
};

const updateCartUI = () => {
   YourcardContainer.innerHTML = "";
   let total = 0;

   cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="bg-[#F0FDF4] p-4 rounded-md flex justify-between items-center m-3">
          <div>
            <h1 class="font-bold text-xl">${item.name}</h1>
            <p class="text-lg text-gray-500">৳ ${item.price} x ${item.quantity}</p>
          </div>
          <span class="cursor-pointer text-red-500" onclick="removeFromCart(${item.id})">X</span>
        </div>`;
      YourcardContainer.append(div);
   });

   TotalMoney.innerText = total;
};

const removeFromCart = (id) => {
   cart = cart.filter(item => item.id !== id);
   updateCartUI();
};
