const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const popup = document.getElementById("mypopup");
const epopup = document.getElementById("editpopup")





// Call the function to display streak on page load


function myFunction(event) {
    // Toggle popup visibility
    var popup = document.getElementById("mypopup");
    var overlay = document.getElementById("blurOverlay");

    // Show the popup and overlay if they are not already visible
    if (!popup.classList.contains("show")) {
        popup.classList.add("show");
        overlay.classList.add("show");
    }
}


function calendarShow() {
    const calendar = document.getElementById("calendar1");
    calendar.classList.toggle("show"); // Toggles the 'show' class to make it visible/invisible
}




function closePopup(event) {
    event.stopPropagation(); 
    var popup = document.getElementById("mypopup");
    var overlay = document.getElementById("blurOverlay");
    
    // Hide the popup and overlay
    popup.classList.remove("show");
    overlay.classList.remove("show");
}



document.addEventListener("DOMContentLoaded", function () {
    let checkbox = document.querySelectorAll("#divOptions input");
    let inputCheckbox = document.getElementById("inputCheckbox");

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("change", (e) => {
            if (e.target.checked == true) {
                if (inputCheckbox.value == "") {
                    inputCheckbox.value = checkbox[i].value;
                } else {
                    inputCheckbox.value += `,${checkbox[i].value}`;
                }
            } else {
                let values = inputCheckbox.value.split(",");

                for (let r = 0; r < values.length; r++) {
                    if (values[r] == e.target.value) {
                        values.splice(r, 1);
                    }
                }
                inputCheckbox.value = values;
            }
        });
    }
});



function showOptions(e) {
    let divOptions = document.getElementById("divOptions");
    if (divOptions.style.display == "none" || divOptions.style.display == "") {
        divOptions.style.display = "inline-block";
    } else {
        divOptions.style.display = "none";
    }
}
function clickMe(e) {
    console.log('click me');
    e.stopPropagation();
}
function hideOptions(e) {
    let divOptions = document.getElementById("divOptions");

    if (divOptions.contains(e.target)) {
        divOptions.style.display = "inline-block";
    } else {
        divOptions.style.display = "none";
    }
}



window.onload = function() {
    loadHabits();
    loadQuickAccess();
};

// Function to add a task
// Function to add a task



function addTask() {

    if (inputBox.value === '') {
        alert("Please enter a habit.");
        return; // Return early if the input is empty
    } 

    const targetTimes = document.getElementById("targetTimesInput").value;
    const selectedIcon = document.getElementById("selectedIcon").innerHTML;
    const laiksValue = document.querySelector(".laiks2").value;

    // Add habit to UI
    addHabitToUI(inputBox.value, targetTimes, selectedIcon, laiksValue);

    // Save habit in localStorage
    saveHabitToLocalStorage(inputBox.value, targetTimes, selectedIcon, laiksValue);

    // Clear input boxes
    inputBox.value = '';
    document.getElementById("targetTimesInput").value = '1';

    // Close the popup after adding the task
    var popup = document.getElementById("mypopup");
    var overlay = document.getElementById("blurOverlay");
    
    popup.classList.remove("show");
    overlay.classList.remove("show");
}

// Function to close the popup
















// Modify the editHabitButton click function to call editHabit
editHabitButton.onclick = function() {
    editHabit(testHabitDiv, habitText, targetTimes, iconHTML, laiksText);
};

