const player1 = {
	name: "X",
	symbol: "X",
};
const player2 = {
	name: "O",
	symbol: "O",
};

const gameFlow = (() => {
	const activePLayer = player1;
	const changePlayer = () => {
		if (gameFlow.activePLayer === player1) gameFlow.activePLayer = player2;
		else gameFlow.activePLayer = player1;
	};
	return {
		activePLayer,
		changePlayer,
	};
})();

const gameBoard = (() => {
	const board = ["", "", "O", "O", "O", "", "", "", ""];

	const container = document.querySelector(".container");
	board.forEach((item, index) => {
		const div = document.createElement("div");
		div.classList.add("grid-item");
		div.setAttribute("data-index", index);
		div.innerHTML = item;
		container.append(div);
	});

	const childDivs = document.querySelectorAll(".grid-item");

	childDivs.forEach((div) => {
		div.addEventListener("click", play);
	});

	function play(e) {
		if (e.target.innerHTML === "") {
			e.target.innerHTML = gameFlow.activePLayer.symbol;

			updateBoard(e);
			checkWin();
			gameFlow.changePlayer();
		}
	}

	const updateBoard = (e) => {
		const elToAdd = e.target.getAttribute("data-index");
		board.splice(elToAdd, 1, gameFlow.activePLayer.symbol);
		console.log(board);
	};

	const checkWin = () => {
		if (
			(board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
			(board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
			(board[0] === board[4] && board[0] === board[8] && board[0] !== "") ||
			(board[1] === board[4] && board[1] === board[7] && board[1] !== "") ||
			(board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
			(board[2] === board[4] && board[2] === board[6] && board[2] !== "") ||
			(board[3] === board[4] && board[3] === board[5] && board[3] !== "") ||
			(board[6] === board[7] && board[6] === board[8] && board[6] !== "")
		) {
			console.log(`${gameFlow.activePLayer.symbol} wins`);
			childDivs.forEach((div) => {
				div.removeEventListener("click", play);
			});
		}
	};
})();
