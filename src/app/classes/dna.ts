export class DNA {

    private genes: Array<string> = [];
    private fitness: number = 0;

    // Creates a random DNA
    constructor(size: number) {

        for (let index = 0; index < size; index++)
            this.genes[index] = this.newCharacter();
    }

    // Fitness
    public calculateFitness(target: string): void {

        let score = 0;

        for (let index = 0; index < this.genes.length; index++) {

            if (this.genes[index] === target.charAt(index))
                score++;
        }

        this.fitness = score / target.length;
    }

    // Crossover
    public crossover(parent: DNA): DNA {

        let child = new DNA(this.genes.length);

        let midpoint = Math.floor(Math.random() * (this.genes.length - 0));

        for (let index = 0; index < this.genes.length; index++)
            child.genes[index] = index > midpoint ? this.genes[index] : parent.genes[index];

        return child;
    }

    // Mutation
    // Based on a mutation probability, picks a new random character
    public mutate(rate: number): void {

        for (let index = 0; index < this.genes.length; index++) {

            if (Math.random() < rate)
                this.genes[index] = this.newCharacter();
        }
    }

    public getPhrase(): string {
        
        return this.genes.join("");
    }
    
    public getFitness(): number {
        return this.fitness;
    }

    // Returns a random character including numbers
    private newCharacter(): string {

        const ascii = ` .,!?:;'"0123456789abcçdefghijklmnopqrstuwvxyzABCÇDEFGHIJKLMNOPQRSTUWVXYZáéíóúãõâêîôûàèìòùÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙ`;
    
        let character = ascii.charAt(Math.floor(Math.random() * ascii.length));
    
        return character;
    }

    // Old version, doesn't include the special characters
    // private newCharacter(): string {
    //
    //     let character = Math.floor(Math.random() * (126 - 33) + 33);
    //
    //     if (character === 63)
    //         character = 32;
    //
    //     if (character === 64)
    //         character = 46;
    //
    //     return String.fromCharCode(character);
    // }
}