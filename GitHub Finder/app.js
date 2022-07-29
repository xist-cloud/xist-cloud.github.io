//Init GitHub
const github = new GitHub();

//Init UI
const ui = new UI();

//Search Input
const searchInput = document.getElementById("search-user");
searchInput.addEventListener("keyup", (e) => {
    //Get Input text
    const userText = e.target.value;
    if (userText !== "") {
        //Make HTTP Call
        github.getUser(userText).then((data) => {
            if (data.profile.message === "Not Found") {
                //Show Alert
                ui.showAlert("User not found", "alert alert-danger");
            } else {
                //Show Profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    } else {
        //Clear Profile
        ui.clearProfile();
    }
});
