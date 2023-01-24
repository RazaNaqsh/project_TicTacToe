const player1 = {
	name: "Light",
	symbol: "X",
};
const player2 = {
	name: "L",
	symbol: "O",
};
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
	return {
		container,
		board,
	};
})();

const gameFlow = (() => {
	let activePLayer = player1;
	gameBoard.container.childNodes.forEach((childDiv) => {
		childDiv.addEventListener("click", (e) => {
			if (e.target.innerHTML === "") e.target.innerHTML = activePLayer.symbol;

			let elToAdd = e.target.getAttribute("data-index");
			console.log(elToAdd);

			gameBoard.board.splice(elToAdd, 1, activePLayer.symbol);
			console.log(gameBoard.board);

			if (activePLayer === player1) activePLayer = player2;
			else activePLayer = player1;
		});
	});
})();
