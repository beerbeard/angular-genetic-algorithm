import { DNA } from "./dna";

export class Population {

    private population: Array<DNA> = [];
    private matingPool: Array<DNA> = [];

    private best: string = '';
    private target: string = '';
    private generations: number = 0;
    private mutationRate: number = 0.0;
    private perfectScore: number = 1;
    private finished: boolean = false;
    
    constructor(expected: string, rate: number = 0.01, size: number = 200) {

        this.target = expected;
        this.mutationRate = rate;

        for (let index = 0; index < size; index++)
            this.population[index] = new DNA(this.target.length);

        this.calculateFitness();
    }

    public naturalSelection(): void {

        this.matingPool = [];

        let populationFitness = 0;
        let maxFitness = 0;

        for (let index = 0; index < this.population.length; index++) {

            populationFitness = this.population[index].getFitness();

            if (populationFitness > maxFitness)
                maxFitness = populationFitness;
        }

        // Based on fitness, each member will get added to the mating pool a certain number of times
        // A higher fitness = more entries to mating pool = more likely to be picked as a parent
        // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        for (let index = 0; index < this.population.length; index++) {

            let fitness = this.map(this.population[index].getFitness(), 0, maxFitness, 0, 1);
            let multiplier = Math.floor(fitness * 100);

            for (let position = 0; position < multiplier; position++)
                this.matingPool.push(this.population[index]);
        }
    }

    public generate(): void {

        for (let index = 0; index < this.population.length; index++) {
            
            let firstParent = this.matingPool[Math.floor(Math.random() * (this.matingPool.length - 0))];
            let secondParent = this.matingPool[Math.floor(Math.random() * (this.matingPool.length - 0))];

            let child = firstParent.crossover(secondParent);

            child.mutate(this.mutationRate);

            this.population[index] = child;
        }

        this.generations++;
    }

    public evaluate(): void {

        let worldrecord = 0.0;
        let position = 0;
        let populationFitness = 0;

        for (let index = 0; index < this.population.length; index++) {

            populationFitness = this.population[index].getFitness();

            if (populationFitness > worldrecord) {

                position = index;
                worldrecord = populationFitness;
            }
        }

        this.best = this.population[position].getPhrase();

        if (worldrecord === this.perfectScore)
            this.finished = true;
    }

    public isFinished(): boolean {

        return this.finished;
    }

    public getBest(): string {

        return this.best;
    }

    public getGenerations(): number {

        return this.generations;
    }

    public getAverageFitness(): number {

        let total = 0;

        for (let index = 0; index < this.population.length; index++)
            total += this.population[index].getFitness();

        return total / (this.population.length);
    }

    public calculateFitness(): void {

        for (let index = 0; index < this.population.length; index++)
            this.population[index].calculateFitness(this.target);
    }

    private map(value, firstStart, firstStop, secondStart, secondStop): number {

        return ((value - firstStart) / (firstStop)) * (secondStop - secondStart) + secondStart;
    }
}