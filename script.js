const player = function (playerName, symbol) {
	return {
		playerName,
		symbol,
	};
};

const playerDetails = (function () {
	const btn = document.getElementById("start");
	let playerOneName;
	let playerTwoName;
	let player1;
	let player2;
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		playerOneName = document.getElementById("player1").value;
		playerTwoName = document.getElementById("player2").value;
		if (playerTwoName !== "" && playerOneName !== "") {
			document.querySelector(".container").style.display = "grid";
			document.querySelector(".playerDetails").style.display = "none";
			playerDetails.player1 = player(playerOneName, "X");
			playerDetails.player2 = player(playerTwoName, "O");
		}
		gameFlow.players = playerDetails;
		gameFlow.activePLayer = gameFlow.players.player1;
	});
	return {
		player1,
		player2,
	};
})();

const gameBoard = (() => {
	const boardArray = ["", "", "", "", "", "", "", "", ""];

	return {
		boardArray,
	};
})();

const gameFlow = (function () {
	let players;
	let activePLayer;
	const updateBoard = (e) => {
		const elToAdd = e.target.getAttribute("data-index");
		gameBoard.boardArray.splice(elToAdd, 1, gameFlow.activePLayer.symbol);
	};

	const switchPlayer = () => {
		console.log(gameFlow.activePLayer);
		if (gameFlow.activePLayer === gameFlow.players.player1)
			gameFlow.activePLayer = gameFlow.players.player2;
		else gameFlow.activePLayer = gameFlow.players.player1;
	};

	const play = (e) => {
		if (e.target.innerHTML === "") {
			gameFlow.players = playerDetails;
			// console.log(gameFlow.activePLayer);
			e.target.innerHTML = gameFlow.activePLayer.symbol;
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
			console.log(`${gameFlow.activePLayer.playerName} wins`);

			displayController.grid.forEach((gridItem) => {
				gridItem.removeEventListener("click", play);
			});
			document.querySelector(".container").style.filter = "blur(10px)";
			document.querySelector(".winningMessage").style.display = "flex";
			document.querySelector(
				".win"
			).textContent = `${gameFlow.activePLayer.playerName} wins!!`;
		}
	}

	return {
		activePLayer,
		players,
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
