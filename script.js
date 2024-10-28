// Selecting the button and content elements from the DOM
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to speak the provided text using the SpeechSynthesis API

function speak(text){                 
  let text_speak=new SpeechSynthesisUtterance(text);
  
  text_speak.rate=1
  text_speak.pitch=1
  text_speak.volume=1
  text_speak.lang="hi-IN"
  window.speechSynthesis.speak(text_speak)
}

function wishMe(){
  let day = new Date();
  let hours = day.getHours();
  if(hours>=0 && hours<12){
  speak("Good Morning")
  }
  else if(hours>=12 && hours<16){
  speak("Good Afternoon");  
  }
  else if(hours>=16 && hours<20){   // fixed time conditon to not overlap 
    speak("Good Evening"); 
  }
  else {
    speak("Good Night");
  }
}
window.addEventListener('load',() => {
  wishMe()  
})

let speechRecognation= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition = new speechRecognation()
let isRecognizing = false;  // Flag to track recognition state


recognition.onresult = (event) => {
  console.log(event);
};

recognition.onend = () => {
  isRecognizing = false;  // Reset flag when recognition ends
};

btn.addEventListener("click", () => {
  if (!isRecognizing) {   // start only if not already recognizing
    recognition.start();
    isRecognizing = true;
    btn.style.display="none"
    voice.style.display="block"
  }
});

recognition.onresult = (Event) => {        //basically to find the particular index and pass thru it
  let currentIndex = Event.resultIndex;
  let transcript = Event.results[currentIndex][0].transcript;
  console.log(transcript);
  content.innerText=transcript
  takeCommand(transcript.toLowerCase());
};
function takeCommand(message){
  btn.style.display="flex"
    voice.style.display="none"
  if(message.includes("hello")||message.includes("hey")){
    speak("Hello there! How can I assist you today?")
  }
  else if(message.includes("who are you")){
    speak("I'm Kiwi, A virtual Assistant developed by Nisarg")
  }
  else if(message.includes("hu r u")){
    speak("I'm Kiwi, A virtual Assistant developed by Nisarg")
  }
  else if(message.includes("open youtube")){
    speak("Opening youtube")
    window.open("https://www.youtube.com/")
  }
  else if(message.includes("open google")){
    speak("Opening google")
    window.open("https://www.google.com/")
  }
  else if(message.includes("open instagram")){
    speak("Opening instagram")
    window.open("https://www.instagram.com/")
  }
  else if(message.includes("open linkedin")){
    speak("Opening linkedin")
    window.open("https://www.Linkedin.com/")
  }
  else{
    speak(`This is what I found on google regarding ${message.replace("Kiwi")}`)
    window.open(`https://www.google.com/search?q=${message.replace("Kiwi")}`)
  }
}