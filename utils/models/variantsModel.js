class VariantsModel {
    id;
   name;
   variantsMap= new Map();

    constructor(variationAtribute,products) {
       this.id=variationAtribute.id;
       this.name=variationAtribute.name;

       variationAtribute.values.forEach((value)=>{
           this.variantsMap.set(value.value, value.name);
       });

       products.forEach((product)=>{
           product.variation_attributes.forEach((variation)=>{
               if(variation.id===this.id){
                   variation.values.forEach((variationValue)=>{
                       this.variantsMap.set(variationValue.value, variationValue.name);
                   })
               }
           })
       })
    }
}
exports.VariantsModel=VariantsModel;