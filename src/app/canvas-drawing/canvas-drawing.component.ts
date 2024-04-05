import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from '../canvas.service';

@Component({
  selector: 'app-canvas-drawing',
  templateUrl: './canvas-drawing.component.html',
  styleUrls: ['./canvas-drawing.component.scss']
})
export class CanvasDrawingComponent implements AfterViewInit {
  @ViewChild('canvas') canvasEl!: ElementRef<HTMLCanvasElement>;
  sidebarVisible = false;
  fillColor: string = '#FFFFFF';
  strokeColor: string = '#000000';

  constructor(private canvasService: CanvasService) {
    this.canvasService.shapeSelected.subscribe(() => {
      this.sidebarVisible = true;
    });
  }

  ngAfterViewInit(): void {
    if (this.canvasEl) {
      this.canvasService.initialize(this.canvasEl.nativeElement);
    }
  }

  drawCircle(): void {
    this.canvasService.drawCircle(this.fillColor, this.strokeColor);
  }

  drawRectangle(): void {
    this.canvasService.drawRectangle(this.fillColor, this.strokeColor);
  }

  drawTriangle(): void {
    this.canvasService.drawTriangle(this.fillColor, this.strokeColor);
  }

  handleCanvasClick(event: MouseEvent) {
    this.canvasService.stopDrawing();
  }

  onFillColorChange(color: string) {
    this.fillColor = color;
  }

  onStrokeColorChange(color: string) {
    this.strokeColor = color;
  }

  modifySelectedShapeFillColor(color: string) {
    this.canvasService.applyFillColor(color);
  }

  modifySelectedShapeStrokeColor(color: string) {
    this.canvasService.applyStrokeColor(color);
  }

  deleteSelectedShape() {
    this.canvasService.deleteSelectedShape();
  }

  exportCanvas(): void {
    const json = this.canvasService.exportCanvasToJson();

    const blob = new Blob([json], { type: 'application/json' });
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'canvas-drawing.json';

    anchor.click();

    window.URL.revokeObjectURL(anchor.href);
  }

  importCanvas(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const json = reader.result as string;
      this.canvasService.importCanvasFromJson(json);
    };
    reader.readAsText(file);
  }
}
