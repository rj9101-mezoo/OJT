import { Component, OnInit, Input } from '@angular/core';
import { MonitorService } from 'src/app/home/monitor.service';
import * as d3 from 'd3'
import { interval } from 'rxjs';
import { WebsocketService } from 'src/app/home/websocket.service';

@Component({
  selector: 'app-space-central',
  templateUrl: './space-central.component.html',
  styleUrls: ['./space-central.component.css']
})
export class SpaceCentralComponent implements OnInit {
  // @Input()
  // state!: number[];
  @Input()
  heart!: number[];
  @Input()
  temp!: number[];
  @Input()
  check!: boolean;





  constructor(
    public monitorService: MonitorService,
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.websocketService.connect()
    this.websocketService.send("F2:79:B7:F0:D6:42")
    let n = 995;
    const canvas = d3.select('.time_chart');
    // const width = document.querySelector('.time_chart')?.scrollWidth;
    // const height = parseInt(canvas.style('height'));
    // // const height = document.querySelector('.time_chart')?.scrollHeight;

    // getComputedStyle
    var data: any = d3.range(n).map(() => 32500);
    var arr: any = [];
    // var dumy: any = [];

    let count = -5;
    let init = 0;

    const svg = canvas.append('svg')
      .attr('width', '100%')
      // .attr('width', width ? width : 0)
      // .attr('height', height ? height + 100+'px' : 0 + 100)
      .attr('height', '100%')
      .attr('transform', `translate(0,0)`)
      .attr('display', 'inline-block')

    let [mt, mb, mr, ml] = [50, 50, 50, 50];

    const duration = 750;
    var now: any = new Date(Date.now() - duration);

    let graphWidth = parseInt(canvas.style('width')) - 10;
    if (this.monitorService.beds == 4)
      graphWidth = graphWidth * 0.7;
    // const graphHeight = height ? height - mt - mb + 100 : 0 + 100;
    const graphHeight = parseInt(canvas.style('height'));

    var axisX = d3.scaleTime()
      .domain([now - (n - 2) * duration, now - duration])
      .range([0, graphWidth])

    var axisY = d3.scaleLinear()
      .domain([32400, 32600])
      .range([graphHeight, 0])

    const line: any = d3.line()
      .x(function (d, i) { return axisX(now - (n - 1 - i) * duration); })
      .y(function (d: any, i): any {
        if (d)
          return axisY(d);
        else
          return null;
      })
      .curve(d3.curveBumpY)
      .defined(((d: any) => d));

    if (this.check) {
      const graph = svg.append('g')
        .attr('width', '100%')
        .attr('height', '100%')
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
      // .call(d3.axisLeft(axisY))

      const lineChart = graph.append('g')
        .attr('class', 'chart')
        .attr('transform', `translate(100,0)`);

      lineChart.append("path") // path: 실제 데이터 구현 부
        .datum(data)
        .attr('class', 'test')
        .attr('fill', 'none')
        .attr('stroke', 'rgb(66, 255, 79)')
        .attr('stroke-width', '2')
        .attr('transform', 'translate(-100,0)')
        .attr('d', line(data))


      const result = interval(40)
        .subscribe(x => {
          d3.select('.test').remove()
          d3.select('.rect').remove()
          if (this.check) {
            // count+=5;
            if (this.websocketService.data1) {
              count += 5;
              arr = this.websocketService.data1;
            }

            if (arr.length !== 0) {
              if (count - init === arr.length)
                init = count;
              // dumy = [...arr];
              // data.splice((count % n), 5, ...dumy.splice(count - init, 5))
              for (let i = 0; i < 5; i++)
                data.splice((count % n) + i, 1, arr[count - init + i]);

              if (count % n + 10 < n)
                data.splice((count % n) + 5, 10, ...(new Array(10).fill(null)))
            } else {
              init = count;
            }
            now = new Date();
            axisX.domain([now - (n - 2) * duration, now - duration]);
            axisY.domain([d3.min(data) as any, d3.max(data) as any]);



            lineChart.append("path") // path: 실제 데이터 구현 부
              .datum(data)
              .attr('class', 'test')
              .attr('fill', 'none')
              .attr('stroke', 'rgb(66, 255, 79)')
              .attr('stroke-width', '1.5px')
              .attr('transform', 'translate(-150,0)')
              .attr('d', line(data))
          }
        });
    }
  }



  addDevice() {
    this.check = true;
  }

  removeDevice() {
    this.check = false;

  }
}
