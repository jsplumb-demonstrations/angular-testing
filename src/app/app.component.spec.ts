import {ComponentFixture, TestBed} from '@angular/core/testing'
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser"
import {BrowserUIAngular, jsPlumbToolkitModule} from "@jsplumbtoolkit/browser-ui-angular"
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core"
import {jsPlumbToolkitTestHarness, Surface} from '@jsplumbtoolkit/browser-ui'

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let el:HTMLElement
  let app:AppComponent
  let surface:Surface
  let toolkit:BrowserUIAngular
  let harness:jsPlumbToolkitTestHarness

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserModule, jsPlumbToolkitModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    el = fixture.nativeElement as HTMLElement
    app = fixture.componentInstance;

    surface = fixture.componentInstance.surface.surface
    toolkit = fixture.componentInstance.surface.toolkit
    harness = new jsPlumbToolkitTestHarness(toolkit, surface)

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-testing'`, () => {
    expect(app.title).toEqual('angular-testing');
  });

  it('should render title', () => {
    expect(el.querySelector('span')?.textContent).toContain('angular-testing app is running!');
  });

  it('should render two nodes', () => {
    expect(el.querySelectorAll('.jtk-node').length).toBe(2)
  })

  it('Should allow user to drag an edge', () => {
    // no edges at first
    expect(toolkit.getAllEdges().length).toBe(0)

    // drag a connection from the ".connect" element of node 1 to node 2.
    harness.dragConnection(["1", ".connect"], "2", {})

    // ensure the edge was added.
    expect(toolkit.getAllEdges().length).toBe(1)
  })

  it('Should allow tap on a node', () => {

    harness.tapOnNode("1")

    // ensure the tap was detected.
    expect(app.tapCount).toBe(1)
  })

  it('Should support node drag', () => {

    const node1 = toolkit.getNode("1")
    expect(node1.data['left']).toBe(50)
    expect(node1.data['top']).toBe(50)

    harness.dragVertexBy("1", 150, 350)

    // ensure the node was dragged in X
    expect(node1.data['left']).toBe(200)
    // ensure the node was dragged in Y
    expect(node1.data['top']).toBe(400)

  })


});
