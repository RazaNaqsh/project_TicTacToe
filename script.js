const player1 = {
	name: "X",
	symbol: "X",
};
const player2 = {
	name: "O",
	symbol: "O",
};

const gameBoard = (() => {
	const boardArray = ["", "", "", "", "", "", "", "", ""];
	return {
		boardArray,
	};
})();

const gameFlow = (() => {
	let activePLayer = player1;
	const updateBoard = (e) => {
		const elToAdd = e.target.getAttribute("data-index");
		gameBoard.boardArray.splice(elToAdd, 1, activePLayer.symbol);
	};
	const switchPlayer = () => {
		console.log(activePLayer);
		if (activePLayer === player1) activePLayer = player2;
		else activePLayer = player1;
	};
	const play = (e) => {
		if (e.target.innerHTML === "") {
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
