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
		} else if (i > 32 && i <= 40) {
			positionLetter = "e";
		} else if (i > 40 && i <= 48) {
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

	//GET ELEMENT PIECE COLOR
	let pieceColor = element.classList.item(0).split("-")[0];

	//GET ELEMENT PIECE TYPE
	let pieceType = element.classList.item(0).split("-")[1];

	//GET ELEMENT POSITION
	let piecePosition = element.classList.item(1);

	//CHESSBOAD ELEMENT
	let chessboard = document.getElementsByClassName('chessboard')[0];

	//CHECK IF A PIECE IS ACTIVE
	if (isActive) {

		//SET CURSOR TO GRABBING
		chessboard.style.cursor = "grabbing";

		//DISPLAY ALL POSSIBLE MOVES
		showPossibleMoves(element, pieceColor, pieceType, piecePosition);

	} else {

		//UNSET CURSOR STYLE
		chessboard.style.cursor = "unset";

		//REMOVE POSSIBLE MOVES
		hidePossibleMoves();

	}

}

//GETS ALL POSSIBLE MOVES
function getPossibleMoves(piece, color, type, position) {

	possibleMoves = [];

	//LOOP OVER PIECES (EMPTY SPACES INCLUDED)
	document.querySelectorAll(".pieces div").forEach((element) => {

		let possiblePosition = element.classList.item(1);

		let target = (element.classList.item(0) == "empty-empty") ? null : element;

		//CHECK IF MOVE IS POSSIBLE USING checkMoveValidity()
		if (checkMoveValidity(color, type, position, possiblePosition, target)) {

			//CHECK IF ELEMENT IS THE PIECE ITSELF, AND IS NOT AT THE SAME POSITION, AND IS NOT THE SAME COLOR
			if (element != piece && position != element.classList.item(1) && color != element.classList.item(0).split("-")[0]) {

				possibleMoves.push(element);

			}

		}

	});

	return possibleMoves;

}

//DISPLAYS ALL POSSIBLE MOVES
function showPossibleMoves(piece, color, type, position) {

	//GET ALL POSSIBLE MOVES
	possibleMoves = getPossibleMoves(piece, color, type, position);

	possibleMoves.forEach((element) => {

		//CHECK IF THERE IS A PIECE
		if (document.querySelectorAll(".pieces div." + element.classList.item(1)).length == 1) {

			//SET OPEN ATTRIBUTE TO TRUE
			element.setAttribute('open', true);

		}

	});

}

//HIDES ALL POSSIBLE MOVES
function hidePossibleMoves() {

	//LOOP OVER PIECES (EMPTY SPACES INCLUDED)
	document.querySelectorAll(".pieces div").forEach((element) => {

		element.removeAttribute('open');

	});

}

