const player1 = {
	name: "Light",
	symbol: "X",
};
const player2 = {
	name: "L",
	symbol: "O",
};
const gameBoard = (() => {
	const board = ["X", "", "O", "O", "", "X", "", "O", ""];
	const container = document.querySelector(".container");
	board.forEach((item, index) => {
		const div = document.createElement("div");
		div.classList.add("grid-item", `data-index=${index}`);
		div.innerHTML = item;
		container.append(div);
	});
	return {
		container,
	};
})();

const gameFlow = (() => {
	let activePLayer = player1;
	gameBoard.container.childNodes.forEach((childDiv) => {
		childDiv.addEventListener("click", (e) => {
			if (e.target.innerHTML === "") e.target.innerHTML = activePLayer.symbol;
			if (activePLayer === player1) activePLayer = player2;
			else activePLayer = player1;
		});
	});
})();
