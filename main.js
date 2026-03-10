const url = 'https://api.nasa.gov/planetary/apod'
const apiKey = 'DEMO_KEY'
const input = document.getElementById('date-input')


window.onload = () => {
    fetchData()
}

document.addEventListener('submit', (event) => {
    document.getElementById('result').innerHTML = ''
    event.preventDefault()
    const date = input.value
    if (date) {
        getBirthday(date)
    }
})

const getBirthday = async (date) => {
    let currentYear = new Date().getFullYear()
    let birthYear = parseInt(date.substring(0, 4))
    for(let year = birthYear; year <= currentYear; year++) {
        const dateToFetch = `${year}${date.substring(4)}`
        console.log(dateToFetch)
        await fetchDataByDate(dateToFetch)
    }
}

const fetchDataByDate = async (date) => {
    try {
        const response = await fetch(`${url}?api_key=${apiKey}&date=${date}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        else{
        const data = await response.json()
        displayData([data])
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        document.getElementById('error').style.opacity = '1'
    }
}

const fetchData = async () => {
    try {
        const response = await fetch(`${url}?api_key=${apiKey}&count=10`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        else{
        const data = await response.json()
        displayData(data)
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        document.getElementById('error').style.opacity = '1'
    }
}

const displayData = (data) => {
    const container = document.getElementById('result')
    data.forEach(item => {
        const card = document.createElement('div')
        card.classList.add('image-card')
        card.innerHTML = `<img src="${item.url}" alt="${item.title}">
                            <p>${item.title}</p>`
        container.appendChild(card)
    })
}