//CHECKS VALIDITY OF THE CHESS PIECE'S MOVE
function checkMoveValidity(pieceColor, pieceType, currentPosition, newPosition, target=null) {

	//CONVERT ALPHA TO NUMERICAL VALUES
	let alphaToNum = {
		"a": 1,
		"b": 2,
		"c": 3,
		"d": 4,
		"e": 5,
		"f": 6,
		"g": 7,
		"h": 8
	}

	//X AND Y COORDINATES OF CURRENT POSITION
	let currentX = alphaToNum[currentPosition[0]];
	let currentY = Number(currentPosition[1]);

	//X AND Y COORDINATES OF NEW POSITION
	let newX = alphaToNum[newPosition[0]];
	let newY = Number(newPosition[1]);

	//UNITS THE PIECE'S MOVEMENT
	let unitsX = Math.abs(newX - currentX);
	let unitsY = Math.abs(newY - currentY);

	//DIRECTION OF MOVEMENT
	let isHorizontal = currentY == newY; //CHECKS IF MOVEMENT IS HORIZONTAL
	let isVertical = currentX == newX; //CHECKS IF MOVEMENT IS VERTICAL
	let isDiagonal = (!isHorizontal && !isVertical && unitsX == unitsY) ? true : false; //CHECKS IF MOVEMENT IS DIAGONAL

	//RULES FOR ROOK
	if (pieceType == "rook") {

		if (isHorizontal || isVertical) {
			return true;
		}
		return false;

	//ROOLS FOR KNIGHT
	} else if (pieceType == "knight") {

		if ((!isHorizontal && !isVertical && !isDiagonal) && ((unitsX == 2 && unitsY == 1) || (unitsX == 1 && unitsY == 2))) {
			return true;
		}
		return false;

	//RULES FOR BISHOP
	} else if (pieceType == "bishop") {

		if (isDiagonal) {
			return true;
		}
		return false;

	//RULES FOR QUEEN
	} else if (pieceType == "queen") {

		if (isHorizontal || isVertical || isDiagonal) {
			return true;
		}
		return false;

	//RULES FOR KING
	} else if (pieceType == "king") {
		
		if ((isHorizontal || isVertical || isDiagonal) && (unitsX < 2 && unitsY < 2)) {
			return true;
		}
		return false;

	//RULES FOR PAWN
	} else if (pieceType == "pawn") {

		//CHECK IF A WHITE PAWN IS IN THE STARTING POINT AND IS MOVING 2 UNITS IN THE RIGHT DIRECTION TO AN EMPTY SPACE
		if (pieceColor == "white" && currentX == newX && currentY == 2 && unitsY == 2 && target == null) {

			return true;

		//CHECK IF A BLACK PAWN IS IN THE STARTING POINT AND IS MOVING 2 UNITS IN THE RIGHT DIRECTION TO AN EMPTY SPACE
		} else if (pieceColor == "black" && currentX == newX && currentY == 7 && unitsY == 2 && target == null) {

			return true;

		} else {

			//CHECK IF PAWN IS MOVING TO AN EMPTY SPACE (NOT EATING ANOTHER PIECE)
			if (target == null) {

				if (isVertical && unitsY < 2) {

					if (pieceColor == "white") {

						if (newY > currentY) {
							return true;
						}
						return false;

					} else {

						if (currentY > newY) {
							return true;
						}
						return false;

					}

				}
				return false;

			} else {

				if (isDiagonal && unitsY < 2) {

					if (pieceColor == "white") {

						if (newY > currentY) {
							return true;
						}
						return false;

					} else {

						if (currentY > newY) {
							return true;
						}
						return false;

					}

				}
				return false;

			}

		}

	}
	return false;

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

			//NEW POSITION BASED ON THE POSITION OF THIS PIECE
			let piecePosition = event.target.classList.item(1);
			let newPosition = piecePosition;

			//CHECK IF NO PIECE IS ACTIVE
			if (document.querySelectorAll('.pieces div[active="true"]').length == 0) {

				//CHECK IF PIECE IS NOT EMPTY
				if (piece != "empty-empty") {

					//UPDATE ACTIVE STATUS
					updateStatus(event.target, true);

				}
		
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

				//CHECK IF PIECE IS EMPTY
				if (piece == "empty-empty") {

					//CHECK IF MOVE IS VALID
					if (checkMoveValidity(activePieceColor, activePieceType, activePiecePosition, newPosition)) {

						//MOVE THE PIECE TO ITS NEW POSITION
				    	active.classList.remove(activePiecePosition);
				    	active.classList.add(newPosition);

					}

					//UPDATE ACTIVE STATUS
					updateStatus(active, false);


				} else {

					//CHECK IF THIS PIECE IS THE ACTIVE PIECE
					if (pieceColor == activePieceColor) {

						//UPDATE ACTIVE STATUS
						updateStatus(active, false);

					} else {

						//CHECK IF MOVE IS VALID
						if (checkMoveValidity(activePieceColor, activePieceType, activePiecePosition, newPosition, event.target)) {

							//REMOVE CURRENT PIECE
							event.target.remove();

							//SET ACTIVE PIECE's NEW POSITION
							active.classList.remove(activePiecePosition);
							active.classList.add(newPosition);

							//UPDATE ACTIVE STATUS
							updateStatus(active, false);

						} else {

							//UPDATE ACTIVE STATUS
							updateStatus(active, false);

						}


					}

				}

			}

		}, true);

	});
}