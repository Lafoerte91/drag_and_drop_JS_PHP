const dragAndDrop = document.querySelector('.drag-and-drop');
let imagesForUpload = [] // массив с файлами
const types = ['image/jpeg', 'image/png']; // типы файлов
const imageList = document.querySelector('.images-list'); // контейнер для картинок

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
})


