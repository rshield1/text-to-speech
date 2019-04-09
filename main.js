// Init SpeechSynth api
const synth = window.speechSynthesis;

//grab dom elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// INit voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //loop through voices and create an option for each one
    voices.forEach(voice => {
        //create option element
        const option = document.createElement('option');
        //fill option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        // set needed option attributes
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voiceSelect.appendChild(option);
    });
};

getVoices();
    if(synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
}


// Speak
const speak = () => {
    //check if speaking
    if(synth.speaking) {
        console.error('Already speaking...')
        return;
    }
    if(textInput.value !== '') {
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        ;
        //speak end
        speakText.onend = e => {
            console.log('done speaking....');
        }

        // speak error
        speakText.onerror = e => {
            console.error('sonething went wrong');
        }

        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;       
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value

        //speak
        synth.speak(speakText);
        }
};

//event listeners

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur()
});

//rate value change
rate.addEventListener('change', e=>rateValue.textContent = rate.value)

//pitch value change
pitch.addEventListener('change', e=>pitchValue.textContent = pitch.value)

// voice select change
voiceSelect.addEventListener('change', e => speak());
