class DatabaseConnection {
    constructor() {
        this.createUserURL = "https://oege.ie.hva.nl/~stuifbt1/blok2/analytics/user.php";
    }

    createUser() {
            // define JSON data
            let data = {
                "createPlayer": true,
            };
    
            // convert json data to string
            let jsonData = JSON.stringify(data);
    
            // set content type header to application/json
            let headers = {
                'Content-Type': 'application/json'
            };
    
            // make post request
            httpPost(this.createUserURL, 'json', jsonData, function(result) {
                // success callback
                console.log('Success:', result);
            }, function(error) {
                // error callback
                console.error('Error:', error);
            });
    }

    getPlayerInfo() {
        const playerInfoURL = "https://oege.ie.hva.nl/~stuifbt1/blok2/analytics/user.php?uniqueCode=all";

        httpGet(playerInfoURL, 'json', false, (result) => {
            // success callback
            console.log(result);
        }, function (error) {
            // error callback
            console.error('error:', error);
        })
    }
}