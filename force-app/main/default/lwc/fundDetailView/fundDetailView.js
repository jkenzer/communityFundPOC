import { LightningElement, wire } from 'lwc';
import getFund from '@salesforce/apex/CommunityFundController.getFund';

export default class FundDetailView extends LightningElement {
  // console.log(this.href.substring(this.href.lastIndexOf('/') + 1));
  fund={};
  fundName = '';
  parameters = {};

  connectedCallback() {

      this.parameters = this.getQueryParameters();
      console.log(this.parameters.fundid);
  }

  @wire(getFund, {recordId: '$parameters.fundid'})
  wiredFunds({ error, data }) {
    if (error) {
      this.error = error;
    } else if (data) {
      this.fund = data;
      console.log(this.fund.Fund__r.Name);
      this.fundName = this.fund.Fund__r.Name;
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