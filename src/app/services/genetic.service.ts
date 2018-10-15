import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs';

import { Population } from "../classes/population";

@Injectable()
export class GeneticService {

    private population: Population;
    private subject: Subject<Population> = new Subject<Population>();
    private interval: number;

    constructor() { }

    public startPopulate(model: any): void {

        const speed = model.speed ? model.speed : 1; 

        this.population = new Population(model.expected, model.mutation, model.population);

        this.interval = setInterval(() => {
            
            this.newPopulation();

            this.subject.next(this.population);

            if (this.population.isFinished())
                this.stopPopulate();

        }, speed);
    }

    public getPopulation(): Observable<Population> {
        return this.subject;
    }

    public stopPopulate(): void {
        clearInterval(this.interval);
    }

    private newPopulation(): void {

        this.population.naturalSelection();
        this.population.generate();
        this.population.calculateFitness();
        this.population.evaluate();
    }
}
