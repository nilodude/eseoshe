export class Box{
    id: number = 0;
    cells: Cell[] = [];
    xlen:number = 0;
    ylen: number = 0;
    tag: string = ''
}

export class Cell {
    x:number = 0;
    y: number = 0;
    boxID: number = 0;
    free: boolean = true;

    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }
}