//ADD EMPTY PIECES USING JAVASCRIPT empty-empty a1
//GENERATES EMPTY SQUARES FOR PIECES TO MOVE IN
function generateEmptySquares() {

	//SET LAYER 3: PIECES AS PARENT ELEMENT
	var parent = document.getElementsByClassName('pieces')[0];

	//GENERATE THE EMPTY SPACE DIVS
	for (let i = 1; i < 65; i++) {

		//SET POSITION NUMBER AND LETTER
		let positionNumber = (i % 8 == 0) ? "8" : String(i % 8);
		let positionLetter = "a";
		if (i > 8 && i <= 16) {
			positionLetter = "b";
		} else if (i > 16 && i <= 24) {
			positionLetter = "c";
		} else if (i > 24 && i <= 32) {
			positionLetter = "d";
		} else if (i > 32 && i <= 42) {
			positionLetter = "e";
		} else if (i > 42 && i <= 48) {
			positionLetter = "f";
		} else if (i > 48 && i <= 56) {
			positionLetter = "g";
		} else if (i > 56) {
			positionLetter = "h";	
		}

		let emptySquare = document.createElement('div');
		emptySquare.classList.add('empty-empty');
		emptySquare.classList.add(positionLetter + positionNumber);

		//PREPEND NEW ELEMENT TO PARENT
		parent.prepend(emptySquare);

	}
}

//UPDATES ACTIVE STATUS OF A PIECE
function updateStatus(element, isActive) {

	//SET ACTIVE ATTRIBUTE OF ELEMENT
	element.setAttribute('active', isActive);

	//CHESSBOAD ELEMENT
	let chessboard = document.getElementsByClassName('chessboard')[0];

	//CHECK IF A PIECE IS ACTIVE
	if (isActive) {

		//SET CURSOR TO GRABBING
		chessboard.style.cursor = "grabbing";

	} else {
		chessboard.style.cursor = "unset";
	}

}

window.onload = () => {

	//GENERATE EMPTY SQUARES FOR PIECES TO MOVE IN
	generateEmptySquares();

	//LISTEN FOR CLICKS ON EACH OF THE CHESS PIECES
	document.querySelectorAll(".pieces div").forEach((element) => {

		element.addEventListener('click', (event) => {

			//GET PIECE INFO FROM CLASSNAME
			let piece = event.target.classList.item(0);

			//COLOR OF THIS PIECE
			let pieceColor = piece.split('-')[0];

			//TYPE OF THIS PIECE
			let pieceType = piece.split('-')[1];

			//POSITION OF THIS PIECE
			let piecePosition = event.target.classList.item(1);

			//CHECK IF PIECE IS EMPTY
			if (piece == "empty-empty") {

				//CHECK IF A CHESS PIECE IS ACTIVE
				if (document.querySelectorAll('.pieces div[active="true"]').length == 1) {

					//ACTIVE PIECE
					let activePiece = document.querySelectorAll('.pieces div[active="true"]')[0];
					
					//ACTIVE POSITION: POSITION OF ACTIVE PIECE
					let activePiecePosition = activePiece.classList.item(1);
					
					//NEW POSITION: POSITION OF THE EMPTY SQUARE
					let newPosition = event.target.classList.item(1);
					
					//MOVE THE PIECE TO ITS NEW POSITION
			    	activePiece.classList.remove(activePiecePosition);
			    	activePiece.classList.add(newPosition);

			    	//UPDATE ACTIVE STATUS
					updateStatus(activePiece, false);

				}

			} else {

				//CHECK IF NO PIECE IS ACTIVE
				if (document.querySelectorAll('.pieces div[active="true"]').length == 0) {

					//UPDATE ACTIVE STATUS
					updateStatus(event.target, true);
				
				} else {
					
					//GET ACTIVE PIECE
					let active = document.querySelectorAll('.pieces div[active="true"]')[0];
					let activePiece = active.classList.item(0);
					
					//COLOR OF ACTIVE PIECE
					let activePieceColor = activePiece.split('-')[0];
					
					//TYPE OF ACTIVE PIECE
					let activePieceType = activePiece.split('-')[1];
					
					//POSITION OF ACTIVE PIECE
					let activePiecePosition = active.classList.item(1);

					//CHECK IF THIS PIECE IS THE ACTIVE PIECE
					if (piece == activePiece) {

						//UPDATE ACTIVE STATUS
						updateStatus(active, false);

					}

					//CHECK IF THIS PIECE IS THE SAME COLOR AS ACTIVE PIECE
					if (pieceColor == activePieceColor) {

						//UPDATE ACTIVE STATUS
						updateStatus(active, false);

					} else {

						//REMOVE CURRENT PIECE
						event.target.remove();

						//SET ACTIVE PIECE's NEW POSITION
						active.classList.remove(activePiecePosition);
						active.classList.add(piecePosition);

						//UPDATE ACTIVE STATUS
						updateStatus(active, false);

					}

				}

			}

		}, true);

	});
}