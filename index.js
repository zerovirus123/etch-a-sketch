let globals = 
{
    DEFAULT_SIZE: 10,
    grid_size: 10,
    currentColorMode: "color",
    mouseDown: false
}

const colorButton = document.getElementById("color-button");
const rainbowButton = document.getElementById("rainbow-button");
const eraserButton = document.getElementById("eraser-button");
const clearButton = document.getElementById("clear-button");

function setColorMode(colorMode)
{
    if(globals.currentColorMode == "color") colorButton.classList.remove('active');
    if(globals.currentColorMode == "rainbow") rainbowButton.classList.remove('active');
    if(globals.currentColorMode == "eraser") eraserButton.classList.remove('active');

    if(colorMode == "color") colorButton.classList.add('active');
    if(colorMode == "rainbow") rainbowButton.classList.add('active');
    if(colorMode == "eraser") eraserButton.classList.add('active');

    globals.currentColorMode = colorMode;
}

function changeColor(e){

    if(e.type === 'mouseover' && e.type && !globals.mouseDown) return;
    
    if(globals.currentColorMode === 'rainbow'){
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
    else if (globals.currentColorMode === 'color'){
        console.log(document.getElementById('color-picker').value);
        e.target.style.backgroundColor = document.getElementById('color-picker').value;
    }
    else if (globals.currentColorMode === 'eraser'){
        e.target.style.backgroundColor = "#ffffff";
    }

}

function updateGridSize(value)
{
    sizeValue.innerText = `${value} x ${value}`;
}

function clearGrid()
{
    let div_container = document.getElementById("div__container");
    let rows = div_container.childNodes;

    rows.forEach(function(row)
    {
        while(row.firstChild){
            row.removeChild(row.lastChild);
        }
    });

    while(rows.firstChild)
    {
        rows.removeChild(rows.lastChild);
    }
}

function drawGrid(gridDimension)
{
    let div_container = document.getElementById("div__container");
    
    for(let i = 0; i < gridDimension; i++)
    {
        let row = document.createElement("div");
        row.className = "row";

        for(let j = 0; j < gridDimension; j++)
        {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.style.padding = 300 * 10 / (gridDimension * 10);
            row.appendChild(cell);
        }
        div_container.appendChild(row);
    }
    globals.grid_size = gridDimension;
}

const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.getElementById('size-value');
sizeSlider.oninput = (e) => updateGridSize(e.target.value);

sizeSlider.onchange = (e) => {
    clearGrid();
    drawGrid(e.target.value);
};

window.onload = () => {
    clearGrid();
    document.getElementById("size-slider").value = globals.DEFAULT_SIZE;
    drawGrid(globals.DEFAULT_SIZE);
    setColorMode(globals.currentColorMode);
}

colorButton.addEventListener('click', () => {
    setColorMode('color');
});

rainbowButton.addEventListener('click', () => {
    setColorMode('rainbow');
});

eraserButton.addEventListener('click', () => {
    setColorMode('eraser');
});

clearButton.addEventListener('click', () => {
    clearGrid();
    drawGrid(globals.grid_size);
});

document.getElementById('div__container').addEventListener('mousedown', (e) => {
    globals.mouseDown = true;
    changeColor(e);
});

document.getElementById('div__container').addEventListener('mouseover', (e) => {
    globals.mouseDown = true;
    changeColor(e);
});

document.getElementById('div__container').addEventListener('mouseup', (e) => {
    globals.mouseDown = false;
    changeColor(e);
});