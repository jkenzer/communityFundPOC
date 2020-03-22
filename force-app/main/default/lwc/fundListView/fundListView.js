import { LightningElement, wire } from 'lwc';
import getFunds from '@salesforce/apex/CommunityFundController.getFunds';

export default class FundListView extends LightningElement {
  funds=[];
  @wire(getFunds, {})
  wiredFunds({ error, data }) {
      if (error) {
          this.error = error;
      } else if (data) {
          this.funds = data;
      }
  }

  get formattedList(){
    let arrayOfMap = [];

    this.funds.forEach(function(element , index ){
        arrayOfMap.push({"Name":element.Fund__r.Name, "Id":index, "formattedURL": '/s/fund-detail-page/?fundid='+element.Fund__r.Id});
    });
    console.log(JSON.stringify(arrayOfMap));
    return arrayOfMap;
  }
}