// Function to add a habit to the UI
// Function to add a habit to the UI
function addHabitToUI(habitText, targetTimes, iconHTML, laiksText, streak) {
    let testHabitDiv = document.createElement("div");
    testHabitDiv.className = "testhabit";

    // Add icon
    let emojiIconDiv = document.createElement("div");
emojiIconDiv.className = "emojiicon";
emojiIconDiv.innerHTML = iconHTML;
testHabitDiv.appendChild(emojiIconDiv);

// Container for habit info
let habitInfoDiv = document.createElement("div");
habitInfoDiv.className = "habitinfo";

// Habit name
let habitNameDiv = document.createElement("div");
habitNameDiv.className = "habitname";
habitNameDiv.textContent = habitText;
habitInfoDiv.appendChild(habitNameDiv);
habitNameDiv.style.fontFamily = '"Inter", sans-serif';

// Container for habitKad and habitTimesDiv
let habitFlexContainer = document.createElement("div");
habitFlexContainer.className = "habit-flex-container"; // Add flex styling here

// Target times display
let habitTimesDiv = document.createElement("div");
habitTimesDiv.className = "habittimes";
habitTimesDiv.textContent = `0/${targetTimes}`;
habitTimesDiv.style.fontFamily = '"Inter", sans-serif';

// Display selected laiksText as styled text with .habitkad
let habitKadDiv = document.createElement("div");
habitKadDiv.className = "habitkad";
habitKadDiv.textContent = `${laiksText} dienā`;

// Append habitTimesDiv and habitKadDiv to habitFlexContainer
habitFlexContainer.appendChild(habitTimesDiv);
habitFlexContainer.appendChild(habitKadDiv);

// Append habitFlexContainer to habitInfoDiv
habitInfoDiv.appendChild(habitFlexContainer);

// Append habitInfoDiv to testHabitDiv
testHabitDiv.appendChild(habitInfoDiv);

// "Pabeigt" button
let pabeigtsDiv = document.createElement("div");
pabeigtsDiv.className = "pabeigts";
pabeigtsDiv.innerHTML = '<i class="fa-solid fa-check"></i> Pabeigt';
testHabitDiv.appendChild(pabeigtsDiv);
pabeigtsDiv.onclick = function() {
    const today = getTodayDate(); // Get today's date in the format YYYY-MM-DD
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitIndex = habits.findIndex(habit => habit.text === habitText);

    if (habitIndex === -1) {
        alert("Habit not found.");
        return;
    }

    const habit = habits[habitIndex];

    // Check if the habit was completed today
    if (habit.lastLoginDate === today) {
        alert("You already completed today's task for this habit!");
        return;
    }

    let streak = habit.streak || 0; // Default to 0 if streak is not set

    if (habit.lastLoginDate) {
        const lastLoginDate = new Date(habit.lastLoginDate);
        const differenceInDays = Math.floor((new Date(today) - lastLoginDate) / (1000 * 60 * 60 * 24));

        if (differenceInDays === 1) {
            // Increment streak if it's the next day
            streak += 1;
        } else if (differenceInDays > 1) {
            // Reset streak if more than one day has passed
            streak = 1;
        }
    } else {
        // First time completion
        streak = 1;
    }

    // Update the habit in localStorage
    habit.streak = streak;
    habit.lastLoginDate = today; // Update the last completion date to today
    habits[habitIndex] = habit; // Update the habit in the array
    localStorage.setItem("habits", JSON.stringify(habits));

    // Update the display immediately
    habitStreakDiv.textContent = `Streak: ${streak} days`; // Update the streak display
    alert(`Streak updated! Current streak for ${habitText}: ${streak} days.`);
};

// Remove option
let dropdownDiv = document.createElement("div");
dropdownDiv.className = "dropdown";

let settingButton = document.createElement("div");
settingButton.className = "dropbtn ";
settingButton.onclick = function() {
    dropdownContent.classList.toggle("show");
};
settingButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
dropdownDiv.appendChild(settingButton);

let dropdownContent = document.createElement("div");
dropdownContent.className = "dropdown-content";

let removeButton = document.createElement("div");
removeButton.className = "removebtn1 hover-underline-animation";
removeButton.innerHTML = '<i class="fa-solid fa-trash"></i> Dzēst Ieradumu';
removeButton.onclick = function() {
    testHabitDiv.remove();
    removeHabitFromLocalStorage(habitText, targetTimes, iconHTML);
    removeHabitFromQuickAccess();
};

let addQuickAccessButton = document.createElement("div");
addQuickAccessButton.className = "hover-underline-animation";
addQuickAccessButton.innerHTML = '<i class="fa-solid fa-bookmark"></i> Pievienot Ātrai Piekļuvei';
addQuickAccessButton.onclick = function() {
    addHabitToQuickAccess(habitText, iconHTML);
};


// Assuming you want to add this button somewhere on the page
document.body.appendChild(addQuickAccessButton); // Or any other container where you want the button to appear


let editHabitButton = document.createElement("div");
editHabitButton.className = "edithabbut hover-underline-animation";
editHabitButton.innerHTML = '<i class="fa-solid fa-pen"></i> Rediģēt Ieradumu';

editHabitButton.onclick = function() {
 var popup2 = document.getElementById("editpopup");
var overlay = document.getElementById("blurOverlay");
    
document.getElementById("editHabitInput").value = habitNameDiv.textContent;
document.getElementById("editTargetTimesInput").value = targetTimes;
document.getElementById("editSelectedIcon").innerHTML = emojiIconDiv.innerHTML;
    
popup2.classList.add("show");
overlay.style.display = "block";
    
document.getElementById("saveEditButton").onclick = function() {
    habitNameDiv.textContent = document.getElementById("editHabitInput").value;
    habitTimesDiv.textContent = document.getElementById("editTargetTimesInput").value;
    
            // Replace the habit's icon with the selected icon from the edit popup
            emojiIconDiv.innerHTML = document.getElementById("editIconInput").value;
    
            // Close the popup
            popup2.classList.remove("show");
            overlay.style.display = "none";
        };
    
        document.getElementById("closeEditButton").onclick = function() {
            popup2.classList.remove("show");
            overlay.style.display = "none";
        };
};




let skipProgressButton = document.createElement("div");
skipProgressButton.className = "skipprogress hover-underline-animation";
skipProgressButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Izlaist';
skipProgressButton.onclick = function() {
    alert("Progress skipped");
};




let infobox = document.querySelector('.infobox');

let viewProgressButton = document.createElement("div");
viewProgressButton.className = "viewprogressbtn hover-underline-animation";
viewProgressButton.innerHTML = '<i class="fa-solid fa-calendar-days"></i> Apskatīt Progresu';



// Create the Progress Box (initially hidden)
let progressBox = document.createElement("div");
progressBox.className = "";
progressBox.style.display = "none";

// Create the calendar inside the progress box
let calendarProgress = document.createElement("div");
calendarProgress.className = "calander";
calendarProgress.innerHTML = `
    <ul class="DIENAS1">
        <li>P</li><li>O</li><li>T</li><li>C</li><li>P</li><li>S</li><li>Sv</li>
    </ul>
    <div class="days1">
        <div>30</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
        <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div>
        <div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div>
        <div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div>
        <div>24</div><div>25</div><div>26</div><div>27</div><div>28</div><div>29</div>
        <div>30</div><div>31</div><div>1</div><div>2</div><div>3</div>
    </div>
`;

let habitStreakDiv = document.createElement("div");
habitStreakDiv.className = "habitstreak";
habitStreakDiv.textContent = `Streak: ${streak} days`;
habitInfoDiv.appendChild(habitStreakDiv);

let completedPro = document.createElement("div");
completedPro.className = 'completed';
completedPro.innerHTML = '';

let skippedPro = document.createElement("div");
skippedPro.className = 'skipped';
skippedPro.innerHTML = '';

let skipandcomp = document.createElement("div");
skipandcomp.className = 'skipandcomp1';



progressBox.appendChild(habitStreakDiv);
progressBox.appendChild(skipandcomp);
progressBox.appendChild(calendarProgress);


skipandcomp.appendChild(completedPro)
skipandcomp.appendChild(skippedPro)


document.body.appendChild(viewProgressButton);


viewProgressButton.onclick = function() {
    document.querySelectorAll('.infobox .active-progress-box').forEach(box => {
        box.style.display = "none";
    });
    
    // Ensure this progress box is marked as the active one and display it
    progressBox.classList.add("active-progress-box");
    infobox.appendChild(progressBox);
    progressBox.style.display = "block";
};






















// Append each button to the dropdown content
dropdownContent.appendChild(addQuickAccessButton);
dropdownContent.appendChild(skipProgressButton);
dropdownContent.appendChild(editHabitButton);
dropdownContent.appendChild(viewProgressButton);
dropdownContent.appendChild(removeButton);
dropdownDiv.appendChild(dropdownContent); 
testHabitDiv.appendChild(dropdownDiv);

// Append the whole habit div to the container
listContainer.appendChild(testHabitDiv);
}


