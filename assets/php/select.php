<?php

$stmt = $pdo->prepare('SELECT * FROM table_scores ORDER BY score DESC LIMIT 10');
$stmt -> execute();
$scores = $stmt->fetchAll();

// echo "<pre>";
// var_dump($scores);
// echo "</pre>";

$stmt->closeCursor();

$array_keys = array_keys($scores[0]);