const player1 = {
	name: "ken",
	symbol: "X",
};
const gameBoard = (() => {
	const board = ["X", "X", "O", "O", "O", "X", "X", "O", "X"];
	const container = document.querySelector(".container");
	board.forEach((item, index) => {
		const div = document.createElement("div");
		div.classList.add("grid-item", `data-index=${index}`);
		div.innerHTML = item;
		container.append(div);
	});
})();
