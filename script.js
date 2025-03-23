// load items from local storage 
document.addEventListener("DOMContentLoaded",()=>{
    let items = JSON.parse(localStorage.getItem("toDoItems")) || [];
    items.forEach(item => add_item_to_list(item.text,item.date));
});

function add_item(){
    let item = document.getElementById("box");
    if(item.value.trim()!==""){
        let currentDate = new Date();
        let dateString = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
        add_item_to_list(item.value,dateString);
        save_to_storage(item.value,dateString);
        item.value = "";
    }else {
        alert("please add a value to item....")
    }
}

function add_item_to_list(text,date){
    let list_item = document.getElementById("list_item");
    let make_li = document.createElement("li");
    let item_text = document.createElement("span");
    item_text.innerHTML =  "<input type='checkbox'></input>"+text;

    let item_date = document.createElement("span");
    item_date.textContent = date ;
    item_date.className = "date-time";

    let delete_btn = document.createElement("bitton");
    delete_btn.innerHTML="X";
    delete_btn.className = "delete-btn";

    delete_btn.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
        remove_from_storage(text);
    };
    let edit_btn =document.createElement("button");
    edit_btn.innerHTML = "<i class='far fa-edit'></i>";
    edit_btn.className = "edit-btn";
    edit_btn.onclick = function(){
        let new_text = prompt("Edit your item : ");
        if(new_text && new_text.trim() !== ""){
            item_text.innerHTML =  "<input type='checkbox'></input>"+new_text;
            Update_storage(text,new_text,date);
        }
    }
    make_li.appendChild(item_text);
    make_li.appendChild(item_date);
    make_li.appendChild(edit_btn);
    make_li.appendChild(delete_btn);
    list_item.appendChild(make_li);

}



function save_to_storage(text,date){
    let items = JSON.parse(localStorage.getItem("toDoItems"))|| [];
    items.push({text,date});
    localStorage.setItem("toDoItems",JSON.stringify(items));

}

function remove_from_storage(text){
    let items = JSON.parse(localStorage.getItem("toDoitems"))||[];
    items = items.filter(item=>item.text !== text);
    localStorage.setItem("toDoItems",JSON.stringify(items));
};

function Update_storage(oldText,newText,date){
    let items = JSON.parse(localStorage.getItem("toDoItems"))||[];
    let item = items.find(item => item.text === oldText);
    if(item){
        item.text = newText;
    }
    localStorage.setItem("toDoItems",JSON.stringify(items));

};

