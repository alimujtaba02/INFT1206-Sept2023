//to start, define constants and variables

//stores the name taken from the textbox
const customName = document.getElementById('customname');
//randomizes the story
const randomize = document.querySelector('.randomize');
//creates the story to be displayed
const story = document.querySelector('.story');

//returns a random item stored in an array
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

//defining the strings to be used for the story
//body text for the story 
const storytext= String("It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.");

//arrays xyz, to be added to the story
const insertX=["Willy the Goblin", "Big Daddy","Father Christmas"];
const insertY=["the soup kitchen","Disneyland","the White House"];
const insertZ=["spontaneously combusted","melted into a puddle on the sidewalk","turned into a slug and crawled away"];

//adding in the event listeners to complete the story
randomize.addEventListener('click', result);

function result() {
//creating a new story
let newstory= storytext;
//creating items xyz, which take from the respective arrays
const xItem= randomValueFromArray(insertX);
const yItem= randomValueFromArray(insertY);
const zItem= randomValueFromArray(insertZ);

//overriding the story to replace the values
newstory= newstory.replaceAll(':insertx:', xItem);
newstory= newstory.replaceAll(':inserty:', yItem);
newstory= newstory.replaceAll(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    //adding the new name in place of bob
    newstory=newstory.replaceAll('Bob', name)

  }

  if(document.getElementById("uk").checked) {
    // Convert 300 pounds to stones and round the result
    const weight = Math.round(300 * 0.0714286) + ' stone'; //to concatenate stone

    // Convert 94 Fahrenheit to Celsius and round the result
    const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade'; // concatenate centigrade

    // placing the new values into the story
    newstory = newstory.replaceAll('94 fahrenheit', temperature);
    newstory = newstory.replaceAll('300 pounds', weight);

  }

  //appending the story to the html 
  story.textContent = newstory;
  story.style.visibility = 'visible';
}
