import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import  getListCompras  from '@salesforce/apex/ComprasControllerLWC.getListCompras';

export default class ListaComprasLWC extends LightningElement {
    recordId;
    compras;
    error;
 
     columns =[
         {label:'Nome', fieldName: 'Name'},
         {label: 'Quantidade', fieldName: 'Quantidade__c'},
         {label: 'Preço Unitário', fieldName: 'PrecoUnitario__c'},
         {label: 'Preço Total', fieldName: 'PrecoTotal__c'},
         {label: 'Data de Compra', fieldName: 'DataCompra__c'},
     ];
 
     @wire(getListCompras)wiredCompras({error, data}){
         if(data){
             this.compras = data;
             this.error = undefined;
             console.log(this.compras);
         } else if(error){
             this.error = error;
             this.compras = undefined;
         }
     }

    handleSuccess(event){
        
        this.recordId = event.detail.id;

        const toastEvent = new ShowToastEvent({
            title: 'Parabéns!',
            message: 'Item adicionado com sucesso!',
            variant: 'success'
        });

        this.dispatchEvent(toastEvent);

        window.location.reload();
        
    }

    handleReset(){
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        if(inputFields) {
            inputFields.forEach(field => {
                field.value=null;
            });
        }
       
    }
}