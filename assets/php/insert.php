<?php
// echo '<pre>';
//     //var_dump($time);
//     //var_dump($score);
//     var_dump($_POST);
// echo '</pre>';

$is_not_empty = 
    !empty($_POST["playerName"]) &&
    !empty($_POST["time_php"]) &&
    !empty($_POST["score_php"]);
    
$is_set = 
    isset($_POST["playerName"]);
    isset($_POST["time_php"]);
    isset($_POST["score_php"]);

if (isset($_POST['submit'])) {
    if ($is_not_empty && $is_set) {
        $post_sanitize = [
            'playerName' => filter_var($_POST["playerName"], FILTER_SANITIZE_STRING)
        ];
    
        $form = $pdo->prepare("INSERT INTO table_scores (name, time, score) VALUES (?, ?, ?)");
        $form -> execute([$post_sanitize['playerName'], str_replace(' : ', '', $_POST["time_php"]), $_POST["score_php"]]);
        header('location: /');
    } 
    // else {
    //     echo '<body onLoad="alert(\'Membre non reconnu...\')">';
    // }
}