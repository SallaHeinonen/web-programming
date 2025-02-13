// Täällä on toiminnot reqresin kanssa.

// Haetaan sivulukumäärä palvelimelta
function getPageCount() {
    return $.ajax({
        url: 'https://reqres.in/api/users',
        type: 'GET',
    }).then(data => data.total_pages);
}

// Hakee kaikki annetun sivun käyttäjät
function fetchUserData(page) {
    return $.ajax({
        url: `https://reqres.in/api/users?page=${page}`,
        type: 'GET',
    }).then(data => data.data);
}

// Käyttäjä rekisteröityy järjestelmään
function signUser(email, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://reqres.in/api/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ // Simuloidaan rekisteröityminen
          email: email,
          password: password
        }),
        success: function(response, textStatus, jqXHR) {
          resolve({
            data: response,
            status: jqXHR.status // Serveriltä saatu onnistunut statuskoodi
          }); 
        },
        error: function(jqXHR, textStatus, error) {
          reject(error);
        }
      });
    });
  }

// Käyttäjän sisäänkirjautuminen vakiokäyttäjällä
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://reqres.in/api/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          email: email,
          password: password
        }),
        success: function(response) {
          resolve(response.token);
        },
        error: function(jqXHR, textStatus, error) {
          reject(error);
        }
      });
    });
  }

// Käyttäjän muokatut tiedot tallennetaan palvelimelle
function saveEditedData(user) {
    return $.ajax({
      url: 'https://reqres.in/api/users/1',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(user)
    });
}

// Uuden luodun käyttäjän tiedot tallennetaan palvelimelle
function createUser(user) {
    return $.ajax({
      url: 'https://reqres.in/api/users/1',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(user)
    });
}