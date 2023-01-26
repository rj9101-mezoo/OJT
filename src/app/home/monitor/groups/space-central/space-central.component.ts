import { Component, OnInit, Input } from '@angular/core';
import { MonitorService } from 'src/app/home/monitor.service';
import * as d3 from 'd3'
import { interval } from 'rxjs';

@Component({
  selector: 'app-space-central',
  templateUrl: './space-central.component.html',
  styleUrls: ['./space-central.component.css']
})
export class SpaceCentralComponent implements OnInit {
  beds!: number;

  @Input() state!: number[];

  constructor(
    private monitorService: MonitorService
  ) { }

  ngOnInit(): void {
    this.getBeds();
    let data:number[] = [];
    d3.json("/assets/data/test.json")
    .then((d:any) => {
      data = (d.flat());
    });
    let n = 0;
    const canvas = d3.select('.time_chart');
    const width = document.querySelector('.time_chart')?.clientWidth;
    // const height = document.querySelector('.time_chart')?.getBoundingClientRect().height;
    const height = 300;

    console.log(height)

    const svg = canvas.append('svg')
      .attr('width', width ? width : 0)
      .attr('height', height ? height : 0);

    let [mt, mb, mr, ml] = [50, 50, 50, 50];

    const duration = 750;
    var now: any = new Date(Date.now() - duration);

    const graphWidth = width ? width - ml - mr : 0;
    const graphHeight = height ? height - mt - mb : 0;

    var axisX = d3.scaleTime()
      .domain([now - (n - 2) * duration, now - duration]) 
      .range([0, graphWidth])

    var axisY = d3.scaleLinear()
      .domain([32450, 32550])
      .range([graphHeight, 0])

    const line: any = d3.line()
      .x(function (d, i) { return axisX(now - (n - 1 - i) * duration); })
      .y(function (d: any, i) { return axisY(d); })
      .curve(d3.curveBumpY);

      const graph = svg. append('g')
      .attr('width', graphWidth)
      .attr('height', graphHeight+100)
      .attr('transform', `translate(${ml},${mt})`)
   
      var axis = graph
      .append('g')
      .attr('transform', `translate(0,${graphHeight})`)
      .attr('fill', 'green')
      .attr('color', 'green')
      // .call(d3.axisBottom(axisX))

      graph
      .append('g')
      .attr('class', 'x axis')
      .attr('fill', 'green')
      .attr('color', 'green')
      .call(d3.axisLeft(axisY))

      const lineChart = graph.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(100,0)`);
      
      lineChart.append("path") // path: 실제 데이터 구현 부
      .datum(this.state)
      .attr('class', 'test')
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', '1.5px')
      .attr('transform', 'translate(100,0)')
      .attr('d', line(this.state))

      const result = interval(40)
       .subscribe(x=> {
        // if(data.length)
        n = data.length/2;
        d3.select('.test').remove()
        d3.select('.rect').remove()


        // data.splice(0,-1);

        // data[count%n]= (Math.random() * 100)
        // // data[count+1%n]= (Math.random() * 100)
        // // data[count+2%n]= (Math.random() * 100)
        // // data[count+3%n]= (Math.random() * 100)
        // // data[count+4%n]= (Math.random() * 100)
        // count+=1;

        // data.reverse();
        
        now = new Date();
        axisX.domain([now - (n - 2) * duration, now - duration]);
        axisY.domain([d3.min(data) as any, d3.max(data) as any]);

        // axis.transition() // x축 설정, transition화
        //     .duration(0)
        //     .ease(d3.easeLinear)
            // .call(d3.axisBottom(axisX));


        lineChart.append("path") // path: 실제 데이터 구현 부
       .datum(data)
       .attr('class', 'test')
       .attr('fill', 'none')
       .attr('stroke', 'green')
       .attr('stroke-width', '1.5px')
       .attr('transform', 'translate(-100,0)')
       .attr('d', line(data))

       });
  }

  getBeds() {
    this.beds = this.monitorService.getBeds();
  }
}
