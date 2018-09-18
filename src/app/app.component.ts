import { DataService } from './app.service';
import { Component, Input, OnInit, Compiler, ComponentFactory, TypeDecorator, NgModule, ModuleWithComponentFactories, ViewChild, ViewContainerRef, ComponentRef, ViewEncapsulation } from '@angular/core';
//import { createComponent } from '../../node_modules/@angular/compiler/src/core';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit{
  @Input() key: string;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  private componentRef: ComponentRef<{}>;
  title = 'app';
  constructor(private dataService: DataService, private compiler: Compiler){
  }
  
  ngOnInit(): void {
    this.dataService.GetData(this.key).subscribe((x:any)=>{
      var json = JSON.parse(x.data);
      console.log(json.data);
      console.log(json.template);
      
      this.createComponent(json.template, json.data);
      //this.createComponent(json.template, json);
    })
  }

  createComponent(_template, _data): any {
    let metadata = {
      template: _template
      //template: `<div [innerHTML]="template | sanitizeHtml"></div>`
    };

    let factory = this.createComponentFactorySync(metadata, null, _data);
    if(this.componentRef){
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.componentRef = this.container.createComponent(factory);
  }

  createComponentFactorySync(metadata: Component, componentClass: any, inputdata: any): ComponentFactory<any> {
    const cmpClass = componentClass || class RuntimeComponent { name: string = "C1"; data: any = inputdata};
    //const cmpClass = componentClass || class RuntimeComponent { name: string = "C1"; data: any = inputdata.data; template: any = inputdata.template};
    const typeD: TypeDecorator = Component(metadata);
    const decoratedCmp = typeD(cmpClass);
    @NgModule({imports: [SharedModule], declarations: [decoratedCmp]})
    class RuntimeComponentModule {}
    let module: ModuleWithComponentFactories<any> = this.compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }
}
