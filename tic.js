// 각각의 틱택토 박스를 선택하고, 이를 boxes 변수에 저장합니다.
let boxes = document.querySelectorAll(".box");

// 현재 차례의 플레이어를 표시하는 변수입니다. X로 시작합니다.
let turn = "X";

// 게임이 끝났는지를 표시하는 변수입니다. 게임 시작 시에는 false입니다.
let isGameOver = false;

// 각각의 틱택토 박스에 대해 클릭 이벤트를 설정합니다.
boxes.forEach(e =>{
    // 박스의 내용을 초기화합니다.
    e.innerHTML = ""

    // 박스를 클릭했을 때의 동작을 설정합니다.
    e.addEventListener("click", ()=>{
        // 게임이 끝나지 않았고, 클릭한 박스가 비어있을 때만 동작합니다.
        if(!isGameOver && e.innerHTML === ""){
            // 클릭한 박스에 현재 차례의 플레이어의 표시(X 또는 O)를 넣습니다.
            e.innerHTML = turn;

            // 승리 조건을 체크합니다.
            cheakWin();

            // 무승부 조건을 체크합니다.
            cheakDraw();

            // 플레이어의 차례를 변경합니다.
            changeTurn();
        }
    })
})

// 플레이어의 차례를 변경하는 함수입니다.
function changeTurn(){
    // 현재 차례가 X인 경우, 차례를 O로 변경하고 슬라이더의 위치를 오른쪽으로 이동합니다.
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }

    // 현재 차례가 O인 경우, 차례를 X로 변경하고 슬라이더의 위치를 왼쪽으로 이동합니다.
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// 승리 조건을 체크하는 함수입니다.
function cheakWin(){
    // 승리 조건을 담은 2차원 배열입니다.
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // 가로 줄
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // 세로 줄
        [0, 4, 8], [2, 4, 6]              // 대각선
    ]
    // 각각의 승리 조건에 대해 체크합니다.
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // 세 칸이 모두 같은 플레이어의 표시로 채워져 있으면 해당 플레이어가 승리합니다.
        if(v0 != "" && v0 === v1 && v0 === v2){
            // 게임을 종료 상태로 변경합니다.
            isGameOver = true;
            
            // 결과 메시지를 표시합니다.
            document.querySelector("#results").innerHTML = turn + " 가 이겼습니다!";

            // 다시하기 버튼을 표시합니다.
            document.querySelector("#play-again").style.display = "inline"

            // 승리한 줄을 강조하기 위해 배경색을 변경합니다.
            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

// 무승부 조건을 체크하는 함수입니다.
function cheakDraw(){
    // 게임이 끝나지 않았을 때만 체크합니다.
    if(!isGameOver){
        let isDraw = true;

        // 모든 박스가 채워져 있으면 무승부입니다.
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        // 무승부일 경우, 결과 메시지를 표시하고 다시하기 버튼을 표시합니다.
        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

// 다시하기 버튼을 클릭했을 때의 동작을 설정합니다.
document.querySelector("#play-again").addEventListener("click", ()=>{
    // 게임 상태를 초기 상태로 되돌립니다.
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // 모든 박스의 내용을 비우고 배경색을 초기 상태로 되돌립니다.
    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})
