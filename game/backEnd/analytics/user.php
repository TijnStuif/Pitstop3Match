<?php
/*
Example of REST in PHP 
Create https://oege.ie.hva.nl/<hostid>/blok2/user.php (outlined below). 
Use these REST calls, 
GET an existing user: https://oege.ie.hva.nl/<hostid>/blok2/user.php/?id=127.1.1.200
POST id to create a new user: https://oege.ie.hva.nl/<hostid>/blok2/user.php + POST header param createPlayer = <unique_code>

*/

// Allow sources to execute this script.
// * is a wildcard allowing all sources to acces the execution of this script.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

// Set specfic error/debug params for optimal debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Include necessary classes/files
include_once('database.php');




// Retrieve data from the client HTTP request
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Handle request type logic
switch ($requestMethod) {
    case 'PUT':
        // nothing yet  
        break;
      case 'POST':
        // README: https://lornajane.net/posts/2008/accessing-incoming-put-data-from-php
        $params = file_get_contents('php://input'); // Access the request PUT data
        $paramsArray = json_decode($params, true);
        createPlayer($paramsArray);
        break;
      case 'GET':
        findPlayer();  
        break;
      default:
        handleError('Invalid HTTP request method');  
        break;

}



function findPlayer() {

    if(isset($_GET['code'])) {
        $playerUniqueCode = $_GET["code"];
        $dbReturnID = 0;
        $dbAanmaakDatum = 0;

        // Search for player in the database based on GET param playerUniqueCode 
        try {
            $dbConnect = new DatabaseConnection();

            $playerUniqueCode = mysqli_real_escape_string($dbConnect->getConnection(), $playerUniqueCode);

            $statement = "
            SELECT 
                id, aanmaakDatumTijd
            FROM
                Blok2_Speler
            WHERE
                uniqueCode = '" . $playerUniqueCode . "';
            ";    

            // Execute query-statement on the database
            $result = $dbConnect->executeQuery($statement);

            if (!$result) {
                $errorMsg = $dbConnect->getConnection()->error;
                handleError(''. $errorMsg ); 
            } else {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $dbReturnID = $row['id'];
                    $dbAanmaakDatum = $row['aanmaakDatumTijd'];    
                    // Return JSON structured data with requested/needed information about the existing player
                    echo '{"responseType":"ok", "aanmaakDatumTijd":"' . $dbAanmaakDatum . '", "id":' . $dbReturnID . '}';
                }else {                    
                    // No records found, return error notifying the user about this.
                    handleNotFound('user with uniqueCode ' . $playerUniqueCode);
                }
            }

            // Free the result set
            $result->free();

        } catch (Exception $e) {
            $dbReturnID = -1;
            $errorMsg = 'Failed to query the database. Err: ' . $e->getMessage();  
            handleError(''. $errorMsg );       
        }
        
    } else {
        handleError('No unqiue player code received via GET, or use POST with param createPlayer : true to create a new player.');
    }
    
}

function createPlayer($paramsPostArray) {
    $errorMsg = NULL;
    $bCreatePlayer = NULL;
    if(isset($paramsPostArray['createPlayer'])) {

        $uniqueDBCode = -1;
        $dbReturnId = -1;
        $bCreatePlayer = $paramsPostArray["createPlayer"];    

        if ($bCreatePlayer == true) {

            // Add a new player to the database and return player data (row id, uniqueCode, aanmaakDatum)
            try {          
                $dbConnect = new DatabaseConnection();

                // Generate a unique token of 23 characters with a 'player_' prefix (30 characters)
                $uniqueDBCode = uniqid('player_', true);   

                $statement = "
                INSERT INTO Blok2_Speler
                    (uniqueCode, aanmaakDatumTijd)
                VALUES
                    ('" . $uniqueDBCode . "', now());
                ";

                // Execute query-statement on the Database
                $bSucces = $dbConnect->executeQuery($statement);

                if (!$bSucces) {
                    $errorMsg = $dbConnect->getConnection()->error;
                    handleError('Insert failed: '. $errorMsg );
                } else {
                    $dbReturnId = $dbConnect->getConnection()->insert_id;        
                    // Return JSON structured data with requested/needed information about the new player
                    echo '{"responseType":"ok", "uniqueCode": "' . $uniqueDBCode . '"}';            
                }

            } catch (Exception $e) {
                $dbReturnId = -1;
                $errorMsg = 'Failed to query the database. Err: ' . $e->getMessage();
                handleError(''. $errorMsg );
            }          
        }
    } else {
        handleError('No createPlayer POST param received');
    }
}

// Return error code so the client knows what went wrong and can handle accordingly.
function handleError($description) {
    echo '{"responseType":"error", "description":"' . $description . '"}';
}

// Return not found code so the client knows what went wrong and can handle accordingly.
function handleNotFound($description) {
    echo '{"responseType":"NOT_FOUND", "description":"' . $description . '"}';
}





?>