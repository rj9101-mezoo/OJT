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

  @Input()
  check!: boolean;

  public n:number = 995
  public data: any = d3.range(this.n).map(() => null);
  public count = -5;
  public init = 0;

  constructor(
    public monitorService: MonitorService,
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.websocketService.connect()
    this.websocketService.send("F2:79:B7:F0:D6:42")
    let n = this.n;
    // const width = document.querySelector('.time_chart')?.scrollWidth;
    // const height = parseInt(canvas.style('height'));
    // // const height = document.querySelector('.time_chart')?.scrollHeight;

    // getComputedStyle
    // var data: any = d3.range(n).map(() => null);
    var arr: any = [];
    // var dumy: any = [];

    // let count = -5;
    // let init = 0;

    // const trend = d3.selectAll('.trend_chart');
    // let trendWidth = (document.querySelector('.trend_chart')?.scrollWidth);
    // let trendHeight = (document.querySelector('.trend_chart')?.scrollHeight);
    // const trend_svg = trend.append('svg')
    //   .attr('width', '100')
    //   .attr('height', '10px')
    //   .attr('transform', `translate(0,0)`)
    //   .attr('display', 'inline-block')

    // var trendX = d3.scaleLinear()
    //   .domain([32400, 32600])
    //   .range([0, 10])

    // var trendY = d3.scaleLinear()
    //   .domain([32400, 32600])
    //   .range([10, 0])

    // if (this.check) {
    //     const trendGraph = trend_svg.append('g')
    //       .attr('width', '100%')
    //       .attr('height', '100%')
    //       .attr('transform', `translate(0,0)`)
  
    //     trendGraph
    //       .append('g')
    //       .attr('transform', `translate(0,${10})`)
    //       .attr('fill', 'green')
    //       .attr('color', 'green')
    //       .call(d3.axisBottom(trendX))

    //     trendGraph
    //       .append('g')
    //       .attr('class', 'x axis')
    //       .attr('fill', 'green')
    //       .attr('color', 'green')
    //       .call(d3.axisLeft(trendY))
    // }

    const canvas = d3.selectAll('.time_chart');
    const svg = canvas.append('svg')
      .attr('width', '100%')
      // .attr('width', width ? width : 0)
      // .attr('height', height ? height + 100+'px' : 0 + 100)
      .attr('height', '100%')
      .attr('transform', `translate(0,0)`)
      // .attr('display', 'inline-block')

    let [mt, mb, mr, ml] = [50, 50, 50, 50];

    const duration = 750;
    var now: any = new Date(Date.now() - duration);

    let baseWidth = parseInt(canvas.style('width')) - 10;
    let graphWidth = parseInt(canvas.style('width')) - 10;
    if (this.monitorService.beds == 4)
      graphWidth = graphWidth * 0.7;
    // const graphHeight = height ? height - mt - mb + 100 : 0 + 100;
    let graphHeight = parseInt(canvas.style('height'))+100;
    if(this.monitorService.beds == 8)
      graphHeight = parseInt(canvas.style('height'))+50;
    // console.log(document.getElementsByClassName('time_chart')[0].clientHeight)

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
        .datum(this.data)
        .attr('class', 'test')
        .attr('fill', 'none')
        .attr('stroke', 'rgb(66, 255, 79)')
        .attr('stroke-width', '2.5')
        .attr('transform', 'translate(-100,-50)')
        .attr('d', line(this.data))

      const result = interval(40)
        .subscribe(x => {
          // d3.select('.test').remove()
          // d3.selectAll('.rect').remove()

          if (this.check) {
             d3.select('.test').remove()
            if (this.websocketService.data1 && this.websocketService.data1.length !== 0) {
              this.count += 5;
              if (this.count - this.init === this.websocketService.data1.length)
                this.init = this.count;
              // dumy = [...arr];
              // data.splice((count % n), 5, ...dumy.splice(count - this.init, 5))
              for (let i = 0; i < 5; i++)
              this.data.splice((this.count % n) + i, 1, this.websocketService.data1[this.count - this.init + i]);

              if (this.count % n + 10 < n)
              this.data.splice((this.count % n) + 5, 10, ...(new Array(10).fill(null)))
            } else if(this.websocketService.data1){
              this.init = this.count;
            }
            now = new Date();
            axisX.domain([now - (n - 2) * duration, now - duration]);
            axisY.domain([d3.min(this.data) as any, d3.max(this.data) as any]);
            // document.querySelector('.time_chart').resize
            axisX.range([0, parseInt(canvas.style('width')) - 10])
            axisY.range([parseInt(canvas.style('height'))/2, 0])
            


            lineChart.append("path") // path: 실제 데이터 구현 부
              .datum(this.data)
              .attr('class', 'test')
              .attr('fill', 'none')
              .attr('stroke', 'rgb(66, 255, 79)')
              .attr('stroke-width', '2.5')
              .attr('transform', `translate(-150,-30)`)
              .attr('d', line(this.data))
          }
          else
            d3.select('.test').remove()
        });
    }
  }



  addDevice() {
    this.check = true;
  }

  removeDevice() {
    this.check = false;
    if(this.init>0)
      this.data = d3.range(this.n).map((d,i) => {
        // if(i>this.init)
          return 32500;
        // else
          // return null;
      });
    else
      this.data = d3.range(this.n).map(() => null);
    // this.count = -5;
    // this.init = 0;
  }
}
