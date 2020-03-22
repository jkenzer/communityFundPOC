import { LightningElement, wire, track } from 'lwc';
import getFunds from '@salesforce/apex/CommunityFundController.getFunds';

const columns = [
  { label: 'Fund Name', fieldName: 'Name' },
  { label: 'Active', fieldName: 'active', type: 'boolean' },
  { label: 'Established Date', fieldName: 'establishedDate', type: 'date-local' },
  { label: 'Balance', fieldName: 'balance', type: 'currency' },
  { label: 'View Fund', fieldName: 'formattedURL', type: 'url', typeAttributes:{label: { fieldName: 'websiteLabel' }} },
];
export default class FundListView extends LightningElement {
  @track columns = columns;
  funds=[];
  @wire(getFunds, {})
  wiredFunds({ error, data }) {
      if (error) {
          console.log(error);
      } else if (data) {
          this.funds = data;
      }
  }

  get formattedList(){
    let arrayOfMap = [];

    this.funds.forEach(function(element , index ){
        arrayOfMap.push({"Name":element.Fund__r.Name, 
                          "Id":index, 
                          "formattedURL": '/s/fund-detail-page/?fundid='+element.Fund__r.Id,
                          "active": element.Fund__r.Active__c,
                          "establishedDate": element.Fund__r.Established_Date__c,
                          "balance": element.Fund__r.Fund_Balance__c,
                          "websiteLabel": 'View Fund'});
    });
    console.log(JSON.stringify(arrayOfMap));
    return arrayOfMap;
  }
}