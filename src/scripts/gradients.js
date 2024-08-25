let createGradient = document.getElementById("createData");
let container = document.getElementById("container");
let divNotify = document.getElementById("notify");
let textNotify = document.getElementById("textNotify");

function createBoxGradient(val1, val2, val3) {
    let input1 = document.getElementById("input1").value;
    let input2 = document.getElementById("input2").value;
    let input3 = document.getElementById("input3").value;

    localStorage.setItem("color1", input1);
    localStorage.setItem("deg", input2);
    localStorage.setItem("color2", input3);

    let data1 = localStorage.getItem("color1");
    let data2 = localStorage.getItem("deg");
    let data3 = localStorage.getItem("color2");
    let allowedChar = '#';

    if (input1 === '' || input1[0] !== allowedChar) {
        divNotify.classList.add("notify");
        textNotify.innerText = "Ingresa el color o el '#'";
        notify();
    } else if (input2 === '') {
        divNotify.classList.add("notify");
        textNotify.innerText = "Ingresa los grados";
        notify();
    } else if (input3 === '' || input3[0] !== allowedChar) {
        divNotify.classList.add("notify");
        textNotify.innerText = "Ingresa el color o el '#'";
        notify();
    } else {
        let newCard = document.createElement("div");
        newCard.className = "border border-black dark:border-white hover:border-white dark:hover:border-cyan-400 p-3.5 rounded";
        container.appendChild(newCard);
        
        let codeColor = document.createElement('p');
        codeColor.className = "text-black dark:text-white text-center";
        codeColor.innerText = input1 + ', ' + input2 + ',' + input3;
        newCard.appendChild(codeColor);

        let boxColor = document.createElement("div");
        boxColor.className = 'h-10 rounded my-2.5';
        boxColor.style.backgroundImage = `linear-gradient(${input2}, ${input1}, ${input3})`;
        newCard.appendChild(boxColor);
        
        let containerBnt = document.createElement('div')
        containerBnt.className = 'flex justify-evenly border rounded';
        newCard.appendChild(containerBnt);
        
        let bntCopy = document.createElement("button");
        bntCopy.className = 'text-black dark:text-white hover:text-white dark:hover:text-cyan-400 border-r hover:bg-white/10 w-1/2';
        bntCopy.innerText = 'Copy';
        containerBnt.appendChild(bntCopy);

        let bntDelet = document.createElement("button");
        bntDelet.className = 'text-black dark:text-white hover:text-white dark:hover:text-cyan-400 border-r hover:bg-white/10 w-1/2';
        bntDelet.innerText = 'Delet';
        containerBnt.appendChild(bntDelet);

        function delet() {
            newCard.remove();
            localStorage.removeItem("color1, deg, color2");
            localStorage.removeItem("deg");
            localStorage.removeItem("color2");
            divNotify.classList.add('notify');
            textNotify.innerText = 'Gradiente eliminado';
            notify();
        }

        const copyColor = async () => {
            try {
                await navigator.clipboard.writeText(`background-image:linear-gradient(${data2}, ${data1}, ${data3});`);
                divNotify.classList.add('notify');
                textNotify.innerText = 'Gradiente copiado';
                notify();
            } catch (err) {
                console.log(err)
            }
        }
        bntCopy.addEventListener('click', function () { copyColor() });
        bntDelet.addEventListener('click', function () { delet(data1, data2, data3)});
    }
}

let time = 1;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function notify() {
    while (time < + 10) {
        time++;
        await delay(800);
    }
    divNotify.classList.remove('notify');
    textNotify.innerText = '';
    time = 1;
}

createGradient.addEventListener('click', function () { createBoxGradient(); });
window.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        createBoxGradient();
    };
});