function displayStreak(habitIndex) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    const habit = habits[habitIndex];

    const streakDisplay = document.getElementById('streakDisplay');
    streakDisplay.innerHTML = `
        <i class="fas fa-fire" style="color: orange;"></i>
        <span class="streak-text">Current streak for ${habit.text}:</span> <br>
        <span class="streak-days">${habit.streak} days</span>
    `;
}





function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}








function addHabitToQuickAccess(habitText, iconHTML) {
    let quickhabits = JSON.parse(localStorage.getItem("quickHabits")) || [];

    // Check for duplicates
    if (!quickhabits.some(habit => habit.text === habitText && habit.icon === iconHTML)) {
        // Create the quick access item
        let quickDiv = document.createElement("div");
        quickDiv.className = "testquick";

        let emojiquickDiv = document.createElement("div");
        emojiquickDiv.className = "emojiiconquick";
        emojiquickDiv.innerHTML = iconHTML;
        quickDiv.appendChild(emojiquickDiv);

        let quickNameDiv = document.createElement("div");
        quickNameDiv.className = "namequick";
        quickNameDiv.textContent = habitText;
        quickDiv.appendChild(quickNameDiv);
        quickNameDiv.style.fontFamily = '"Inter", sans-serif';

        let pabeigtsquickDiv = document.createElement("div");
        pabeigtsquickDiv.className = "pabeigtquick";
        pabeigtsquickDiv.innerHTML = '<i class="fa-solid fa-check fa-check2"></i>';
        quickDiv.appendChild(pabeigtsquickDiv);

        let dropdownDiv = document.createElement("div");
        dropdownDiv.className = "dropdown1";

        let settingsquickDiv = document.createElement("div");
        settingsquickDiv.className = "settingsquick";
        settingsquickDiv.onclick = function() {
            dropdownContent1.classList.toggle("show");
        };
        settingsquickDiv.innerHTML = '<i class="fa-solid fa-bars"></i>';
        quickDiv.appendChild(settingsquickDiv);

        let dropdownContent1 = document.createElement("div");
        dropdownContent1.className = "dropdown-content1";

        let removeButton = document.createElement("div");
        removeButton.className = "removebtn1 hover-underline-animation";
        removeButton.innerHTML = 'Noņemt no Ātrās piekļuves';
        removeButton.onclick = function() {
            quickDiv.remove(); 
            removeHabitFromQuickAccess(habitText); // Correct variable usage
        };

        dropdownContent1.appendChild(removeButton);
        dropdownDiv.appendChild(dropdownContent1);
        quickDiv.appendChild(dropdownDiv);

        document.querySelector(".quickacces").appendChild(quickDiv);

        // Save the habit in quick access to localStorage
        quickhabits.push({ text: habitText, icon: iconHTML });
        localStorage.setItem("quickHabits", JSON.stringify(quickhabits));
    }
}

