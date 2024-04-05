import { Injectable, EventEmitter } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private canvas!: fabric.Canvas;
  shapeSelected = new EventEmitter<fabric.Object | null>();
  private fillColor: string = '#FFFFFF';
  private strokeColor: string = '#000000';

  constructor() { }

  initialize(canvasElement: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasElement);
    this.canvas.selection = false;
    this.canvas.on('mouse:down', (event) => {
      this.handleCanvasClick(event);
    });
  }

  setFillColor(color: string) {
    this.fillColor = color;
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;
  }

  drawCircle(fillColor: string, strokeColor: string): void {
    const circle = new fabric.Circle({
      radius: 50,
      left: 100,
      top: 100,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2
    });
    this.canvas.add(circle);
  }

  drawRectangle(fillColor: string, strokeColor: string): void {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      left: 200,
      top: 200,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2
    });
    this.canvas.add(rect);
  }

  drawTriangle(fillColor: string, strokeColor: string): void {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      left: 300,
      top: 300,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2
    });
    this.canvas.add(triangle);
  }

  stopDrawing(): void {
    this.canvas.isDrawingMode = false;
  }

  private handleCanvasClick(event: fabric.IEvent) {
    const target = event.target;

    if (target && !(target instanceof fabric.Canvas)) {
      this.selectShape(target);
    } else {
      this.deselectShape();
    }
  }

  deselectShape() {
    if (this.canvas.getActiveObject()) {
      this.canvas.getActiveObject()?.set({ borderColor: '', cornerColor: '' });
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  }

  selectShape(shape: fabric.Object) {
    this.shapeSelected.emit(shape);
  }


  applyFillColor(color: string) {
    if (this.canvas.getActiveObject()) {
      this.canvas.getActiveObject()?.set('fill', color);
      this.canvas.renderAll();
    }
  }

  applyStrokeColor(color: string) {
    if (this.canvas.getActiveObject()) {
      this.canvas.getActiveObject()?.set('stroke', color);
      this.canvas.renderAll();
    }
  }
  deleteSelectedShape() {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      this.canvas.remove(activeObject);
    }
  }
  exportCanvasToJson(): string {
    return JSON.stringify(this.canvas.toJSON());
  }

  importCanvasFromJson(json: string): void {
    this.canvas.loadFromJSON(json, () => {
      this.canvas.renderAll();
    });
  }
}
