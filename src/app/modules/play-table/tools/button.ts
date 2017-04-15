/**
 * Created by Delvi-U on 09.04.2017.
 */
export class Button {
  buttonName: string;
  action: any;
  actionArgument: string;
  path: string;
  srcNone: string;
  srcHover: string;
  srcDown: string;
  cssClass: string;
  cssId: string;

  constructor(buttonName: string,
              action: any,
              actionArgument: string,
              path: string = null,
              cssClass: string = null,
              cssId: string = null) {
    this.buttonName = buttonName;
    this.path = (path) ? path : '../../../assets/img/buttons/btn_';
    this.srcNone = this.path + buttonName + '_0.png';
    this.srcHover = this.path + buttonName + '_1.png';
    this.srcDown = this.path + buttonName + '_2.png';
    this.cssClass = (cssClass) ? cssClass : 'btn_' + buttonName + '-img';
    this.cssId = (cssId) ? cssId : 'btn_' + buttonName + '-img';
    this.action = action;
    this.actionArgument = actionArgument;
  }

  onOver(event): void {
    event.target.setAttribute('src', this.srcHover);
  }

  onDown(event): void {
    event.target.setAttribute('src', this.srcDown);
  }

  onUp(event, argument): void {
    event.target.setAttribute('src', this.srcNone);
    this.action(argument);
  }

  onOut(event): void {
    event.target.setAttribute('src', this.srcNone);
  }

  drawButton(): string {
    console.error('Densta: $', 'Method: ', this.cssClass);
    console.error('Densta: $', 'Method: ', this.cssId);
    return `
      <img src="` + this.srcNone + `"
         class="` + this.cssClass + `"
         id="` + this.cssId + `"
         (mouseover)="` + this.buttonName + `.onOver($event)"
         (mousedown)="` + this.buttonName + `.onDown($event)"
         (mouseup)="` + this.buttonName + `.onUp($event, ` + this.actionArgument + `)"
         (mouseleave)="` + this.buttonName + `onOut($event)">`;
  }
}


