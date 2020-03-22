public without sharing class CommunityFundController {
    public CommunityFundController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Fund_Association__c> getFunds() {
        Id userId = UserInfo.getUserId();
        Id contactId = [SELECT ID, ContactId FROM User WHERE id = :userId LIMIT 1].contactId;
        return [SELECT Id, Fund__r.Name, Fund__r.Id, Role__c FROM Fund_Association__c WHERE Contact__c = :contactId AND Role__c = 'Donor'];
    }

    @AuraEnabled(cacheable=true)
    public static Fund_Association__c getFund(String recordId) {

        Fund_Association__c fundDetail;
        Id userId = UserInfo.getUserId();
        Id contactId = [SELECT ID, ContactId FROM User WHERE id = :userId LIMIT 1].contactId;
        List<Fund_Association__c> fundAssociation = [SELECT Id, Fund__r.Name, Fund__r.Id, Role__c FROM Fund_Association__c WHERE Contact__c = :contactId AND Role__c = 'Donor' AND Fund__c = :recordId];
        // error handing if no results are found.
        return fundAssociation[0];
    }
}