import { getData } from "./modules/dataMiner.js";

(() => {

let theTemplate = document.querySelector("#things-template").content,
    theItems = document.querySelector(".things-sect"),
    buttonContainer = document.querySelector('.query-controls'),
    hobbiesList;

    // First: Add Buttons and Events for the buttons, here the connection between the Data in Json File will be linked to JS
    // Important! Json file need a name for the doc="items", hobbiesList id and hobbiesList name
    function addButtons(data) {  //data = the object of Json
        //console.log(data.items); //Inside Data 'items'
        let container = new DocumentFragment(); // Creating a container
        hobbiesList = data.items;
        data.items.forEach(items => { //"for each"only used in arrays. 
            let buttonEl = document.createElement('button'); 
            buttonEl.className = 'lauButtons';
             
            buttonEl.dataset.items = items.hobbiesList.id;  
            //create ID -in Json file, and connect here the ID of each item
            
            buttonEl.textContent = items.hobbiesList.name; 
            //information inside of the button - in Jason file (name will be show in my button)
            
             

            buttonEl.addEventListener('click', buttonEvent) //created an event (click) at "buttonEvent". It is an obligatory step for make it work
            container.appendChild(buttonEl); //add the buttons to the container. AppendChild means paste the given element as a child
        });

        buttonContainer.appendChild(container); 
    }

    // Here we will create a function to tell what will happen after click on the button
    function buttonEvent(){ 
        theItems.textContent = ''; // Removes all children from theItems section
        hobbiesList.forEach(items => { // Iterates the hobbiesList list to match the button with the related hobbies item, and then populates the template and appends to the theThing section
            if(items.hobbiesList.id == this.dataset.items) {
                let panel = theTemplate.cloneNode(true), // clones from template 
                containers = panel.firstElementChild.children; // gets element's first child 

                containers[0].querySelector('img').src = 'images/' + items.hobbiesList.image; // Sets the img element (images folder)
                containers[1].textContent = items.hobbiesList.name;
                containers[2].textContent = items.hobbiesList.description;
                containers[3].textContent = items.hobbiesList.link;
                // container are the text elements that will be on things-description in HTML file
                // it means that it will appear after click on buttons 
                theItems.appendChild(panel); // Appends the new element to the theItems section
            }
        });
    }


    // Loads from JSON and execute the callback function
    getData("./data.json", addButtons);

})();



