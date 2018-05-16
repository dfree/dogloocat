import { Component, Input } from '@angular/core';

/**
 * Generated class for the EditableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editable',
  templateUrl: 'editable.html'
})
export class EditableComponent {
  @Input("type") type:string;
  text: string;
  user = {name:"Dave84"};
  constructor() {
    console.log('Hello EditableComponent Component '+this.type);
    this.text = 'Hello World';
  }
  edit(e:any){
    console.log("edit");
    console.log(e);
  }
}
