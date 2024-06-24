import {AfterViewInit, Component, ViewChild} from '@angular/core'

import { AbsoluteLayout, EVENT_TAP } from "@jsplumbtoolkit/browser-ui";
import {NodeComponent} from "./node.component"
import {jsPlumbSurfaceComponent} from "@jsplumbtoolkit/browser-ui-angular"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-testing';

  tapCount = 0

  @ViewChild(jsPlumbSurfaceComponent) surface!:jsPlumbSurfaceComponent

  renderOptions = {
    layout:{
      type:AbsoluteLayout.type
    }
  }

  viewOptions = {
    nodes:{
      default: {
        component: NodeComponent,
        events: {
          [EVENT_TAP]: () => this.tapCount++
        }
      }
    }
  }

  ngAfterViewInit(): void {

    this.surface.toolkit.load({
      data:{
        nodes:[
          { id:"1", left:50, top:50 },
          { id:"2", left:250, top:250 }
        ]
      }
    })

  }
}
