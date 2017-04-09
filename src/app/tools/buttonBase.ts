/**
 * Created by Delvi-U on 09.04.2017.
 */
export class ButtonBase {
  public buttonName: string;
  private action: any;

  private srcNone: string;
  private srcHover: string;
  private srcDown: string;
  private cssClass: string;
  private cssId: string;

  constructor(buttonName: string, action: void, cssClass: string = null, cssId: string = null) {
    this.buttonName = buttonName;
    this.srcNone = './assets/img/btn_' + buttonName + '_0.png';
    this.srcHover = './assets/img/btn_' + buttonName + '_1.png';
    this.srcDown = './assets/img/btn_' + buttonName + '_2.png';
    this.cssClass = (cssClass.length === 0) ? 'btn_' + buttonName + '-img' : cssClass;
    this.cssId = (cssId.length === 0) ? 'btn_' + buttonName + '-img' : cssId;
    this.action = action;
  }

  drawButton(): string {
    return `
      <img src="../../../assets/img/btn_position_0.png"
         class="btn_position-img"
         (mouseover)="onOver($event)"
         (mousedown)="onDown($event)"
         (mouseup)="onUp($event, player)"
         (mouseleave)="onOut($event)">
      }`;
  }

  onOver(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_1.png');
  }

  onDown(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_2.png');
  }

  onUp(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_0.png');
    this.action(event);
  }

  onOut(event): void {
    event.target.setAttribute('src', '../../../assets/img/btn_position_0.png');
  }
}


