const gridContainer = document.querySelector("#gridContainer");
const resetBtn = document.querySelector("#resetBtn");
const resizeBtn = document.querySelector("#resizeBtn");
const GradientBtn = document.querySelector("#gradientModeBtn");
const blackBtn = document.querySelector("#blackModeBtn");
const pxPerSide = 550;
let GradientMode = false;

function createGrid(gridNum = 16, len = pxPerSide / 16) {
    for (let i = 0; i < gridNum; i++) {
        let rowOfGrid = document.createElement("div");
        rowOfGrid.setAttribute("style", "display:flex;");
        for (let j = 0; j < gridNum; j++) {
            let grid = document.createElement("div");
            grid.style.width = String(len) + "px";
            grid.style.height = String(len) + "px";
            grid.style.backgroundColor = "rgb(256,256,256)";
            grid.classList.add("grid");
            rowOfGrid.appendChild(grid);
        }
        gridContainer.appendChild(rowOfGrid);
    }
}

function addHoverListener() {
    let allGrids = document.querySelectorAll(".grid");

    allGrids.forEach(grid =>
        grid.addEventListener("mouseover", function (e) {
            if (e.which == 1) return;
            if (GradientMode) {
                currentRgb = grid.style.backgroundColor.match(/\d+/);
                if (currentRgb >= 25.6) {
                    newRgb = currentRgb - 25.6;
                    grid.style.backgroundColor = `rgb(${newRgb},${newRgb},${newRgb})`;
                }
            } else grid.style.backgroundColor = "black";
        })
    );
}

function askForGridNum() {
    let input = "";
    do {
        input = prompt("Square per side(max:100):");
    } while (
        isNaN(input) ||
        input.length <= 0 ||
        parseInt(input) > 100 ||
        parseInt(input) <= 0
    );
    return parseInt(input);
}

function getPx(gridNum) {
    return pxPerSide / gridNum;
}

resetBtn.addEventListener("click", function (e) {
    let allGrids = document.querySelectorAll(".grid");

    allGrids.forEach(grid => {
        grid.style.backgroundColor = "rgb(256,256,256)";
    });
});

resizeBtn.addEventListener("click", function (e) {
    gridContainer.textContent = "";
    let gridNum = askForGridNum();
    let len = getPx(gridNum);
    createGrid(gridNum, len);
    addHoverListener();
});

blackBtn.addEventListener("click", function (e) {
    GradientMode = false;
});

GradientBtn.addEventListener("click", function (e) {
    GradientMode = true;
});

createGrid();
addHoverListener();
