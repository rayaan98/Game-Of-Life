
class GameOfLife {

    /*
    functions 
        1 - create 2 2d arrays with zeros (active/inactive) - done!
        2 - fill active array randomly with ones and zeros - done! 
        3 - set color for cells - done! 
        4 - count neigbours 
        5 - update generation 
        6 - clear canvas
    */

    /* Jagged Arrays vs Rectangular Arrays
    A jagged array is an array whos elements are in fact, arrays.
     An array of arrays if you will, each of which can be 
     different and will have their own block of memory.
     A rectangular array is an array of two(maybe more) dimensions, 
     which can be seen/used as rows or columns(enclosed in a single pair
    of brackets). The runtime in the rectangular array will be superior
    because of the difference in the access to memory. The rectangular
    array is essentially a single block of memory that can be accessed 
    whenever need be. For a jagged array while it does only technically contain 
    only one array, the arrays in the array each have their own block 
    of memory that need to be accessed separetly, slowling down the runtime.
    The rectangular array is essentially just one giant matrix that 
    can be accessed in one time.
    */



    constructor() {

        this.cell_size = 5;
        this.dead_color = `#181818`;
        this.alive_color = `#FF756B`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

        this.arrayInitialization = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i*(this.cells_in_column)+j] = 0;
                }
            }
            this.inactive_array = this.active_array;

        };

        this.arrayRandomize = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i*(this.cells_in_column)+j] = (Math.random()>0.5)?1:0;
                }
            }

        };

        this.fillArray = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    if(this.active_array[i*(this.cells_in_column)+j]==1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.setCellValueHelper = (row, col) => {
            try {
                return this.active_array[row*(this.cells_in_column)+col];
            }
            catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.setCellValueHelper(row - 1, col - 1);
            total_neighbours += this.setCellValueHelper(row - 1, col);
            total_neighbours += this.setCellValueHelper(row - 1, col + 1);
            total_neighbours += this.setCellValueHelper(row, col - 1);
            total_neighbours += this.setCellValueHelper(row, col + 1);
            total_neighbours += this.setCellValueHelper(row + 1, col - 1);
            total_neighbours += this.setCellValueHelper(row + 1, col);
            total_neighbours += this.setCellValueHelper(row + 1, col + 1);
            return total_neighbours;
        };

        this.updateCellValue = (row, col) => {

            const total = this.countNeighbours(row, col);
            // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
            if (total > 4 || total < 3) {
                return 0;
            }
            // dead cell with 3 neighbours becomes alive. 0 => 1
                else if(this.active_array[row*(this.cells_in_column)+col] === 0 && total === 3) {
                return 1;
            }
            // or returning its status back. 0 => 0; 1 => 1
            else {
                return this.active_array[row*(this.cells_in_column)+col]
            }

        };

        this.updateLifeCycle = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let new_state = this.updateCellValue(i, j);
                    this.inactive_array[i*(this.cells_in_column)+j] = new_state;
                }
            }
            this.active_array = this.inactive_array

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };
        
    }
}
