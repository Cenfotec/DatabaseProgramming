const svgDisplay = document.querySelector('#svgDisplay');

function generatePlayerDisplay(id, username) {
    let letters = [];
    scrabbleDB.getPlayerLetters({ id: id, username: username }).done(res => {
        res.res.forEach(e => letters.push(e[1]));




        $("#svgDisplay").empty();
    let content;

    let x = 0;
    let y = 0;

    for (let i = 0; i < 7; i++) {
        letter = (letters[i] == 'Ñ') ? 'enne' : letters[i];
        if (letter == undefined) { 
            img = ''; 
        } else {
            img = `<image href="./resources/letter_${letter}.png" class="svgImage" data-username='${username}' data-oldmove="false" data-display="true" x="${x}" y="${y}" data-letter="${letters[i]}" width="50" height="50" />`;
        }

        content +=
        `
        <g data-id="${i}">
            
            <rect class="rect" x="${x}" y="${y}" data-display="true" width="50" height="50" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2; stroke-width: 1;"></rect>       
            ${img}
        </g>
        `;
        x += 50;
        if (i % nodesRow == 0 && i != 0) {
            x = 0;
            y += 50;
        }
    }
    
    svgDisplay.innerHTML = content;
    });
}