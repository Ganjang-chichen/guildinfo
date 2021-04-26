


function addDragNDrop (){
    const cards = document.querySelectorAll('.char_card');
    let draggedItem = null;
    
    for(let i = 0; i < cards.length; i++){
        const card = cards[i];

        card.addEventListener('dragstart', (e) => {
            draggedItem = card;
            setTimeout(() => {
                card.style.display = 'none';
            }, 0);

            e.dataTransfer.setData("text/plain", e.target.id);
            var img = new Image();
            img.src = card.querySelector(".card_char_img").src;
            e.dataTransfer.setDragImage(img, 100, 100);
        });

        card.addEventListener('dragend', (e) => {
            draggedItem.style.display = 'flex';
            draggedItem = null;
        });

        for(let j = 0; j < party1.length; j++){
            const guild_party = party1[j];

            guild_party.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            guild_party.addEventListener('dragenter', (e) => {
                e.preventDefault();

            });
            guild_party.addEventListener('dragleave', (e) => {

            });
            guild_party.addEventListener('drop', (e) => {
                guild_party.append(draggedItem);
                
            });
        }

        for(let j = 0; j < party2.length; j++){
            const guild_party = party2[j];

            guild_party.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            guild_party.addEventListener('dragenter', (e) => {
                e.preventDefault();

            });
            guild_party.addEventListener('dragleave', (e) => {

            });
            guild_party.addEventListener('drop', (e) => {
                guild_party.append(draggedItem);
                
            });
        }

        for(let j = 0; j < party3.length; j++){
            const guild_party = party3[j];

            guild_party.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            guild_party.addEventListener('dragenter', (e) => {
                e.preventDefault();

            });
            guild_party.addEventListener('dragleave', (e) => {

            });
            guild_party.addEventListener('drop', (e) => {
                guild_party.append(draggedItem);
                
            });
        }

        default_party.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        default_party.addEventListener('dragenter', (e) => {
            e.preventDefault();

        });
        default_party.addEventListener('dragleave', (e) => {

        });
        default_party.addEventListener('drop', (e) => {
            default_party.append(draggedItem);
            
        });
    }
}

addDragNDrop();