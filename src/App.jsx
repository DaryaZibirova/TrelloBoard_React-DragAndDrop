import React, {useState} from 'react';

const App = () => {
    const [boards, setBoards] = useState([
        {id: 1, title:"TO DO", items: [{id:1, title: 'To go to a store'},{id:2, title: 'To wash dishes'},{id:3, title: 'To cook dinner'}]},
        {id: 2, title:"IN PROGRESS", items: [{id:4, title: 'To do a kanban board app'},{id:5, title: 'To write some tests'},{id:6, title: 'To visit the meeting'}]},
        {id: 3, title:"DONE", items: [{id:7, title: 'To make a video'},{id:8, title: 'To call grandma'},{id:9, title: 'To watch the movie'}]},
    ])
    {/*States for actual board and actual task*/}
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 4px 3px grey'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        e.stopPropagation()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        {/*Changing board`s actual state*/}
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    return (
        <div className='app'>
            {boards.map(board =>
                <div
                    className='board'
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >
                    <div className='board__title'>{board.title}</div>
                    {board.items.map(item =>
                        <div
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board,item)}
                            draggable={true}
                            className='item'
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}             
        </div>
    );
};

export default App;