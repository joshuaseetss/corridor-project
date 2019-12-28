export class Category {
    public name: string;
    public imagePath: string;
    public value: string;

    constructor(name: string, imagePath: string, value: string) {
        this.name = name; 
        this.imagePath = imagePath;
        this.value = value;
    }
}