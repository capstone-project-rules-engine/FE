<?php
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  echo json_encode($data); // Echo data as JSON
?>
