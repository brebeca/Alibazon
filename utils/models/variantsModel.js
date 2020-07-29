/**
 * Class to describe a varinat model
 */
class VariantsModel {
    id;
   name;
   variantsMap= new Map();

    /**
     * constructs the varinat model
     * @param {Object}variationAtribute the variant of the product  object
     * @param {Object}products the product of the variant
     */
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