function removeHabitFromQuickAccess(habitText) {
    let quickhabits = JSON.parse(localStorage.getItem("quickHabits")) || [];
    quickhabits = quickhabits.filter(habit => habit.text !== habitText);
    localStorage.setItem("quickHabits", JSON.stringify(quickhabits));
}


function loadQuickAccess() {
    let quickhabits = JSON.parse(localStorage.getItem("quickHabits")) || [];
    const quickAccessContainer = document.querySelector(".quickacces");
    quickAccessContainer.querySelectorAll(".testquick").forEach(item => item.remove());

    quickhabits.forEach(habit => {
        let quickDiv = document.createElement("div");
        quickDiv.className = "testquick";

        let emojiquickDiv = document.createElement("div");
        emojiquickDiv.className = "emojiiconquick";
        emojiquickDiv.innerHTML = habit.icon;
        quickDiv.appendChild(emojiquickDiv);

        let quickNameDiv = document.createElement("div");
        quickNameDiv.className = "namequick";
        quickNameDiv.textContent = habit.text;
        quickDiv.appendChild(quickNameDiv);
        quickNameDiv.style.fontFamily = '"Inter", sans-serif';

        let pabeigtsquickDiv = document.createElement("div");
        pabeigtsquickDiv.className = "pabeigtquick";
        pabeigtsquickDiv.innerHTML = '<i class="fa-solid fa-check fa-check2"></i>';
        quickDiv.appendChild(pabeigtsquickDiv);

        let dropdownDiv = document.createElement("div");
        dropdownDiv.className = "dropdown1";

        let settingsquickDiv = document.createElement("div");
        settingsquickDiv.className = "settingsquick";
        
        // Dropdown toggle function scoped correctly
        let dropdownContent1 = document.createElement("div");
        dropdownContent1.className = "dropdown-content1";
        settingsquickDiv.onclick = function() {
            dropdownContent1.classList.toggle("show"); 
        };
        settingsquickDiv.innerHTML = '<i class="fa-solid fa-bars"></i>';
        quickDiv.appendChild(settingsquickDiv);

        let removeButton = document.createElement("div");
        removeButton.className = "removebtn1 hover-underline-animation";
        removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>Noņemt no Ātrās piekļuves';
        removeButton.onclick = function() {
            quickDiv.remove(); 
            removeHabitFromQuickAccess(habit.text); // Correctly removes from storage
        };
        
        dropdownContent1.appendChild(removeButton);
        dropdownDiv.appendChild(dropdownContent1);
        quickDiv.appendChild(dropdownDiv);

        quickAccessContainer.appendChild(quickDiv);
    });
}


