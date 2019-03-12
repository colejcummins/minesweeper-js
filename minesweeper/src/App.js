import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 9,
      width: 9,
      mines: 10,
    }
  }

  render() {
    const {height, widths, mines} = this.state;
    return(
      <Board 
        height={height}
        width={width}
        mines={mines}
      />
    );
  }
}


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(this.props.width, this.props.height),
      mineArr: this.placeMines(this.state.board, this.props.mines),
      flagged: 0,
    };
  }

  initBoard(width, height) {
    let board = [];

    for (let i = 0; i < height; i++) {
      board.push([]);
      for (let j = 0; j < width; j++) {
        board[i][j] = {
          hasMine: false,
          hasFlag: false,
          revealed: false,
          adj: 0,
        }
      }
    }
    return board;
  }

  mineArr(board, mines) {
    let board_c = JSON.parse(JSON.stringify(board));

    let mineArr = [];

    let randX = 0;
    let randY = 0;
    for (let i = 0; i < mines; i++) {
      do {
        randY = Math.floor(Math.random() * board.length);
        randX = Math.floor(Math.random() * board[0].length);
      } while(board_c[randY][randX].hasMine);
      minesArr[i] = {
        x: randX,
        y: randY
      }
      board_c[randY][randX].hasMine = true;
    }
    this.setState({
      board: board_c,
    });
    return mineArr;
  }
  
  renderBox(i, j) {
    return (
      <Box
        x={j}
        y={i}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  render() {
    return (
      <div className="header">

      </div>

    );
  }
}

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
      hasFlag: false,
      hasMine: false,
      adjacent: 0
    };
  }

  reveal() {
    this.setState({
      revealed: true
    });
  }

  flag() {
    this.setState({
      hasFlag: true
    });
  }

  incr() {
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  }

  addMine() {
    this.setState({
      hasMine: true
    });
  }

  render() {
    let out = "";
    if (this.state.revealed) {
      if (this.props.hasMine) {
        out += "*";
      } else {
        out += this.state.adjacent + '';
      }
    } else if (this.state.hasFlag) {
      out += "F";
    }

    return (
      <button className="box" onClick={props.onClick}>
        {out}
      </button>
    );
  }
}


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {time: 0};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((state) => ({
      time: state.time + 1,
    }));
  }

  render() {
    return (
      <div className = "clock">
        {this.state.time}
      </div>
    );
  }
}


export default App;
