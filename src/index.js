// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", setUpPage)

function setUpPage() {
    let form = document.querySelector('#new-quote-form')
    form.addEventListener('submit', handleSubmit)

    getAllQuotes()
}

function handleSubmit(e) {
    e.preventDefault()
let info = {
        quote: e.target.text.value,
        author: e.target.author.value,
        likes: 0
    }
    addNewQuote() 
    e.target.reset()
}

function getAllQuotes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(data => createQuoteList(data))
}

function addNewQuote(quote) {
    fetch('http://localhost:3000/quotes?_embed=likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quote)
    })
    .then(resp => resp.json())
    .then (data => quoteCards(data))
    .catch(res => console.log("Error:", res))
}

function createQuoteList(quotes) {
    quotes.forEach(quoteCards)
}

function quoteCards(info) {
const ul = document.querySelector('ul')

let li = document.createElement('li')
li.className = "quote-card"

let blockBox = document.createElement("blockquote")
blockBox.className = "blockquote"

let quote = document.createElement('p')
quote.innerText = info.quote

let footer = document.createElement('footer')
footer.className = 'blockquote-footer'
footer.innerText = info.author

let likeBtn = document.createElement("button")
likeBtn.addEventListener("click", handleLike)
likeBtn.className = "likeButton"
likeBtn.innerText = info.likes + " Likes"
likeBtn.setAttribute("data-id", info.id)

function handleLike(e){
}

ul.appendChild(li)
li.appendChild(blockBox)
li.appendChild(quote)
quote.appendChild(footer)
quote.appendChild(likeBtn)
}
