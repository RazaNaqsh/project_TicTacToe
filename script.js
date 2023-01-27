// const player1 = {
// 	name: "X",
// 	symbol: "X",
// };
// const player2 = {
// 	name: "O",
// 	symbol: "O",
// };
const player = function (playerName, symbol) {
	return {
		playerName,
		symbol,
	};
};

const playerDetails = (() => {
	const btn = document.getElementById("start");
	let playerOneName;
	let playerTwoName;
	let player1;
	let player2;
	let p1;
	let p2;
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		playerOneName = document.getElementById("player1").value;
		playerTwoName = document.getElementById("player2").value;
		if (playerTwoName !== "" && playerOneName !== "") {
			document.querySelector(".container").style.display = "grid";
			document.querySelector(".playerDetails").style.display = "none";
			console.log(playerOneName);
			p1 = player(playerOneName, "X");
			p2 = player(playerTwoName, "O");
			console.log(p1);
		}
	});
	return function () {
		return {
			player1: p1,
			player2: p2,
		};
	};
})();

const gameBoard = (() => {
	const boardArray = ["", "", "", "", "", "", "", "", ""];

	return {
		boardArray,
	};
})();

const gameFlow = (() => {
	let activePLayer = playerDetails().player1;
	console.log(playerDetails().player1);
	const updateBoard = (e) => {
		const elToAdd = e.target.getAttribute("data-index");
		gameBoard.boardArray.splice(elToAdd, 1, activePLayer.symbol);
	};

	const switchPlayer = () => {
		console.log(activePLayer);
		if (activePLayer === playerDetails().player1)
			activePLayer = playerDetails().player2;
		else activePLayer = playerDetails().player1;
		return activePLayer;
	};

	const play = (e) => {
		if (e.target.innerHTML === "") {
			console.log(activePLayer);
			e.target.innerHTML = activePLayer.symbol;
			updateBoard(e);
			console.log(gameBoard.boardArray);
			checkWin();
			switchPlayer();
		}
	};

	function checkWin() {
		if (
			(gameBoard.boardArray[0] === gameBoard.boardArray[1] &&
				gameBoard.boardArray[0] === gameBoard.boardArray[2] &&
				gameBoard.boardArray[0] !== "") ||
			(gameBoard.boardArray[0] === gameBoard.boardArray[3] &&
				gameBoard.boardArray[0] === gameBoard.boardArray[6] &&
				gameBoard.boardArray[0] !== "") ||
			(gameBoard.boardArray[0] === gameBoard.boardArray[4] &&
				gameBoard.boardArray[0] === gameBoard.boardArray[8] &&
				gameBoard.boardArray[0] !== "") ||
			(gameBoard.boardArray[1] === gameBoard.boardArray[4] &&
				gameBoard.boardArray[1] === gameBoard.boardArray[7] &&
				gameBoard.boardArray[1] !== "") ||
			(gameBoard.boardArray[2] === gameBoard.boardArray[5] &&
				gameBoard.boardArray[2] === gameBoard.boardArray[8] &&
				gameBoard.boardArray[2] !== "") ||
			(gameBoard.boardArray[2] === gameBoard.boardArray[4] &&
				gameBoard.boardArray[2] === gameBoard.boardArray[6] &&
				gameBoard.boardArray[2] !== "") ||
			(gameBoard.boardArray[3] === gameBoard.boardArray[4] &&
				gameBoard.boardArray[3] === gameBoard.boardArray[5] &&
				gameBoard.boardArray[3] !== "") ||
			(gameBoard.boardArray[6] === gameBoard.boardArray[7] &&
				gameBoard.boardArray[6] === gameBoard.boardArray[8] &&
				gameBoard.boardArray[6] !== "")
		) {
			console.log(`${activePLayer.symbol} wins`);

			displayController.grid.forEach((gridItem) => {
				gridItem.removeEventListener("click", play);
			});
		}
	}

	return {
		activePLayer,
		play,
	};
})();

const displayController = (function () {
	const grid = document.querySelectorAll(".grid-item");

	grid.forEach((gridItem, index) => {
		gridItem.innerHTML = gameBoard.boardArray[index];
		gridItem.addEventListener("click", gameFlow.play);
	});

	return {
		grid,
	};
})();
