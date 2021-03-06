import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { PencilBrushService } from './pencilBrush.service';

describe('PencilBrushService', () => {
  let toolService: PencilBrushService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [PencilBrushService, {provide: Renderer2, useClass: RenderStub}],
    });
    toolService =  TestBed.get(PencilBrushService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(toolService).toBeDefined();
  });

  it('should have as width 1', () => {
    expect(toolService.width).toEqual('1');
  });

  it('should have as TextureRef 0', () => {
    expect(toolService.TextureRef).toEqual(0);
  });

  it('should have as styleAttribute none', () => {
    expect(toolService.styleAttribute).toBeUndefined();
  });

  it('should have as InitialstyleAttribute \'stroke-linecap:round;stroke-linejoin:round;\'', () => {
    expect(toolService.initialStyleAttribute).toEqual('stroke-linecap:round;stroke-linejoin:round;');
  });

  it('should have as path \'\'', () => {
    expect(toolService.path).toEqual('');
  });

  it('should have createElement call render.createElement ', () => {
    spyOn(render, 'createElement');
    const point = new Point(0, 1);
    toolService.createElement(render, point, 1);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have createElement call render.setAttribute twice if active not equal to 1', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    toolService.createElement(render, point, 0);
    expect(render.setAttribute).toHaveBeenCalledTimes(2);
  });

  it('should have createElement call getCurrentPath', () => {
    const point = new Point(0, 1);
    spyOn(toolService, 'getCurrentPath');
    toolService.createElement(render, point, 0);
    expect(toolService.getCurrentPath).toHaveBeenCalledWith(point);
  });

  it('should have createElement call render.setAttribute twice if active equal to 1 and textureRef not range 1-5', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    toolService.TextureRef = 0;
    toolService.createElement(render, point, 0);
    expect(render.setAttribute).toHaveBeenCalledTimes(2);
  });

  it('should have createElement call render listen', () => {
    spyOn(render, 'setAttribute').and.callThrough();
    const point = new Point(0, 1);
    toolService.TextureRef = 2;
    toolService.createElement(render, point, 1);
    expect(render.setAttribute).toHaveBeenCalledTimes(3);
  });

  it('should have update call render.setAttribute', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    toolService.update(render, point, 1, true);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have update call getCurrentPath', () => {
    spyOn(toolService, 'getCurrentPath');
    const point = new Point(0, 1);
    toolService.update(render, point, 1, true);
    expect(toolService.getCurrentPath).toHaveBeenCalledWith(point);
  });

  it('should have stop set path to \'\'', () => {
    toolService.stop();
    expect(toolService.path).toEqual('');
  });

  it('should getAttribute', () => {
    toolService.width = '1';
    toolService.initialStyleAttribute = 'stroke-linecap:round;stroke-linejoin:round;';
    const expectValue = 'stroke-linecap:round;stroke-linejoin:round;stroke-width:1;stroke:red;fill:green;';
    expect(toolService.getAttribute('red', 'green')).toEqual(expectValue);
    expect(toolService.styleAttribute).toEqual(expectValue);
  });

  it('should getCurrentPath', () => {
    toolService.path = '';
    const point = new Point(0, 1);
    const expectValue = '0,1 ';
    expect(toolService.getCurrentPath(point)).toEqual(expectValue);
    expect(toolService.path).toEqual(expectValue);
  });

  it('should setWidth', () => {
    toolService.setWidth('100');
    expect(toolService.width).toEqual('100');
  });

  it('should setTextureRef', () => {
    toolService.setTextureRef(15);
    expect(toolService.TextureRef).toEqual(15);
  });
});
