console.clear();

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById('cartContainer');

let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// Create total container upfront
let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
totalh2.textContent = 'Total Amount';
totalDiv.appendChild(totalh2);

// Button container
let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement('a');
buttonLink.href = '/orderPlaced.html';
buttonLink.textContent = 'Place Order';
buttonTag.appendChild(buttonLink);

buttonTag.onclick = function () {
    console.log("Place Order clicked");
};

// Function to add item to cart display
function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    boxh3.textContent = `${ob.name} × ${itemCounter}`;
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    boxh4.textContent = 'Amount: Rs ' + ob.price;
    boxDiv.appendChild(boxh4);

    boxContainerDiv.appendChild(boxDiv);
}

// To update total amount displayed
function amountUpdate(amount) {
    // Remove previous total amount if exists
    const existingTotal = document.getElementById('toth4');
    if (existingTotal) {
        existingTotal.remove();
    }

    let totalh4 = document.createElement('h4');
    totalh4.id = 'toth4';
    totalh4.textContent = 'Amount: Rs ' + amount;
    totalDiv.appendChild(totalh4);
}

// Append boxContainerDiv and totalContainerDiv once to cartContainer
cartContainer.appendChild(boxContainerDiv);
cartContainer.appendChild(totalContainerDiv);

// Backend API call
let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            const contentTitle = JSON.parse(this.responseText);

            let counter = Number(document.cookie.split(',')[1].split('=')[1]);
            document.getElementById("totalItem").innerHTML = 'Total Items: ' + counter;

            let item = document.cookie.split(',')[0].split('=')[1].split(" ");

            console.log(counter);
            console.log(item);

            let totalAmount = 0;

            for (let i = 0; i < counter; i++) {
                let itemCounter = 1;
                for (let j = i + 1; j < counter; j++) {
                    if (Number(item[j]) === Number(item[i])) {
                        itemCounter++;
                    }
                }
                totalAmount += Number(contentTitle[item[i] - 1].price) * itemCounter;
                dynamicCartSection(contentTitle[item[i] - 1], itemCounter);
                i += (itemCounter - 1); // Skip duplicates
            }

            amountUpdate(totalAmount);

        } else {
            console.log('call failed!');
        }
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();
