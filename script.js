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
			document.querySelector(".playerDisplay").style.display = "flex";
			document.querySelector(
				".playerOne"
			).textContent = `${playerOneName}(${playerDetails.player1.symbol})`;
			document.querySelector(
				".playerTwo"
			).textContent = `${playerTwoName}(${playerDetails.player2.symbol})`;
		}
		gameFlow.players = playerDetails;
		gameFlow.activePLayer = gameFlow.players.player1;
		document.querySelector(".playerOne").style.color = "var(--color-secondary)";
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
	const switchContent = "'s Turn";
	const updateBoard = (e) => {
		const elToAdd = e.target.getAttribute("data-index");
		gameBoard.boardArray.splice(elToAdd, 1, gameFlow.activePLayer.symbol);
	};

	const switchPlayer = () => {
		// console.log(gameFlow.activePLayer);
		if (gameFlow.activePLayer === gameFlow.players.player1) {
			gameFlow.activePLayer = gameFlow.players.player2;
			document.querySelector(".playerTwo").style.color =
				"var(--color-secondary)";

			document.querySelector(".playerOne").style.color = "var(--color-primary)";
		} else {
			gameFlow.activePLayer = gameFlow.players.player1;
			document.querySelector(".playerOne").style.color =
				"var(--color-secondary)";
			document.querySelector(".playerTwo").style.color = "var(--color-primary)";
		}
	};

	const play = (e) => {
		if (e.target.innerHTML === "") {
			gameFlow.players = playerDetails;
			// console.log(gameFlow.activePLayer);
			e.target.innerHTML = gameFlow.activePLayer.symbol;
			updateBoard(e);
			// console.log(gameBoard.boardArray);
			checkWin();
			switchPlayer();
		}
	};

	function endScreen() {
		document.querySelector(".playerDisplay").style.filter = "blur(10px)";
		document.querySelector(".container").style.filter = "blur(10px)";
		document.querySelector(".winningMessage").style.display = "flex";
	}

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
			// console.log(`${gameFlow.activePLayer.playerName} wins`);

			displayController.grid.forEach((gridItem) => {
				gridItem.removeEventListener("click", play);
			});
			endScreen();
			document.querySelector(
				".win"
			).textContent = `${gameFlow.activePLayer.playerName} (${gameFlow.activePLayer.symbol}) wins!!`;
		}
		if (gameBoard.boardArray.every((box) => box !== "")) {
			endScreen();
			document.querySelector(".win").textContent = `Game Draw!`;
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

const buttons = (() => {
	const again = document.getElementById("playAgain");
	const home = document.getElementById("home");
	again.addEventListener("click", restart);
	home.addEventListener("click", homeScreen);
})();

function resetScreen() {
	document.querySelector(".winningMessage").style.display = "none";
	document.querySelector(".container").style.filter = "none";
	document.querySelector(".playerDisplay").style.filter = "none";
	gameBoard.boardArray = ["", "", "", "", "", "", "", "", ""];
	displayController.grid.forEach((gridItem, index) => {
		gridItem.innerHTML = gameBoard.boardArray[index];
		gridItem.addEventListener("click", gameFlow.play);
	});
}
function restart() {
	resetScreen();
}
function homeScreen() {
	resetScreen();
	document.querySelector(".container").style.display = "none";
	document.querySelector(".playerDisplay").style.display = "none";
	document.querySelector(".playerDetails").style.display = "flex";
	document.querySelector(".playerTwo").style.color = "var(--color-primary)";
	document.getElementById("player1").value = "";
	document.getElementById("player2").value = "";
}
