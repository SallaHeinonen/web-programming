$(document).ready(function() {

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Toiminnot

    // Haetaan sivut ja luodaan painikkeet jokaiselle
    getPageCount().then(totalPages => {
        const paginationDiv = $('#pagination');

        for (let i = 1; i <= totalPages; i++) {
            const button = $('<button>').text(`Page ${i}`);
            button.on('click', function() {
                fetchUserData(i).then(users => {
                    displayUsers(users);
                }).catch(error => 
                window.alert(`Error fetching data for page ${i} `, error));
            });
            paginationDiv.append(button);
        }
    }).catch(error => 
        window.alert('Error fetching page count', error));

    // Näytetään sivut
    function displayUsers(users) {
        const dataTbody = $('#user-data');
        dataTbody.empty();

        users.forEach(user => {
            // Luodaan jokaiselle riville käyttäjätiedot
            const row = $('<tr>');

            row.append($('<td>').text(user.id));
            row.append($('<td>').html(`<img src="${user.avatar}" alt="avatar" width="50" height="50">`));
            row.append($('<td>').text(user.email));
            row.append($('<td>').text(user.first_name));
            row.append($('<td>').text(user.last_name));

            // Painike tietojen muokkaamista varten           
            const editBtn = $('<button>')
                            .addClass('btn btn-primary')
                            .text('Edit')
                            .attr('id', "editBtn")
                            .attr('data-bs-toggle', "modal")
                            .attr("data-bs-target", "#editUserModal");
            editBtn.data('user', user);
            editBtn.on('click', function() {
                hideAlert();
                const userData = $(this).data('user');

                $('#editUserEmail').val(userData.email);
                $('#editUserFirstName').val(userData.first_name);
                $('#editUserLastName').val(userData.last_name);
            });

            // Painike valitun rivin poistamiseen
            const deleteBtn = $('<button>')
                                .addClass('btn btn-danger')
                                .attr('id', "deleteBtn")
                                .text('Delete');
            deleteBtn.on('click', function() {
                row.remove();
                hideAlert();
            });

            row.append($('<td>').append(editBtn).append(deleteBtn));
            dataTbody.append(row);
        });
    }

    // Piilotetaan painikkeet, kun käyttäjä kirjautuu sisään ja uloskirjautumispainike ilmestyy
    function hideButtons() {
        $('#signUpBtn, #loginBtn').hide();

        // Uloskirjautumispainike
        const logOutBtn = $('<button>').addClass('btn btn-danger').text('Logout').attr('id', 'logOutBtn');
        logOutBtn.on('click', function() {
            showButtons();
            hideAlert();
        });
        $('#buttons').append(logOutBtn);
    }

    // Piilotetaan kirjautumispainike ja tuodaan aiemmat painikkeet takaisin
    function showButtons() {
        $('#signUpBtn, #loginBtn').show();
        $('#logOutBtn').remove();
    }
    // Ilmoitusdivin piilotus
    function hideAlert() {
        $('#alertDiv').hide();
    }
    // Kun painiketta klikataan, aiempi ilmoitus piilotetaan
    $('button').on('click', function() {
        hideAlert();
    })

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Järjestelmän painikkeet

    // Painike käyttäjän rekisteröitymiseen
    $('#signUpBtn').on('click', function() {
        let userEmail = 'eve.holt@reqres.in'; // Vakiokäyttäjä simulaatiota varten
        let userPassword = 'null';
        signUser(userEmail, userPassword).then(response => {
            // Ilmestyy ilmoitus rekisteröitymisen onnistumisessa
            signUpAlert(response.data, response.status);
        }).catch(error => {
            window.alert('Registration unsuccessful: ', error);
        });
    });

    // Painike käyttäjän sisäänkirjautumiseen
    $('#loginBtn').on('click', function() {
        let userEmail = 'eve.holt@reqres.in'; // Vakiokäyttäjä simulaatiota varten
        let userPassword = 'null';
        loginUser(userEmail, userPassword).then(response => {
            loginAlert(userEmail);
            hideButtons(); // Painikkeiden piilotus
        }).catch(error => {
            window.alert('Login unsuccessful: ', error);
        });
    });

    // Painike sivujen näyttämiseen
    $('#loadUsersBtn').on('click', function() {
        fetchUserData().then(users => {
            displayUsers(users);
        }).catch(error => 
            window.alert('Error fetching data ', error));
    });

    // Painike kun käyttäjän tietoja muutetaan listassa
    $('#saveEditUserBtn').on('click', function() {
        const editedEmail = $('#editUserEmail').val();
        const editedFirstName = $('#editUserFirstName').val();
        const editedLastName = $('#editUserLastName').val();

        const updatedData = {
            email: editedEmail,
            first_name: editedFirstName,
            last_name: editedLastName
        };

        saveEditedData(updatedData).then(response => {
            editedUserAlert(response);
            $('#editUserModal').modal('hide');
        }).catch(error => {
            window.alert('User edit unsuccessful: ', error);
        });
    });

    // Painike uuden käyttäjän luomista varten
    $("#saveNewUserBtn").on('click', function() {
        const newEmail = $('#createUserEmail').val();
        const newFirstName = $('#createUserFirstName').val();
        const newLastName = $('#createUserLastName').val();

        const newUserData = {
            email: newEmail,
            first_name: newFirstName,
            last_name: newLastName
        };

        createUser(newUserData).then(response => {
            newUsertAlert(response);
            $("#createUserModal").modal("hide");
        }).catch(error => {
            window.alert("User creation unsuccessful: ", error);
        });
    });

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Ilmoitukset

    // Rekisteröitymisen ilmoitus
    function signUpAlert(response, status) {
        const successAlert = $('#alertDiv');
        successAlert.show()
            .removeClass()
            .addClass('alert alert-success')
            .text(`Registration successful. Status: ${status}, Token: ${response.token}`);
    }
    // Ilmoitus kirjautumisesta
    function loginAlert(email) {
        const loginAlert = $('#alertDiv');
        loginAlert.show()
            .removeClass()
            .addClass('alert alert-info')
            .text(`You are logged in as user: ${email}`);
    }
    // Käyttäjän muutetut tiedot ja sen ilmoitus
    function editedUserAlert(response) {
        const editedUserAlert = $('#alertDiv');
        editedUserAlert.show()
            .removeClass()
            .addClass('alert alert-primary')
            .text(`Operation succeeded! Server response: ${JSON.stringify(response)}`);
    }
    // Uuden käyttäjän tiedot ja sen ilmoitus
    function newUsertAlert(response) {
        const newUsertAlert = $('#alertDiv');
        newUsertAlert.show()
            .removeClass()
            .addClass('alert alert-primary')
            .text(`Operation succeeded! Server response: ${JSON.stringify(response)}`);
    }

});