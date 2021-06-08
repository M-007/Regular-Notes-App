// if user adds a note add it to the local storage

showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle=document.getElementById("title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
         notesObj = [];
    }
    else {
        notesObj =JSON.parse(notes);
    }
    myObj={
        text:addTxt.value,
        title:addTitle.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
})

function showNotes()
{
    let notes=localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
   }
   else {
       notesObj =JSON.parse(notes);
   }
   let html=""; 
   notesObj.forEach(function(element,index) {
       html+=`
       <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
       <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
           <hr>
           <p class="card-text">${element.text}</p>
           <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" id="addBtn">Delete Note</button>
       </div>
   </div>`;
   });
   let notesElm=document.getElementById("notes");
   if(notesObj.length ==0)
    {
        notesElm.innerHTML=`<h3>Nothing to display! Add Notes from above. </h3>`;
    }
    else{
        notesElm.innerHTML=html;
    }
    
}

function deleteNote(index)
{
    console.log("I am deleting Note", index);
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let text=search.value.toLowerCase();
    console.log(text);
    let cardNotes=document.getElementsByClassName("noteCard");
    Array.from(cardNotes).forEach(function(element)
    {
        let cardNote=element.getElementsByTagName("p")[0].innerText;
         console.log(typeof cardNote);
        if(cardNote.includes(text))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    })
});