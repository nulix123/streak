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
    displayStreak();
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
function addHabitToUI(habitText, targetTimes, iconHTML, laiksText) {
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
    };

    let addQuickAccessButton = document.createElement("div");
    addQuickAccessButton.className = "hover-underline-animation";
    addQuickAccessButton.innerHTML = '<i class="fa-solid fa-bookmark"></i> Pievienot Ātrai Piekļuvei';
    addQuickAccessButton.onclick = function() {
        alert("Habit added to quick access!");
    };

    let editHabitButton = document.createElement("div");
    editHabitButton.className = "edithabbut hover-underline-animation";
    editHabitButton.innerHTML = '<i class="fa-solid fa-pen"></i> Rediģēt Ieradumu';

    // Edit button click handler
    editHabitButton.onclick = function() {
        var popup2 = document.getElementById("editpopup");
        var overlay = document.getElementById("blurOverlay");
    
        // Set the current habit name and icon in the edit popup fields
        document.getElementById("editHabitInput").value = habitNameDiv.textContent;
        document.getElementById("editTargetTimesInput").value = targetTimes;
        document.getElementById("editSelectedIcon").innerHTML = emojiIconDiv.innerHTML; // Show current icon
    
        popup2.classList.add("show");
        overlay.style.display = "block";
    
        document.getElementById("saveEditButton").onclick = function() {
            // Update the habit name and target times based on edit input
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
    

    let viewProgressButton = document.createElement("div");
    viewProgressButton.className = "viewprogressbtn hover-underline-animation";
    viewProgressButton.innerHTML = '<i class="fa-solid fa-calendar-days"></i> Apskatīt Progresu';
    viewProgressButton.onclick = function() {
        alert("Progress viewed");
    };

    let skipProgressButton = document.createElement("div");
    skipProgressButton.className = "skipprogress hover-underline-animation";
    skipProgressButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Izlaist';
    skipProgressButton.onclick = function() {
        alert("Progress skipped");
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
    habits.forEach(habit => addHabitToUI(habit.text, habit.target, habit.icon, habit.laiks));
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


