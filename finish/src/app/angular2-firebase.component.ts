import { Component, Class, OnInit, AfterViewInit, Inject } from '@angular/core';
import {ViewChild} from "@angular/core";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'angular2-firebase-app',
  templateUrl: 'angular2-firebase.component.html',
  styleUrls: ['angular2-firebase.component.css']
})

export class Angular2FirebaseAppComponent {
  //init variables
  lines: FirebaseListObservable<any>;
  observableLines: Observable<any[]>;
  prevPoint;
  currentLine;
  selectedColor = "#000000";
  canvas;
  context:CanvasRenderingContext2D;
  @ViewChild("myBoard") myBoard;

  constructor(af: AngularFire) {
    this.observableLines = af.database.list('/lines').map((lines) => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        lines.map((line)=>{
            this.drawCanvasLine(line);
            return line;
        })
        return lines;
    });    
    this.lines = af.database.list('/lines'); 
          
  }
  
  getOffset(event) {
        return {
          x: event.offsetX === undefined ? event.layerX : event.offsetX,
          y: event.offsetY === undefined ? event.layerY : event.offsetY
      };
  }
  
  ngAfterViewInit() {
    
      //Init Canvas
      var self = this;
      self.canvas = this.myBoard.nativeElement;
      self.context = self.canvas.getContext("2d");
      self.canvas.width  = document.getElementById('board-box').offsetWidth;
      self.canvas.height = window.innerHeight - 200;
      self.context.lineWidth = 2;

      //Canvas Observers
      var mousedown = Observable.fromEvent(self.canvas, 'mousedown');     
      var mouseup = Observable.fromEvent(self.canvas, 'mouseup');
      var mousemove = Observable.fromEvent(self.canvas, 'mousemove');
      
      var mouseDrags = mousedown.map(downEvent => {
          self.currentLine = self.lines.push({ colour: self.selectedColor});
          return mousemove.takeUntil(mouseup).map(drag => {
              return this.getOffset(drag);
          });
      });       
      mouseDrags.subscribe(drags=>{
        this.prevPoint = "";
        drags.subscribe(function (move) {
              console.log('move', {x: move.x, y: move.y});
              self.currentLine.child('points').push({x: move.x, y: move.y});
            // if (!this.prevPoint) {
            //     this.prevPoint = {x: move.x, y: move.y}
            // } else {
            //     self.context.beginPath();
            //     self.context.strokeStyle = self.selectedColor;
            //     self.context.moveTo(this.prevPoint.x, this.prevPoint.y);
            //     self.context.lineTo(move.x, move.y);
            //     self.context.stroke(); 
            //     this.prevPoint = {x: move.x, y: move.y}  
            // }
          });
      });
  }
  
  drawCanvasLine(line) {
      var colour = line.colour;
      var points = line.points;
      var point;
      for (var pointKey in points) {
        point = points[pointKey];
        if (!this.prevPoint) {
            this.prevPoint = {x: point.x, y: point.y}
        } else {
            this.context.beginPath();
            this.context.strokeStyle = colour;
            this.context.moveTo(this.prevPoint.x, this.prevPoint.y);
            this.context.lineTo(point.x, point.y);
            this.context.stroke(); 
            this.prevPoint = {x: point.x, y: point.y}  
        }
      }
      this.prevPoint = null;
  }
  
  onCleanCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lines.remove();
  }
}

