import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { EditableComponent } from './editable/editable';
@NgModule({
	declarations: [MapComponent,
    EditableComponent],
	imports: [],
	exports: [MapComponent,
    EditableComponent]
})
export class ComponentsModule {}
