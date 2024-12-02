"use strict"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getPictures from "./js/pixabay-api.js";
import createMurkup from "./js/render-functions";
const litebox = new SimpleLightbox('.list-js a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'imageTitle',
});
const form = document.querySelector(".form-js");
const list = document.querySelector(".list-js");
const loader = document.querySelector(".loader");


form.addEventListener("submit", toSabmit);

function toSabmit(evt) {
    evt.preventDefault();
    
    const { picture } = evt.target.elements;
    const value = picture.value.trim();
    console.log(value)
     list.innerHTML = ""; 
    if(!value || value === " "){
        { iziToast.show({
      title:":(",         
      message: "Please add request!",
      position: "center",
      color: "red"
            });
            list.innerHTML = ":(";
            return
              
            }
    }
   
loader.classList.remove("hidden");
    getPictures(value)
            .then((data) => {
       
            if (!data.hits.length) { iziToast.show({
      title:"X",         
      message: "Sorry, there are no images matching your search query. Please try again!",
      position: "center",
      color: "red"
            });
                
               list.innerHTML = "<h1>Ooops... 👻</h1>";  
            }
            else {
          

                list.innerHTML = createMurkup(data.hits);
                litebox.refresh(); 
                }           
            
         })
        .catch((error) => console.log(error.message))
        .finally(() => {
            picture.value = "" 
            loader.classList.add("hidden");
            
        })
}