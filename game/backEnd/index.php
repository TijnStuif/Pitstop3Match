Readme: 
<br />
<br />

Gebruik deze server omgeving als back-end voor je applicatie. 
<br />
Je kan in deze omgeving d.m.v. PHP en een MySQL database diensten ontwikkelen en beschikbaar stellen. 
<br />

Denk aan: 
<br />

<ul>
<li>Analytics dienst</li>
<li>Login systeem</li>
<li>Store</li>
<li>Highscores en andere social features</li>
<li>etc.</li>
</ul>
<br />


Hoe te beginnen:
<br />
<ul>
<li>Bestudeer en volg een beginners cursus over PHP.</li>
<li>Bestudeer en volg een beginners cursus over SQL.</li>
<li>Bestudeer hoe je MySQL als Database server kan gebruiken.</li>
<li>Bestudeer hoe je de MySQL workbench kan gebruiken voor database ontwerp en realisatie.</li>
<li>Bestudeer wat een webserver en phpMyAdmin is.</li>
<li>Bestudeer wat een Representational State Transfer(REST) architecture is.</li>
<li>Bestudeer hoe je met REST de POST en GET requests kan afhandelen in PHP.</li>
<li>Bestudeer hoe je de POST en GET requests kan gebruiken vanuit je applicatie.</li>
</ul>
<br />


Beschikbare API aanroepen:<br />
Zoek een speler op basis van de unique code waarde: GET https://oege.ie.hva.nl/~USER_ID/blok2/analytics/user.php?code=UNIQUE_CODE_VALUE<br />
POST https://oege.ie.hva.nl/~USER_ID/blok2/analytics/user.php add POST param {'createPlayer' : true}<br />
Wijzig USER_ID en UNIQUE_CODE_VALUE met jouw eigen waarden.<br />
<br />

TODO Volgende stappen:<br />
Vanuit het spel roep je d.m.v. httpGet de user.php aan om een nieuwe speler toe te voegen aan de tabel Blok2_Speler in de Database.<br />
Vanuit het spel roep je d.m.v. httpPost de user.php aan om een speler op basis van unique code op te vragen.<br />
Maak een nieuw php bestand aan om een nieuwe speelsessie te starten. Dit doe je door een nieuwe rij met een SQL INSERT statment toe te voegen. Gebruik hierbij de unique code van de eerder aangemaakte speler.<br />
Bedenk/ontwerp meetpunten voor het spel.<br />
Maak een nieuw php bestand om deze meetmoment in de database te kunnen plaatsen en om deze uit de database te kunnen lezen.<br />
<br />

Sources:
<br />
<a href="https://www.w3schools.com/php/"> Tutorial: w3schools.com/php </a>
<br />
<a href="https://www.w3schools.com/sql/"> Tutorial: w3schools.com/sql </a>
<br />
<a href="https://www.php.net/manual/en"> Manual: php.net/manual </a>
<br />
<a href="https://www.mysql.com/products/workbench/"> Tool: mysql/workbench </a>
<br />
<a href="https://www.phpmyadmin.net/"> Manual: php MyAdmin</a>
<br />
<a href="https://www.restapitutorial.com"> Tutorial: REST tutorial </a>
<br />
<a href="https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/"> Guide: Best practices REST API design </a>
<br />
<br />


PHP versie informatie:
<br />


<?php

// Show the PHP version information of this server installation
phpinfo();


?>


