console.log("Oi tudo bom?")

document.querySelector(".side-panel-toggle").addEventListener("click", () => {
    document.querySelector(".wrapper").classList.toggle("side-panel-open");
  });
  
const perguntas = document.querySelectorAll(".pergunta");
const chatbox = document.querySelector(".chatbox");
const scrollAPI = document.querySelector("#API");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}
const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    message = {
        mensagem: userMessage
      };
    const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  };
    // Send POST request to API, get response and set the reponse as paragraph text
    fetch('/', fetchOptions).then(res => res.text()).then(data => {
        messageElement.textContent = data;
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => scrollAPI.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    scrollAPI.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        scrollAPI.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);



perguntas.forEach(item => {
    item.addEventListener('click', () => {
      console.log(`Clicked on: ${item.textContent}`);
      chatInput.value = item.textContent;
      handleChat()
      // Add your event handling logic here
    });
  });