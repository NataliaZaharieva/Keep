const list = document.querySelector(".list");
const input = document.querySelector("form input");
const submitBtn = document.querySelector("form button");
const deleteBtn = document.querySelector(".delete-all");

window.onload = getMessages;
submitBtn.addEventListener("click", addItem);
list.addEventListener("click", deleteItem);
deleteBtn.addEventListener("click", deleteAll);

function addItem(event){
  event.preventDefault();
  if(input.value){
    list.innerHTML += `
    <div class="item animate__animated">
      <li class="list-item">${input.value}</li>
      <button class="delete">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
      </button>
    </div>
    `;
    saveMessages(input.value);
    input.value = "";
  }
};

function saveMessages(msg){
  let messages;
  if(localStorage.getItem("messages") === null){
    messages = [];
  } else {
    messages = JSON.parse(localStorage.getItem("messages"));
  }
  messages.push(msg);
  localStorage.setItem("messages", JSON.stringify(messages));
};

function deleteItem(event){
  const item = event.target;
  if(item.classList[0] === "delete"){
    const message = item.parentElement;
    message.classList.add("animate__zoomOut");
    removeFromLocalStorage(message);
    message.addEventListener("transitionend", () => {
      message.remove();
    });
  };
};

function removeFromLocalStorage(div){
  let messages;
  if(localStorage.getItem("messages") === null){
    messages = [];
  } else {
    messages = JSON.parse(localStorage.getItem("messages"));
  }
  let text = div.innerText;
  let newMessages = messages.filter(oldMsg => oldMsg !== text);
  localStorage.setItem("messages", JSON.stringify(newMessages));
}

function getMessages(){
  let messages;
  if(localStorage.getItem("messages") === null){
    messages = [];
  } else {
    messages = JSON.parse(localStorage.getItem("messages"));
  }
  messages.forEach(function(message){
    list.innerHTML += `
    <div class="item animate__animated">
      <li class="list-item">${message}</li>
      <button class="delete">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
      </button>
    </div>
    `;
  });
}

function deleteAll(){
  list.innerHTML = "";
  localStorage.clear();
}