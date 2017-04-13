# Querty's Quest

#### _**A Role Playing Game.**_, April 13, 2017

#### _**By Tyler Stephenson**_, _**Dominic Brown**_,  _**Nicky Santamaria**_

## Description
A Role Playing Game. Create a character, 7 options to choose from. Determine character stats. Fight against random enemies, 6 total enemy characters.

## Specifications

| Behavior |  Input   |  Output  |
|----------|:--------:|:--------:|
|User should be able to read welcome and click button to hide welcome page and begin creating a character| n/a | hide welcome on click|
|User should be able to input their name and choose their character class and gender of their character from dropdown options which will reveal the image of their character | Name: "Qwerty" Class: "Warrior" Gender: "Male" | Male Warrior Pictures |
|User should be able to click a button and roll a die to reveal random numbers (between 1-8) assigned to their characters stats | n/a | Strength: "8" Dexterity: "6" Intelligence: "3" Constitution: "2" Health: "20" |
|User should be able to click a button and roll a die up to 3 times.| 4 clicks | Rolls left: 0 |
|User should be able to accept the random numbers assigned to their character.| Accept Roll Button | Direct Apply Stats feature appears|
|User should be able to apply 5 additional stat points to whichever stat they choose|Constitution: "3" |Constitution: "8"|
|Once user applies additional stat points, button should appear to hide create character section and open the combat section.| Lets play button appears | Create character section hides, combat section appears|
|User should be able to click on enemy card to reveal new enemy, which will automatically create a random enemy with random stats| "Click to reveal your enemy" | Enemy card appears|
|User should be able to click Attack button to roll a die which will take the character and enemy's highest stat into consideration plus a random number and calculate the different between the total of each| n/a |Character: "8+7=15" Enemy="11+11=22"|
|The difference between the two rolls should show over the card that received hit points| n/a |Character: "-7"|
|The health bar below the individual card should change based on the hit points received |n/a| Character: "80/80", Character: "73/80"|
|If the health bar is below 0 the individual will lose|n/a|Character:"-1", "You Lose", "You Died", Death Card appears|
|If player loses, death card will appear click function will take user to Death Screen|n/a|Death Screen|
|If player reaches death screen a button should appear to take them back to the start of the page.|n/a|"Start Over"|
|If player wins, enemy card will return to Click to reveal your enemy card|n/a|"Click to reveal your enemy"|
|If player wins against two enemies, level up button|n/a|"level up"|
|If player clicks level up button they will be taken back to the create character section, which will be updated to Level Up|n/a|"Level Up"|
|In level up section, player should be able to add 5 additional stat points to whichever stat they choose|Constitution:"9"|Constitution:"14"|
|After player adds stat points "Into the Fray" button should appear, when player clicks button level up section should hide and combat section should reappear and game should begin again|n/a|"Into the Fray!", combat section|
|After player wins against 6 enemies Win screen should appear|n/a|"Yay! You win!!!"|

## Setup/Installation Requirements
* Ensure connection to the Internet
* Enter the following URL in your computer browser to access the active git hub link to this page: https://ilduchea.github.io/rpg/
OR
* On a mac using spotlight search type in terminal
* Once in terminal run the command: cd desktop
* Run the command: git clone https://github.com/ilduchea/rpg
* Run the command: cd rpg
* Open index.html in chrome.
* Run the command: atom .
* This will open all of the files included in the rpg folder including index.html, README.md, jquery-3.2.0.js, scripts.js, bootstrap.css, styles.css, animation.css and img folder
* To make changes to the text on the page that the user will see you will need to access the index.html file.
* To make changes to the look of the file you will need to access the styles.css file.
* To make changes to the functions of the form you will need to access the scripts.js file.

## Known Bugs
_There are no known bugs at this time._

## Support and Contact details
* Tyler Stephenson
* ilduchea@gmail.com

* Dominic Brown
* yeahdom@gmail.com

* Nicole Santamaria
* nicolersantamaria@gmail.com

## Technologies Used
* Atom
* HTML5
* CSS3
* javaScript
* Bootstrap
* Jquery
* Animation css

### License

*This is web page is licensed under the MIT License.*

Copyright (c) 2017 **Tyler Stephenson**,  **Dominic Brown**,  **Nicky Santamaria**
