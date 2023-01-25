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
	return {
		activePLayer,
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
		div.addEventListener("click", (e) => {
			if (e.target.innerHTML === "") {
				e.target.innerHTML = gameFlow.activePLayer.symbol;
				const elToAdd = e.target.getAttribute("data-index");
				board.splice(elToAdd, 1, gameFlow.activePLayer.symbol);
				if (gameFlow.activePLayer === player1) gameFlow.activePLayer = player2;
				else gameFlow.activePLayer = player1;
				console.log(board);
			}
		});
	});
})();
