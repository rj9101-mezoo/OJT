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

    const canvas = d3.select('.time_chart');
    const n = 603;
    const duration = 300
    var now: any = new Date(Date.now() - duration)

    var count: any = -5;
    let a = 0;
    var data: any = d3.range(n).map(() => 32500);
    var arr:any=[];
    let dumy:any = [];


    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const width = 2000 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = canvas.append('svg')
      .attr('width', width)
      .attr('height', height + 50)
      // .attr('transform', `translate(${margin.left + 100},${margin.top + 20})`)

    var x = d3.scaleTime()
      .domain([now - (n - 2) * duration, now - duration])
      .range([0, width])
    // .ticks(10)

    var y = d3.scaleLinear()
      .domain([32400, 32600])
      .range([height, 0]);

    const line: any = d3.line()
      .x(function (d, i) { return x(now - (n - 1 - i) * duration); })
      .y(function (d: any, i) { return y(d); })
      .curve(d3.curveBumpY)
      .defined(((d:any)=>d));


    const g = svg.append('g')

    g.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width + 20)
      .attr('height', height)


    var axis= 
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(5,${height + 10})`)
      .call(d3.axisBottom(x))

    g.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(${5},10)`)
      .call(d3.axisLeft(y))

    
    g.append('g')
      .attr('transform', `translate(40,10)`)
      .attr('class', 'line')
      .append("path") // path: 실제 데이터 구현 부
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'rgb(66, 255, 79)')
      .attr('stroke-width', '2')
      .attr('transform', 'translate(0,0)')
      .transition()
      .duration(40)
      .ease(d3.easeLinear)
      .on("start", tick);


      interval(1000).subscribe(()=> {arr=this.state});

       function tick(this: any) {
        d3.select('.rect').remove()
        now = new Date();
        x.domain([now - (n - 2) * duration, now - duration]);
        y.domain([d3.min(data) as any, d3.max(data) as any]);

        if(arr&&arr.length!==0){
          count+=5;
          if(count-a === arr.length)
            a = count;
          dumy = [...arr];
          data.splice((count%n),5, ...dumy.splice(count-a,5))
          if(count%n+10<n)
            data.splice((count%n)+5, 10, ...(new Array(10).fill(null)))
        }else{
          a = count;
        }
  
        d3.select(this) // 기본 변환행렬 초기화
          .attr("d", line(data))
          .attr("transform", null); // 선을 다시 그린다.
  
  
        axis.transition() // x축 설정, transition화
          .ease(d3.easeLinear);
  
  
        (d3.active(this) as any) // 변환행렬 설정
          .transition() // 변환 start
          .on("start", tick);
      }
  }

  getBeds() {
    this.beds = this.monitorService.getBeds();
  }
}