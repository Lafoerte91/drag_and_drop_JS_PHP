const dragAndDrop = document.querySelector('.drag-and-drop');

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
  console.log('drop', event.dataTransfer.files[0]) // получаем файл
})