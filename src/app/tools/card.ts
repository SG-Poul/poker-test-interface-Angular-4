/**
 * Created by Delvi-U on 11.04.2017.
 */

export class Card {
  name: string;
  path: string;
  srcImg: string;
  srcBtnNone: string;
  srcBtnHover: string;
  srcBtnDown: string;
  cssClass: string;
  cssId: string;
  isButton: boolean;
  ownerPosition: number;
  index: number;
  domElement: any;

  constructor(ownerPosition: number, index: number) {
    this.name = 'back';
    this.path = '../../../assets/img/cards/card-';
    this.srcImg = this.path + this.name + '.png';
    this.srcBtnNone = this.path + 'btn_0.png';
    this.srcBtnHover = this.path + 'btn_1.png';
    this.srcBtnDown = this.path + 'btn_2.png';
    // this.action = action;
    this.isButton = false;
    this.ownerPosition = ownerPosition;
    this.index = index;
    this.cssClass = 'card_base-img';
    this.cssId = 'card-' + this.ownerPosition + '-' + this.index;
  }

  getDOMElement() {
    this.domElement = document.getElementById(this.cssId);
    this.setButton(); // TODO: remove
  }

  onOver(): void {
    if (this.isButton) {
      this.domElement.setAttribute('src', this.srcBtnHover);
    }
  }

  onDown(): void {
    if (this.isButton) {
      this.domElement.setAttribute('src', this.srcBtnDown);
    }
  }

  onUp(): void {
    if (this.isButton) {
      this.domElement.setAttribute('src', this.srcBtnNone);
      this.isButton = false;
    }
  }

  onOut(): void {
    if (this.isButton) {
      this.domElement.setAttribute('src', this.srcBtnNone);
    }
  }

  setButton(): void {
    this.domElement.setAttribute('src', this.srcBtnNone);
    this.isButton = true;
  }

  setCard(name: string): void {
    this.name = name;
    this.srcImg = this.path + this.name + '.png';
    this.domElement.setAttribute('src', this.srcImg);
  }
}


