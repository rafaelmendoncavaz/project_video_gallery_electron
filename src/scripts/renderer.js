// Mecanismo Live Search

    // Seletor HTML

const searchInput = document.querySelector('.nav__input--search')

    // Adicionar evento de busca

searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim().toLowerCase()

    // Filtrar videos baseado nos termos de busca

    const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm) ||
    video.category.toLowerCase().includes(searchTerm)
    )

    // Renderiza os videos filtrados

    renderVideos(filteredVideos)

})

// Form & Add Video

let videos = []

    // Seletores HTML

const form = document.querySelector('.form__container')
const videoList = document.querySelector('.section__list')

    // Evento de adição de vídeo

form.addEventListener('submit', function(event) {
    event.preventDefault()

    // Capturar valor dos inputs

    const videoUrl = form.querySelector('.form__input--add').value 
    const videoTitle = form.querySelector('.form__input--title').value
    const videoCategory = form.querySelector('.form__input--category').value

    // Retirar ID do video

    const videoId = extractVideoId(videoUrl)

    const newVideo = {
        id: generateUniqueId(),
        title: videoTitle,
        category: videoCategory,
        videoId: videoId
    }

    // Armazenar os vídeos em um array

videos.unshift(newVideo)

    // Renderizando os videos

renderVideos(videos)

    // Limpando os campos preenchidos

form.reset()

})

// Renderizando Videos

function renderVideos(videos) {

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
                <h3 class="video__title">${video.title}</h3>
                <p class="video__category">${video.category}</p>
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

            // Localize o card mais próximo para editar

            const card = target.closest('.video__container')
            if (!card) return

            // Torne os campos editáveis

            const titleElement = card.querySelector('.video__title')
            const categoryElement = card.querySelector('.video__category')
            titleElement.contentEditable = true
            categoryElement.contentEditable = true
            titleElement.focus()

            // Tornando não editável novamente

            titleElement.addEventListener('blur', function () {
                titleElement.contentEditable = false
                const videoId = card.dataset.videoId
                const editedVideo = videos.find(video => video.id === videoId)
                if (editedVideo) {
                    editedVideo.title = titleElement.textContent
                }
            })

            categoryElement.addEventListener('blur', function () {
                titleElement.contentEditable = false
                categoryElement.contentEditable = false
                const videoId = card.dataset.videoId
                const editedVideo = videos.find(video => video.id === videoId)
                if(editedVideo) {
                    editedVideo.category = categoryElement.textContent
                }
            })
        }

        // Verificação do tipo de botão: Deletar

        if(target.classList.contains('delete--button')) {
            event.preventDefault()

            // Localize o card mais próximo para deletar

            const card = target.closest('.video__container')
            if (!card) return

            // Torne o card deletável

            if(confirm('Tem certeza que deseja excluir o vídeo?')) {
                const videoId = card.dataset.videoId

                // Removendo o vídeo do array

                videos = videos.filter(video => video.id !== videoId)

                // Renderize novamente

                renderVideos(videos)
            }
        }
    })

}
addEditDeleteEventListeners()