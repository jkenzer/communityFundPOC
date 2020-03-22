import { LightningElement, wire, track } from 'lwc';
import getFund from '@salesforce/apex/CommunityFundController.getFund';

export default class FundDetailView extends LightningElement {
  // console.log(this.href.substring(this.href.lastIndexOf('/') + 1));
  fund={};
  fundName = '';
  parameters = {};
  establishedDate = '';
  active = '';
  balance = '';

  connectedCallback() {
      this.parameters = this.getQueryParameters();
  }

  @wire(getFund, {recordId: '$parameters.fundid'})
  wiredFunds({ error, data }) {
    if (error) {
      this.error = error;
    } else if (data) {
      this.fund = data;
      this.fundName = this.fund.Fund__r.Name;
      this.establishedDate = this.fund.Fund__r.Established_Date__c;
      this.active = this.fund.Fund__r.Active__c;
      this.balance = this.fund.Fund__r.Fund_Balance__c;
    }
  }
  getQueryParameters() {

    var params = {};
    var search = location.search.substring(1);

    if (search) {
        params = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
            return key === "" ? value : decodeURIComponent(value)
        });
    }

    return params;
}
  
}