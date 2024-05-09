// Mecanismo Live Search

    // Seletor HTML

const searchInput = document.querySelector('.nav__input--search')

    // Adicionar evento de busca

searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim().toLowerCase()

    // Filtrar videos baseado nos termos de busca

    fetch(`http://localhost:3000/api/items?search=${searchTerm}`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return response.json()
    })
    .then(filteredData => {
        console.log('Filtered data:', filteredData)
        renderFilteredVideos(filteredData)
    })
    .catch(error => {
        console.error('Error fetching filtered data:', error)
    })
})

// Form & Add Video

let videos = []

    // Seletores HTML

const form = document.querySelector('.form__container')
const videoList = document.querySelector('.section__list')

    // Evento de adição de vídeo

form.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopPropagation()

        // Capturar valor dos inputs

    const videoUrl = form.querySelector('.form__input--add').value 
    const videoTitle = form.querySelector('.form__input--title').value
    const videoCategory = form.querySelector('.form__input--category').value

    // Retirar ID do video

    const urlId = extractVideoId(videoUrl)

    const newVideo = {
        id: generateUniqueId(),
        title: videoTitle,
        category: videoCategory,
        videoId: urlId
    }

    // Armazenar os vídeos em data.json
    
    fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newVideo),
    })
    .then(response => response.json())
    .then(addedVideo => {
        console.log('New Video added:', addedVideo)
        
        // Renderizando os videos

        renderVideos()
    })
    .catch(error => {
        console.error('Error adding new video:', error)
    })

    // Limpando os campos preenchidos

form.reset()

})

// Renderizando Videos

function renderVideos() {

    fetch('http://localhost:3000/api/items')
        .then(response => response.json())
        .then(videos => {

            // Limpando a lista de videos

            videoList.innerHTML = ''

            // Iterando o array de videos para criar um card para cada video

            videos.forEach(video => {

                const li = document.createElement('li')

                li.innerHTML = `
                <div class="video__container" data-video-id="${video.id}">
                    <iframe
                        class="video__iframe"
                        src="https://www.youtube.com/embed/${video.videoId}"
                        frameborder="0"
                        allowfullscreen
                    ></iframe>
                    <div class="video__buttons--container">
                        <button class="video__buttons edit--button">
                        </button>
                        <button class="video__buttons delete--button">
                        </button>
                    </div>
                    <div class="video__info">
                        <div class="video__title--container">
                            <div class="title__icon--container"></div>
                            <h3 class="video__title">${video.title}</h3>
                        </div>
                        <div class="video__category--container">
                            <div class="category__icon--container"></div>
                            <p class="video__category">${video.category}</p>
                        </div>
                    </div>
                </div>`
                videoList.appendChild(li)
            })
        })
        .catch(error => {
            console.error('Error fetching videos:', error)
        })
}

renderVideos()

function renderFilteredVideos(filteredData) {
    videoList.innerHTML = ''
    filteredData.forEach(video => {

        const li = document.createElement('li')

        li.innerHTML = `
        <div class="video__container" data-video-id="${video.id}">
            <iframe
                class="video__iframe"
                src="https://www.youtube.com/embed/${video.videoId}"
                frameborder="0"
                allowfullscreen
            ></iframe>
            <div class="video__buttons--container">
                <button class="video__buttons edit--button">
                </button>
                <button class="video__buttons delete--button">
                </button>
            </div>
            <div class="video__info">
                <div class="video__title--container">
                    <div class="title__icon--container"></div>
                    <h3 class="video__title">${video.title}</h3>
                </div>
                <div class="video__category--container">
                    <div class="category__icon--container"></div>
                    <p class="video__category">${video.category}</p>
                </div>
            </div>
        </div>`
        videoList.appendChild(li)
    })
}

// Funções auxiliares

    // Extrair id do video

function extractVideoId(url) {

    // Expressão regular para extrair o ID do video pela URL
    // /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)

    if (match && match[1]) {
        return match[1]
    } else {
        return null
    }


}

    // Gerar ID único

function generateUniqueId() {

    // Gera uma string aleatória

    return Math.random().toString(36).substring(2, 9)
}

    // Gerar evento para as funções Editar/Deletar

function addEditDeleteEventListeners() {

    // Adicionando evento aos botões

    videoList.addEventListener('click', function(event) {
        const target = event.target

        // Verificação do tipo de botão: Editar

        if(target.classList.contains('edit--button')) {
            event.preventDefault()
            event.stopPropagation()

            // Localize o card mais próximo para editar

            const card = target.closest('.video__container')
            if (!card) return

            // Obter o ID do video

            const videoId = card.dataset.videoId
            
            fetch(`http://localhost:3000/api/items/${videoId}`, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch video data')
                    }
                    return response.json()
                })
                .then(existingVideo => {
                    // Torne os campos editáveis

                    const titleElement = card.querySelector('.video__title')
                    const categoryElement = card.querySelector('.video__category')
                    // Novos valores dos campos editaveis

                    titleElement.contentEditable = true
                    categoryElement.contentEditable = true
                    titleElement.focus()

                    // Tornando não editável novamente

                    titleElement.addEventListener('blur', function () {
                        titleElement.contentEditable = false
                        const updatedVideo = {
                            id: card.getAttribute('data-video-id'),
                            title: titleElement.textContent,
                            category: categoryElement.textContent,
                            videoId: existingVideo.videoId
                        }
                        updateEditedData(videoId, updatedVideo)
                    })

                    categoryElement.addEventListener('blur', function () {
                        titleElement.contentEditable = false
                        categoryElement.contentEditable = false
                        const updatedVideo = {
                            id: card.getAttribute('data-video-id'),
                            title: titleElement.textContent,
                            category: categoryElement.textContent,
                            videoId: existingVideo.videoId
                        }
                        updateEditedData(videoId, updatedVideo)
                    })
                })
                .catch(error => {
                    console.error('Error fetching video data:', error)
                })

        }
        
        // Verificação do tipo de botão: Deletar

        if(target.classList.contains('delete--button')) {

            const confirmation = confirm('Tem certeza que deseja excluir o vídeo?')
            if(!confirmation) {
                return
            }

            event.preventDefault()
            event.stopPropagation()

            // Localize o card mais próximo para deletar

            const card = target.closest('.video__container')
            if (!card) return

            // Obter ID do video

            const videoId = card.dataset.videoId

            // Requerimento de deletar

            fetch(`http://localhost:3000/api/items/${videoId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    console.log('Video deleted successfully')
                    card.remove()
                     // Renderize novamente

                    renderVideos()
                } else {
                    throw new Error('Failed to delete video')
                }
            })
            .catch(error => {
                console.error('Error deleting video:', error)
            })
        }
    })
}
addEditDeleteEventListeners()

// Requisitando dados para atualizar

function updateEditedData(videoId, updatedVideo) {
    fetch(`http://localhost:3000/api/items/${videoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedVideo)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update video data')
            }
            return response.json()
        })
        .then(updatedVideo => {
            console.log('Video updated:', updatedVideo)
        })
        .catch(error => {
            console.error('Error updating video:', error)
        })
}