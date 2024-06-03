<?php 

$images = $_FILES; // массив изображений
$types = ['image/jpeg', 'image/png']; // типы файлов

foreach($images as $image) {
  if(!in_array($image['type'], $types) ){
    die('Incorrect file type');
  } // проверяем расширение

  $fileSize = $image['size'] / 1048576; // получаем размер файла в мегабайтах
  $maxSize = 3; // максимальный размер файла в мегабайтах

  if($fileSize > $maxSize) {
    die('Incorrect file size');
  } // проверяем размер

  if(!is_dir('../uploads')) {
    mkdir('../uploads', 0777, true); 
  } // создаем директорию если ее нет

  $extension = pathinfo($image['name'], PATHINFO_EXTENSION); // получаем расширение

  $fileName = time() . '.' . $extension; // меняем имя файла

  move_uploaded_file($image['tmp_name'], '../uploads/'. $fileName); // перемещаем файл в нужную директорию
}

echo json_encode(["status" => true]); // отправляем ответ