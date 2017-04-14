/**
 * Created by Delvi-U on 13.04.2017.
 */
/**
 * Created by Delvi-U on 11.04.2017.
 */

export class CardPanel {
  suit: string;
  id: string;
  path: string;
  srcImg: string;
  cssClass: string;
  cssId: string;
  index: number;
  domElement: any;

  constructor(index: number) {
    this.suit = 's';
    this.id = this.convertIndex(index);
    this.path = '../../../assets/img/cards/card-';
    this.srcImg = this.path + this.suit + this.id + '.png';
    this.index = index;
    this.cssClass = 'card_panel-img';
    this.cssId = 'cardPanel-' + this.index;
  }

  onOver(): void {
  }

  onDown(): void {
  }

  onUp(): void {
  }

  onOut(): void {
  }

  private convertIndex(index: number): string {
    let id: string;
    switch (index) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        id = String(index + 2);
        break;
      case 9:
        id = 'j';
        break;
      case 10:
        id = 'q';
        break;
      case 11:
        id = 'k';
        break;
      case 12:
        id = 'a';
        break;
      default:
        console.error('Densta: $', 'Method: converIndex - NO SUCH INDEX');
        break;
    }
    return id;
  }

  setSuit(suit: string) {
    this.suit = suit;
    this.srcImg = this.path + this.suit + this.id + '.png';
  }
}


