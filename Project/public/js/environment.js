const width = 35;
const height = 35;
const nodesRow = 15;
const svg = document.querySelector('#svg');

function calcPos(num) {
    return num*2+1;
}


// Text inside group
// <text x="${x+18}" y="${y+30}" font-size="18px">A</text>

function generateEnvironment() {
    svg.innerHTML = '';
    let content;

    let xPos = 0;
    let yPos = 0;

    let x = 0;
    let y = 0;

    for (let i = 1; i < 226; i++) {
        if ((i-1) % 15 == 0 && i != 0) {
            xPos++;
            yPos = 0;
        } else {
            yPos++;
        }

        content +=
        `
        <g data-id="${i-1}" x="${xPos-1}" y=${yPos}>
            <rect class="rect" x="${x}" y="${y}" data-display="false" width="${width}" height="${height}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2; stroke-width: 1;"></rect>       
            
        </g>
        `;
        x += width;
        if (i % nodesRow == 0 && i != 0) {
            x = 0;
            y += height;
        }
    }
    
    svg.innerHTML = content;

    paintScrabbleBonuses();
}

function paintScrabbleBonuses() {
    let eID;
    for (let i = 0; i < svg.childNodes.length; i++) {
        if (svg.childNodes[i].nodeName == 'g') {
            eID = svg.childNodes[i].getAttribute('data-id');
            	        
            // Gray (Star) - Game initialization point
            if (eID == 112) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', '#0E0C0F');
                svg.childNodes[i].setAttribute('data-bonus', 'STAR');
            }

            // Green (3B) - Triple bonus letter
            if (eID == 4   || eID == 10  || 
                eID == 16  || eID == 28  || 
                eID == 36  || eID == 38  || 
                eID == 48  || eID == 56  ||
                eID == 60  || eID == 74  || 
                eID == 80  || eID == 84  || 
                eID == 92  || eID == 102 ||
                eID == 122 || eID == 132 ||
                eID == 140 || eID == 144 || 
                eID == 150 || eID == 164 ||
                eID == 168 || eID == 176 || 
                eID == 186 || eID == 188 || 
                eID == 196 || eID == 208 ||
                eID == 214 || eID == 220) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', '#2BB44A');
                svg.childNodes[i].setAttribute('data-bonus', '3B');
            }

            // Orange (3W) - Triple bonus word
            if (eID == 2 || eID == 12
                || eID == 30 || eID == 44
                || eID == 180 || eID == 194
                || eID == 212 || eID == 222) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', '#F03D32');
                svg.childNodes[i].setAttribute('data-bonus', '3W');
            }

            // Yellow (2W) - Double bonus word
            if (eID == 20 || eID == 24 || eID == 52 || eID == 76
                || eID == 88 || eID == 108 || eID == 116 || eID == 136
                || eID == 148 || eID == 172 || eID == 200 || eID == 204) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', '#F89617');
                svg.childNodes[i].setAttribute('data-bonus', '2W');
            }

            // Blue (2B) - Double bonus letter
            if (eID == 32 || eID == 42 || eID == 66
                || eID == 68 || eID == 94 || eID == 100
                || eID == 124 || eID == 130 || eID == 156
                || eID == 158 || eID == 182 || eID == 192) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', '#4774B5');
                svg.childNodes[i].setAttribute('data-bonus', '2B');
            }
        }
    }
}