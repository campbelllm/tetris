document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10

    // creating the Tetrominos(shapes in tetris game)
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [width * 2, width * 2 + 1, width + 1, width + 2],
        [0, width, width + 1, width * 2 + 1],
        [width * 2, width * 2 + 1, width + 1, width + 2],
        [0, width, width + 1, width * 2 + 1],
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1, width + 2],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
        [0, width, 1, width + 1],
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3,],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ]


    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0
    let random = Math.floor(Math.random() * theTetrominos.length)
    console.log()
    let current = theTetrominos[random][currentRotation]

    //display Tetrimino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }


    //remove display of Tetrimino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    /// move down the tetromino
    timerId = setInterval(moveDown, 1000)

    //function for keyCodes (number associated with each key)
    function control(e) {
        if(e.keyCode === 37){
            moveLeft()
        }else if (e.keyCode === 38) {
            //rotatoe
        }else if (e.keyCode === 39){
            moveRight()
        }else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)
 
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //stop the tetromino

    function freeze() {
        //tetromino's look forward one square to see if the next div has a class name of 'taken'
        //if it does then the tetromino stops and then the divs of that current tetromino are given 
        //the class name of 'taken'

        if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"))
            //a new tetromino now needs to fall
            random = Math.floor(Math.random() * theTetrominos.length)
            current = theTetrominos[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    //set outside boundaries for game, stop from overlapping other tetrominos
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtLeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)


        if(!isAtRightEdge) currentPosition+=1

        if(current.some(index=> squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
    }
    

})
