const items = document.getElementsByClassName('item');
const ctrlIcons = document.getElementsByClassName('ctrl-icon');
const songs = document.getElementsByClassName('audio');
const progress = document.getElementsByClassName('progress');

for(let i = 0; i < songs.length; i++){
    const song = songs[i];

    song.onloadedmetadata = function() {
        progress[i].max = song.duration;
        progress[i].value = song.currentTime; 
    }
}

for(let i = 0; i < ctrlIcons.length; i++){
    const ctrl = ctrlIcons[i];

    progress[i].onchange = function() {
        ctrl.classList.remove("fa-play");
        ctrl.classList.add("fa-pause");
        songs[i].play();
        songs[i].currentTime = progress[i].value;
    }

    if(songs[i].play()){
        setInterval(()=> {
            progress[i].value = songs[i].currentTime;
        }, 500)
    }
    
    ctrl.addEventListener('click', async function() {
        const id = items[i].getAttribute("key");
        
        songs[i].muted = false;

        if(ctrl.classList.contains("fa-pause")){
            
            songs[i].pause();
            ctrl.classList.remove("fa-pause");
            ctrl.classList.add("fa-play");
            
            await fetch(`http://localhost:3000/api/songs/play/${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }
        else {
            songs[i].play();
            ctrl.classList.remove("fa-play");
            ctrl.classList.add("fa-pause");
        }
    });
}

