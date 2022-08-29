export class App {
    static requestApiData() {
        const apiUrl = 'https://kenzie-news-api.herokuapp.com/api/news'

        return fetch(apiUrl).then(response => response.json())
    }

    static createMultipleTags(nameToTag, nameToClass, attributeContent = '', attributeSource = '', attributeTitle = '') {
        const element = document.createElement(nameToTag)

        if(nameToTag === 'section' || nameToTag === 'li'){
            element.title = attributeTitle
        }

        element.classList.add(nameToClass)
        element.innerText = attributeContent
        element.src = attributeSource

        return element
    }

    static createEventListenerOnMain() {
        const mainTag = document.querySelector('.main__container')

        mainTag.addEventListener('click', event => {
            console.log(event.target)
            if(event.target.className === 'banner-news' || event.target.className === 'news') {
                window.open(event.target.title, '_blank')
            }
        })
    }

    static renderBannerNews(titulo, resumo, categoria, fonte, noticia_completa, imagem) {
        const mainTag = document.querySelector('.main__container')

        const bannerContainer = this.createMultipleTags('section', 'banner-news', '', '', noticia_completa)
        const bannerInformation = this.createMultipleTags('div', 'banner-news__information')
        const bannerCategory = this.createMultipleTags('a', 'banner-news__category', categoria)
        const informationContainer = this.createMultipleTags('div', 'information__container')
        const bannerTitle = this.createMultipleTags('h2', 'banner-news__title', titulo)
        const bannerDescription = this.createMultipleTags('p', 'banner-news__description', resumo)
        const bannerFooter = this.createMultipleTags('p', 'banner-news__footer', `Fonte: ${fonte}`)
        const bannerImage = this.createMultipleTags('img', 'banner-news__image', '', imagem)

        informationContainer.append(bannerTitle, bannerDescription, bannerFooter)
        bannerInformation.append(bannerCategory, informationContainer)
        bannerContainer.append(bannerInformation, bannerImage)
        mainTag.prepend(bannerContainer)
    }

    static async renderNewsCard() {
        const ulTag = document.querySelector('.grid__news')
        const newsData = await this.requestApiData()

        this.createEventListenerOnMain()

        newsData.forEach(({ titulo, resumo, categoria, fonte, noticia_completa, imagem }, index) => {
            if(index === 0) {
                this.renderBannerNews(titulo, resumo, categoria, fonte, noticia_completa, imagem)
            } else {
                const news = this.createMultipleTags('li', 'news', '', '', noticia_completa)
                const newsImage = this.createMultipleTags('img', 'news__image', '', imagem)
                const newsInformationContainer = this.createMultipleTags('div', 'news-information__container')
                const newsDescriptionContainer = this.createMultipleTags('div', 'news-description__container')
                const newsCategory = this.createMultipleTags('a', 'news__category', categoria)
                const newsTitle = this.createMultipleTags('h2', 'news__title', titulo)
                const newsDescription = this.createMultipleTags('p', 'news__description', resumo)
                const newsFooter = this.createMultipleTags('p', 'news__footer', `Fonte: ${fonte}`)

                newsDescriptionContainer.append(newsCategory, newsTitle, newsDescription)
                newsInformationContainer.append(newsDescriptionContainer, newsFooter)
                news.append(newsImage, newsInformationContainer)
                ulTag.append(news)
            }
        })
    }
}