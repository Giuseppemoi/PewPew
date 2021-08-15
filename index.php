<?php
//session_start();
// include 'assets/php/connection_db.php';
// include 'assets/php/select.php';
// include 'assets/php/insert.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="Description" content="Ajax quote request" />
    <link rel="stylesheet" href="assets/style.css" />
    <title>Space Invader</title>
</head>
<body>
    <header>
        <p class="control" id="control"><span id="bounce" class="bounce">Please, choose a theme before start.<br>Use your mouse to move the ship, left click to shoot and space key to play/pause</span></p>
        <h1 class="title"><span class="blue">SPACE</span><span class="red">INVADER</span></h1>
        <div class="options">
            <button class="btnTableScore btn" id="btnTableScore">Table Score</button>
            <button class="buttonTheme btn" id="buttonTheme">Themes</button>
        </div>
    </header>
    <div class="buttons">
        <button class="buttonStart btn" id="buttonStart" disabled="true">Start game</button>
        <button class="buttonReset btn" id="buttonReset">Play again</button>
        <p class="data">Timer<span id="gameTime"></span></p>
        <p class="data" id="targetIt">Score<span id="score" class="score"></span></p>
        <div class="data bonus" id="bonus">
            <h5>Bonus</h5>
            <span id="shield" class="shield">
                <img src="assets/img/shield.png">
                <div class="shieldTime" id="shieldTime">00 : 00</div>
            </span>
            <span id="triple" class="triple">
                <img src="assets/img/triple.png">
                <div class="tripleTime" id="tripleTime">00 : 00</div>
            </span>
            <span id="cleaner" class="cleaner">
                <img src="assets/img/cleaner.png">
                <progress id="cleanerTime" class="cleanerTime" max="100" value="0"></progress>
            </span>
        </div>
        <div id="liveFlex" class="liveFlex">
            <h5 class="live">Life</h5>
            <div id="loseScore"></div>
            <div id="loseTime"></div>
            <img id="live1" class="heartClass" src="assets/img/heart.png">
            <img id="live2" class="heartClass" src="assets/img/heart.png">
            <img id="live3" class="heartClass" src="assets/img/heart.png">
        </div>
    </div>
    <div class="popup" id="popup" style=''>
        <div class="tableScore" id="tableScore">
        <table>
            <thead>
                <tr>
                    <?php 
                        foreach ($array_keys as $key) {
                            echo "<th>" . ucfirst($key) . "</th>";
                        } ?>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($scores as $value) {?>
            <tr>
                <td><?= $value['name']; ?></td>
                <td><?= $value['score']; ?></td>
                <td><?= $value['time']; ?></td>
                <td><?= date('d-m-Y', strtotime($value['date'])); ?></td>
            </tr>
            <?php } ?>
        </tbody>
    </table>
        </div>
    </div>
    <div id="popUpOver" class="popUpOver">
        <form method="post">
            <h6>GOOD GAME!</h6>
            <p>Insert your name please</p>
            <label for="playerName"></label>
            <input id="playerName" type="text" name="playerName">
            <input type="hidden" name="time_php" value="" id="time_php">
            <input type="hidden" name="score_php" value="" id="score_php">
            <input type="submit" name="submit" id="lose">
        </form>
    </div>
    <canvas id="game"></canvas>
    <img class="none" id="source" src="assets/img/ship.png">
    <img class="none" id="source2" src="assets/img/target.png">
    <img class="none" id="source3" src="assets/img/heart.png">
    <img class="none" id="source4" src="assets/img/shield.png">
    <img class="none" id="source5" src="assets/img/triple.png">
    <img class="none" id="source6" src="assets/img/cleaner.png">
    <img class="none" id="source7" src="assets/img/shipShield.png">
    <footer>
        <a href="https://becode.org/" target="blank">BeCode</a>
        <a href="https://github.com/Giuseppemoi" target="blank">Giuseppe Moi 2021</a>
        <a href="https://mathisvkg.github.io/PewPew/" target="blank">Mathis Vkg</a>
    </footer>
    <script type="module" src="assets/JS/script.js"></script>
    <script type="module" src="assets/JS/themeFunctions.js"></script>
</body>
</html>