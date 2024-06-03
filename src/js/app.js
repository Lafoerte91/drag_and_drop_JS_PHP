const dragAndDrop = document.querySelector('.drag-and-drop');
let imagesForUpload = [] // массив с файлами
const types = ['image/jpeg', 'image/png']; // типы файлов
const imageList = document.querySelector('.images-list'); // контейнер для картинок
const uploadBtn = document.querySelector('.upload-btn'); // кнопка загрузки

dragAndDrop.addEventListener('dragenter', function(event) {
  event.preventDefault()
  this.classList.add('active')
})
dragAndDrop.addEventListener('dragleave', function(event) {
  event.preventDefault()
  this.classList.remove('active')
})
dragAndDrop.addEventListener('dragover', function(event) {
  event.preventDefault()
})

dragAndDrop.addEventListener('drop', function(event) {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files) // получаем файлы

  files.forEach(file => {
    if(types.includes(file.type)) {
      imagesForUpload.push(file) // записываем файлы в массив
      let imageTmpUrl = URL.createObjectURL(file) // создаем временную ссылку на изображение
      imageList.innerHTML += `
        <img class="images-list-picture" src="${imageTmpUrl}"> 
      ` // вставляем в контейнер
    }
  });

  if(imagesForUpload.length > 0) {  // если есть файлы
    uploadBtn.removeAttribute('disabled') // активируем кнопку
  }
})

const uploadImages = () => { // функция загрузки
  let formData = new FormData() // форма для передачи данных
  imagesForUpload.forEach((image, index) => {
    formData.append(index, image) // записываем файлы в форму
  })
  fetch('core/upload.php', { // запрос на сервер
    method: 'POST', // метод
    body: formData // данные
  })
   .then(response => response.json()) // получаем ответ
  .then(result => {
  if(result.status) {
    alert("Файлы успешно загружены!")
    imagesForUpload = []; // очищаем массив
    imageList.innerHTML = ``; // очищаем контейнер
    uploadBtn.setAttribute('disabled'); // дезактивируем кнопку
  }
  })
}


