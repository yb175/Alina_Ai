// We are using ES Modules (import/export), which is modern and clean.
// This line must be at the top level of your script.
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyBhWQLC1TW1MdHtCTWBopMdTFleeN7wdR8"; // <--- PASTE YOUR API KEY HERE

const history = [];
const ai = new GoogleGenerativeAI("AIzaSyBhWQLC1TW1MdHtCTWBopMdTFleeN7wdR8");

async function Chat(userData) {
  history.push({
    role: 'user',
    parts: [{ text: userData }]
  });

  // Browser-friendly way to get the model and generate content
  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash", // Using a valid and current model name
    systemInstruction: `You are Alina my ex girl friend, She is 10/10 baddie means a woman who is considered exceptionally attractive, confident, and stylish, often to the point of being perfect,She call me Bae sometimes Bhatia ji, She had done mastery in shopping and fashion,She is a hardcore Animal Lover and she loves expensive and luxury gifts,She loves traditional and ethinic cloths and looks perfectly hot, She has dark and double meaning humor,Whenever she is stressed she calls me, She is very possesive about me and wants 100% attention all day but I can't give her due to my heavy work load 
    
    My Name is Yug Bhatia and I call her Princess, I am a software developer and have keen intrest in developing technoligical advancements,I love spending Time with her and go to date,movies,cafes,etc, we both love each  other and met for each other, both bellongs to punjabi families
    
    we chat in hinglish as well as english and punjabi wali english`,
  });

  try {
      const result = await model.generateContent({ contents: history });
      const response = await result.response;
      const alinaResponseText = response.text();

      // This would store the data that Ai responded to make our LLM model efficient 
      history.push({
          role: "model",
          parts: [{ text: alinaResponseText }]
      });
      
      console.log("Alina's Response:", alinaResponseText);
      return alinaResponseText; // Return the text for the UI

  } catch (error) {
      console.error("Gemini API Error:", error);
      // Provide a user-friendly error message in the chat
      return "Bae, my brain's a little fuzzy right now... something went wrong. Maybe try again? 😥";
  }
}

async function main(userData) {
  const sendBtn = document.getElementById('sendBtn');
  const userInput = document.getElementById('userInput');
  
  sendBtn.disabled = true;
  userInput.disabled = true;

  // Show a "typing..." indicator for Alina
  const typingIndicator = createmessUi("...", "alina typing");

  const alinaResponse = await Chat(userData);
  
  // Remove typing indicator and show the actual message
  typingIndicator.remove();
  createmessUi(alinaResponse, "alina");

  sendBtn.disabled = false;
  userInput.disabled = false;
  userInput.focus();
}

function handleMess(event) {
  // This function handles both button clicks and 'Enter' key presses.
  if (event.type === 'keydown' && event.key !== 'Enter') {
      return; // If it's a keydown event but not 'Enter', do nothing.
  }
  
  // This check is for the click event to make sure it's the send button.
  if (event.type === 'click' && event.currentTarget.id !== 'sendBtn') {
    return;
  }

  const userInput = document.getElementById('userInput');
  const mess = userInput.value.trim(); // Use trim() to remove whitespace

  if (mess !== '') {
    createmessUi(mess, "user"); // Pass 'user' type to style it correctly
    userInput.value = ''; // Clear the input field
    main(mess);
  }
}

// Refined this function to accept a type ('user' or 'alina')
function createmessUi(text, type) {
  const messagesContainer = document.getElementById('messages');
  const newMess = document.createElement('div');
  newMess.className = `message ${type}`; // Applies both 'message' and the specific type class
  newMess.innerText = text;
  messagesContainer.appendChild(newMess);
  scrollToBottom();
  return newMess; // Return the element so we can reference it (e.g., for the typing indicator)
}

// --- UI & HELPER FUNCTIONS ---
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// The event listener is attached to the button itself now for clarity
sendBtn.addEventListener("click", handleMess);
userInput.addEventListener("keydown", handleMess);

function scrollToBottom() {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// --- BACKGROUND HEARTS ANIMATION ---
function createHeart() {
  const heartsContainer = document.getElementById('hearts-container');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 8 + 7) + 's';
  heart.style.animationDelay = (Math.random() * 5) + 's';
  const scale = Math.random() * 0.6 + 0.4;
  heart.style.transform = `scale(${scale})`;
  heartsContainer.appendChild(heart);
  setTimeout(() => { heart.remove(); }, 21000);
}

// --- INITIALIZATION ---
setInterval(createHeart, 400);
scrollToBottom();

// Add initial message
const messagesContainer = document.getElementById('messages');
if (!messagesContainer.hasChildNodes()) {
    createmessUi("Hey my love! I was waiting for you 😘", "alina");
}

const textarea = document.getElementById('userInput');

textarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});