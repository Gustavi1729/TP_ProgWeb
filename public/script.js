document.querySelector(".side-panel-toggle").addEventListener("click", () => {
  document.querySelector(".wrapper").classList.toggle("side-panel-open");
});

const perguntas = document.querySelectorAll(".pergunta");
const chatbox = document.querySelector(".chatbox");
const scrollAPI = document.querySelector("#API");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message

const createChatLi = (message, className) => {

  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
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
    messageElement.textContent = "Algo deu errado! :(";
  }).finally(() => scrollAPI.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  scrollAPI.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("...", "incoming");
    chatbox.appendChild(incomingChatLi);
    scrollAPI.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

sendChatBtn.addEventListener("click", handleChat);



perguntas.forEach(item => {
  item.addEventListener('click', () => {
    chatInput.value = item.textContent;
    handleChat()

  });
});