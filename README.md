# Tic Tac Toe

# Tic Tac Toe?

**틱택토는 두 명의 플레이어가 3x3 크기의 격자 보드에서 번갈아가며 마크를 하여 가로, 세로, 대각선 방향으로 일렬로 3개의 마크를 먼저 만드는 게임**

# 어떻게 만들것인가?

1. **게임 보드를 초기화함**
2. **플레이어의 차례를 정함**
3. **플레이어는 보드에서 빈 공간에 마크를 놓을 수 있음**
4. **마크를 놓은 후 승리 여부와 무승부 여부를 확인함**
5. **승리 또는 무승부가 결정되지 않았다면 플레이어를 변경하여 다음 차례를 진행함**
6. **게임이 종료될 때까지 3-5단계를 반복함**

# 문제

**승리 여부와 무승부 여부를 정확하게 확인하기**

**게임 종료 후 다시 시작할 수 있는 기능 추가하기**

**사용자 인터페이스 디자인 및 상호작용 개선하기**

# 코드

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="tic.css">
</head>
<body>
    <div class="turn-container">
        <h3>지금 차례는</h3>
        <div class="turn-box align">X</div>
        <div class="turn-box align">O</div>
        <div class="bg"></div>
    </div>
    <div class="main-grid">
        <div class="box align">0</div>
        <div class="box align">1</div>
        <div class="box align">2</div>
        <div class="box align">3</div>
        <div class="box align">4</div>
        <div class="box align">5</div>
        <div class="box align">6</div>
        <div class="box align">7</div>
        <div class="box align">8</div>
    </div>
    <h2 id="results"></h2>
    <button id="play-again">다시하기</button>
    <script src="tic.js"></script>
</body>
</html>
```

```jsx
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
```

```jsx
*{
  color: white;
  font-family: sans-serif;
  transition: 0.2s ease-in-out;
  user-select: none;
}

.align{
  display: flex;
  justify-content: center;
  align-items: center;
}

body{
  background-color: #252A34;
  margin: 0;
  padding: 0;
  width: 100vw;
  text-align: center;
  padding-top: 5vh;
}

.turn-container{
  width: 170px;
  height: 80px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  position: relative;
}

.turn-container h3{
  margin: 0;
  grid-column-start: 1;
  grid-column-end: 3;
}

.turn-container .turn-box{
  border: 3px solid #000;
  font-size: 1.6rem;
  font-weight: 700;
}

.turn-container .turn-box:nth-child(even){
  border-right: none;
}

.bg{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 85px;
  height: 40px;
  background-color: #FF2E63;
  z-index: -1;
}

.main-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 250px;
  width: 250px;
  margin: 30px auto;
  border: 2px solid #000;
}

.box{
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  border: 2px solid #000;
}

.box:hover{
  background-color: #FF2E63;
}

#play-again{
  background-color: #FF2E63;
  padding: 10px 25px;
  border: none;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  display: none;
}

#play-again:hover{
  padding: 10px 40px;
  background-color: #08D9D6;
  color: #000;
}
```

# 개선방안

- **AI 상대 추가**

**컴퓨터 기반의 AI 상대를 추가하여 사용자가 컴퓨터와 대전할 수 있도록 함**

- **승리 조건 확장**

**3x3 크기의 보드뿐 아니라, 더 큰 크기의 보드에서도 승리 조건을 검사할 수 있도록 개선함**