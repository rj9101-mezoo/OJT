// import { Component, OnInit, Input } from '@angular/core';
// import { MonitorService } from 'src/app/home/monitor.service';
// import * as d3 from 'd3'
// import { interval } from 'rxjs';

// @Component({
//   selector: 'app-space-central',
//   templateUrl: './space-central.component.html',
//   styleUrls: ['./space-central.component.css']
// })
// export class SpaceCentralComponent implements OnInit {
//   beds!: number;

//   @Input() 
//     state!: number[];
//   @Input()
//     heart!: number[];
//   @Input()
//     temp!:number[]

//   constructor(
//     private monitorService: MonitorService
//   ) { }

//   ngOnInit(): void {
//     this.getBeds();

//     let n = 995;
//     const canvas = d3.select('.time_chart');
//     const width = document.querySelector('.time_chart')?.clientWidth;
//     // const height = document.querySelector('.time_chart')?.getBoundingClientRect().height;
//     const height = 300;
//     var data: any = d3.range(n).map(() => 32500);
//     var arr:any=[];
//     var dumy:any=[];

//     let count = -5;
//     let init = 0;

//     const svg = canvas.append('svg')
//       .attr('width', width ? width : 0)
//       .attr('height', height ? height : 0);

//     let [mt, mb, mr, ml] = [50, 50, 50, 50];

//     const duration = 750;
//     var now: any = new Date(Date.now() - duration);

//     const graphWidth = width ? width - ml - mr : 0;
//     const graphHeight = height ? height - mt - mb : 0;

//     var axisX = d3.scaleTime()
//       .domain([now - (n - 2) * duration, now - duration]) 
//       .range([0, graphWidth])

//     var axisY = d3.scaleLinear()
//       .domain([32400, 32600])
//       .range([graphHeight, 0])

//     const line: any = d3.line()
//       .x(function (d, i) { return axisX(now - (n - 1 - i) * duration); })
//       .y(function (d: any, i):any { 
//         if(d)
//           return axisY(d); 
//         else
//           return null;
//       })
//       .curve(d3.curveBumpY)
//       .defined(((d:any)=>d));

//       const graph = svg. append('g')
//       .attr('width', graphWidth)
//       .attr('height', graphHeight+100)
//       .attr('transform', `translate(${ml},${mt})`)
   
//       var axis = graph
//       .append('g')
//       .attr('transform', `translate(0,${graphHeight})`)
//       .attr('fill', 'green')
//       .attr('color', 'green')
//       // .call(d3.axisBottom(axisX))

//       graph
//       .append('g')
//       .attr('class', 'x axis')
//       .attr('fill', 'green')
//       .attr('color', 'green')
//       // .call(d3.axisLeft(axisY))

//       const lineChart = graph.append('g')
//       .attr('class', 'chart')
//       .attr('transform', `translate(100,0)`);
      
//       lineChart.append("path") // path: 실제 데이터 구현 부
//       .datum(data)
//       .attr('class', 'test')
//       .attr('fill', 'none')
//       .attr('stroke', 'rgb(66, 255, 79)')
//       .attr('stroke-width', '2')
//       .attr('transform', 'translate(-100,0)')
//       .attr('d', line(data))

//       const result = interval(40)
//        .subscribe(x=> {
//         d3.select('.test').remove()
//         d3.select('.rect').remove()

//         // count+=5;
//         if(this.state){
//           count+=5;
//           arr=this.state;
//         }

//         if(arr.length!==0){
//           if(count-init === arr.length)
//             init = count;
//           dumy = [...arr];
//           data.splice((count%n),5, ...dumy.splice(count-init,5))
//           if(count%n+10<n)
//             data.splice((count%n)+5, 10, ...(new Array(10).fill(null)))
//         }else{
//           init = count;    
//         }
//         now = new Date();
//         axisX.domain([now - (n - 2) * duration, now - duration]);
//         axisY.domain([d3.min(data) as any, d3.max(data) as any]);



//         lineChart.append("path") // path: 실제 데이터 구현 부
//        .datum(data)
//        .attr('class', 'test')
//        .attr('fill', 'none')
//        .attr('stroke', 'rgb(66, 255, 79)')
//        .attr('stroke-width', '1.5px')
//        .attr('transform', 'translate(-150,0)')
//        .attr('d', line(data))

//        });

//   }

//   getBeds() {
//     this.beds = this.monitorService.getBeds();
//   }
// }