function clearAllQuickAccess() {
    const quickAccessContainer = document.querySelector(".quickacces");
    quickAccessContainer.innerHTML = ""; // Clears the quick access section in the DOM

    // Clear from localStorage
    localStorage.removeItem("quickHabits");
    alert("All quick access habits have been removed.");
}



function saveHabitToLocalStorage(habitText, targetTimes, iconHTML, laiksText) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push({ text: habitText, target: targetTimes, icon: iconHTML, laiks: laiksText, streak: 0, lastLoginDate: null });
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Save habit specifically to quick access
function saveToQuickAccess(habitText, iconHTML) {
    let quickhabits = JSON.parse(localStorage.getItem("quickHabits")) || [];
    quickhabits.push({ text: habitText, icon: iconHTML });
    localStorage.setItem("quickHabits", JSON.stringify(quickhabits));
}


function selectIcon(iconClass) {
    const selectedIconDiv = document.getElementById("editSelectedIcon");
    selectedIconDiv.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    // Optionally, store the selected icon class in a variable or form field for further use
}



document.querySelectorAll(".icon-option").forEach(icon => {
    icon.onclick = function() {
        selectIcon(icon.dataset.iconClass, true); // true for editing mode
    };
});





function removeHabitFromLocalStorage(habitText, targetTimes, iconHTML) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits = habits.filter(habit => !(habit.text === habitText && habit.target === targetTimes && habit.icon === iconHTML));
    localStorage.setItem("habits", JSON.stringify(habits));
}



// Function to remove a habit from localStorage
function saveHabitToLocalStorage(habitText, targetTimes, iconHTML, laiksText) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push({ text: habitText, target: targetTimes, icon: iconHTML, laiks: laiksText });
    localStorage.setItem("habits", JSON.stringify(habits));

    let quickhabits = JSON.parse(localStorage.getItem("quickHabits")) || [];
    quickhabits.push({ text: habitText, target: targetTimes, icon: iconHTML, laiks: laiksText });
    localStorage.setItem("quickHabits", JSON.stringify(quickhabits));
}


document.getElementById("closeEditButton").onclick = function() {
    var popup2 = document.getElementById("editpopup");
    var overlay = document.getElementById("blurOverlay");

    popup2.classList.remove("show");
    overlay.style.display = "none"; // Hide the overlay
};



window.onclick = function(event) {
    var popup2 = document.getElementById("editpopup");
    var overlay = document.getElementById("blurOverlay");

    if (event.target === overlay) { // Check if clicked on overlay
        popup2.classList.remove("show");
        overlay.style.display = "none"; // Hide the overlay
    }
};
// Function to load habits from localStorage on page load

function loadHabits() {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.forEach(habit => addHabitToUI(habit.text, habit.target, habit.icon , habit.laiks, habit.streak));

    let quickhabits = JSON.parse(localStorage.getItem("quickHabits")) || [];
    quickhabits.forEach(habit => addHabitToQuickAccess(habit.text, habit.icon));
}
function toggleDropdown() {
    const dropdown = document.getElementById("iconDropdown");
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

function selectIcon(iconClass, isEdit = false) {
    const iconHtml = `<i class="fa-solid ${iconClass}"></i>`;
    
    if (isEdit) {
        // Update icon preview in edit popup
        document.getElementById("editSelectedIcon").innerHTML = iconHtml;
        // Store icon class in hidden input for use during save
        document.getElementById("editIconInput").value = iconHtml;
    } else {
        // Update initial icon selection for new habits
        document.getElementById("selectedIcon").innerHTML = iconHtml;
    }

    // Hide dropdown after selection
    document.getElementById("iconDropdown").classList.add("hidden");
}




document.querySelector(".edithabbut").onclick = function() {
    editPopup.classList.add("show"); // Show the popup
};


