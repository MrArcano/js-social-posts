const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "06-25-2023"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "09-03-2023"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "05-15-2023"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "04-03-2023"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "12-05-2023"
    }
];
// Output post
const postList = document.querySelector(".posts-list");

// - Utilizzando il template compilo i dati da js
posts.forEach((post,index)=>{
    // - Destrutturo il mio post
    const {id,content,media,author,likes,created} = post;

    // Formato data
    const date = dateUsToIt(created);

    // Icona
    const icon = iconUser(author);
    
    postList.innerHTML += `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${icon}            
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${date}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="${media}">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;
});

// Button like
const btnLikeArray = document.getElementsByClassName("js-like-button");
const likeCounterArray = document.getElementsByClassName("js-likes-counter");

for (const key in btnLikeArray) {
    if (Object.hasOwnProperty.call(btnLikeArray, key)) {
        const btnLike = btnLikeArray[key];
        btnLike.addEventListener("click",function(){
            handlerBtn(this,key);
        });
    }
}

// ----------------------------------------------
// --------- Function for EventListener ---------
// ----------------------------------------------
function handlerBtn(btn,index){
    // Change color liked
    btn.classList.toggle("like-button--liked");
    // Attraverso un attributo custom definisco se è stato o meno cliccato
    if(!btn._clicked){
        posts[index].likes++;
    }else{
        posts[index].likes--;
    }
    // Visto che è stato cliccato cambio lo stato del flag (se true passa a false, e viceversa)
    btn._clicked = !btn._clicked;
    // Stampo a schermo il nuovo valore di like
    likeCounterArray[index].innerHTML = posts[index].likes;
}

// ----------------------------------------------
// ---------- Function Date USA to ITA ----------
// ----------------------------------------------
function dateUsToIt(dateUs){
    const dateArray = dateUs.split("-");
    dateArray.splice(0, 0, dateArray[1]);
    dateArray.splice(2,1);
    
    return dateArray.join("-");
}

// ----------------------------------------------
// ------------- Function Icon User -------------
// ----------------------------------------------
function iconUser(author){
    let icon = "";
    // Controllo se ho un src e non null
    if(author.image != null){
        icon = `<img class="profile-pic" src="${author.image}" alt="${author.name}">`;
    }else{
        let initial="";
        const nameArray = author.name.split(" ");
        nameArray.forEach((stringa)=>{
            initial += stringa.charAt(0);
        });
        icon = `<div class="profile-pic-default"><span>${initial}</span></div>`;
    }
    return icon;
}
