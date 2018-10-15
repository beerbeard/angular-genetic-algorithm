import { Component, OnInit } from '@angular/core';

import { GeneticService } from '../../services/genetic.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	private model = {
		expected: undefined,
		mutation: undefined,
		population: undefined,
		speed: undefined
	}

	private result = {
		best: undefined,
		generation: undefined,
		fitness: undefined,
		stack: []
	}

	private running: boolean = false;

	constructor(private geneticService: GeneticService) { }

	ngOnInit() {

		this.geneticService.getPopulation()
			.subscribe(
				(data) => {
					this.result.best = data.getBest();
					this.result.fitness = Math.round(data.getAverageFitness() * 100) / 100;
					this.result.generation = data.getGenerations();
					this.result.stack.unshift(data.getBest());

					this.running = data.isFinished() ? false : true;
				},
				(error) => console.log(error)
			);
	}

	public onClick(): void {

		if (this.running) {
			
			this.geneticService.stopPopulate();
			
			this.running = !this.running;
		} else {

			this.clearResult();
			
			this.geneticService.startPopulate(this.model);
		}
	}

	private clearResult(): void {

		this.result = {
			best: undefined,
			generation: undefined,
			fitness: undefined,
			stack: []
		}
	}
}
