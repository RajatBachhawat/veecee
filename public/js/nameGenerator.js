// stores the names that are returned randomly on clicking span#name-generator
var people = ["mom","dad","kid","grandpa","grandma","bestie","colleague","dog","aunt","teacher","long-lost friend","sibling"]
function nameGenerator() {
  // get the currently displayed name
  currName = document.getElementById("name-generator").textContent;
  len = people.length
  // keep generating a new integer till people[index] is different from the current name
  do {
    // Returns a random integer from 0 to len-1:
    index = Math.floor(Math.random() * len);
  } while(people[index]==currName);
  // change the contents of span#name-generator to people[index]
  document.getElementById("name-generator").textContent=people[index];
}