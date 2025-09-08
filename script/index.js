
const loadplants = async () => {
     CategoriesSpiner(true)
     const res = await fetch('https://openapi.programming-hero.com/api/categories');
     const dataJson = await res.json();
     loadplantsdaitls(dataJson.categories)
}


// const removeCayegories = () => {
//      const displayButton = document.querySelectorAll('displayButton');
//      displayButton.forEach(() => )
// }

const CategoriesSpiner = (stats) => {
     if(stats){
          document.getElementById('CategoriesContainer').classList.add('hidden');
          document.getElementById('CategoriesSpiner').classList.remove('hidden')  
     }else{
          document.getElementById('CategoriesContainer').classList.remove('hidden');
          document.getElementById('CategoriesSpiner').classList.add('hidden') 
     }
}


const cardSpiner = (stats) => {
     if(stats){
          document.getElementById('CategoriesSpinerTwo').classList.remove('hidden')
          document.getElementById('cardContainer').classList.add('hidden')
     }else{
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
               // console.log(data.plants);
               displayCategories(data.plants)
          });
}



const displayCategories = (dataload) => {
     const cardContainer = document.getElementById('cardContainer');
     // cardContainer.innerHTML = '';
     dataload.forEach(data => {
          const div = document.createElement('div');
          div.innerHTML = `
       <div class="bg-white shadow  p-3 m-10 md:m-0 rounded-xl transition-all hover:bg-gray-200 hover:translate-y-[-5px] cursor-pointer">
                     <div class="">
                        <img src=${data.image} alt="" class="md:h-[200px] md:w-[340px]  w-full h-[300px] object-cover mx-auto">
                     </div>
                     <h2 class="text-lg font-bold">${data.name}</h2>
                     <p class="text-[15px] text-gray-800">${data.description}</p>
                     <div class="flex justify-between pt-2 items-center">
                        <div class="bg-green-200 px-3 py-1 rounded-3xl text-green-600">
                            ${data.category}
                        </div>
                        <span class="text-lg font-bold">$${data.price}</span>
                     </div>
                     <button class="btn bg-green-600 text-center w-full mt-2 rounded-xl text-white text-lg">Add to Cart</button>
               </div>
  
        `
          cardContainer.append(div);
     })
   cardSpiner(false)
}

LoeadCategories()


const loadplantsdaitls = (data) => {
     // console.log(data)
     const CategoriesContainer = document.getElementById('CategoriesContainer');
     CategoriesContainer.innerHTML = '';

     data.forEach(words => {
          const div = document.createElement('div');
          div.innerHTML = `
            <div onclick="loaditemsword(${words.category_name})" class="transition-all hover:bg-green-600 p-2 rounded-sm cursor-pointer shadow mb-5 displayButton">
                 <p class="text-xl hover:text-white"> ${words.category_name}</p>
            </div>
       `
          CategoriesContainer.append(div)
     })
    CategoriesSpiner(false)
}

loadplants();