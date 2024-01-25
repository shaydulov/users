const firstBtn = document.querySelector(".f_btn");
const secondBtn = document.querySelector(".s_btn");
const thirdBtn = document.querySelector(".t_btn");

const firstDiv = document.querySelector(".first");
const secondDiv = document.querySelector(".second");
const thirdDiv = document.querySelector(".third");

fetch("https://jsonplaceholder.typicode.com/users/")
    .then( res => res.json())
    .then(users => {
        users.forEach((user) => {
          const html = `
            <div class="card">
                <h2>Name: ${user.name}</h2>
                <button id="${user.id}">Ko'rish</button>
            </div>
           `;
          firstDiv.insertAdjacentHTML("beforeend", html);
        });


        const buttons = document.querySelectorAll("button");

        buttons.forEach((button) => {
          button.addEventListener("click", (e) => {
            const id = e.target.id;
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
              .then((res) => res.json())
              .then(userAlbums => {
                userAlbums.forEach((album) => {
                  const html = `
                        <div class="card">
                            <h2>Name: ${album.title}</h2>
                            <button class="album_btn" id="${album.id}">Rasmni ko'rish</button>
                        </div>
                    `;
                  secondDiv.insertAdjacentHTML("beforeend", html);
                  console.log(album);
                });


                const albumBtns = document.querySelectorAll(".album_btn");
                albumBtns.forEach(albumBtn => {
                    albumBtn.addEventListener('click', (e)=>{
                        const albumId = e.target.id;
                        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos/`)
                        .then( res => res.json())
                        .then(photos => {
                            photos.forEach(photo => {
                                console.log(photo);
                                const imgElement = `
                                    <img src="${photo.thumbnailUrl}">
                                `;
                                thirdDiv.insertAdjacentHTML('afterbegin', imgElement)
                            })
                        })
                        .catch(err => console.log(err))
                    });
                });
              })
              .catch((err) => console.log(err));
          });
        });
    })
    .catch( err => console.log(err));







