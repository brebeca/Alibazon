const utils=require('../utils-functions');

class ProductModel {

    name;
    description;
    price;
    imagePath;
    variants=[];
    id;
    parentCategory;

    constructor(product) {
        this.id=product.id;
        this.name = product.name;
        this.description= product.page_description;
        this.price=product.price;
        this.imagePath=utils.getImgPath(product, 0,'large');
        this.variants=getVariants(product);
        this.parentCategory=product.primary_category_id;
    }

}

function getVariants(product) {
    let variantAtributes= new Map();
    product.variation_attributes.forEach((item)=>{
        item.values.forEach((item2)=>{
            variantAtributes.set(item2.value,item2.name);
        })
    });
    let variants=[];
    product.variants.forEach((item)=>{
        let variant={
            title:'',
            inStock:item.orderable,
            id:item.product_id
        };
        for( const property in item.variation_values){
            variant.title+=property+': '+variantAtributes.get(item.variation_values[property])+'   ';
        }
        variant.title+=' Price: '+item.price;
        variants.push(variant);
    });
    return variants;
}


class ProductCartModel {

    name;
    description;
    price;
    imagePath;
    atributes;
    productID;
    variantID;
    parentCategory;

    constructor(product, pvariant) {
        this.productID=product.id;
        this.variantID=pvariant.variant.product_id;
        this.name = product.name;
        this.description= product.page_description;
        this.price=pvariant.variant.price;
        this.imagePath=utils.getImgPath(product, 0,'medium');
        this.parentCategory=product.primary_category_id;
        this.atributes=getAtributesList(product,pvariant);
    }

}

function getAtributesList(product,pVarinat) {
    let variantAtributes= new Map();
    product.variation_attributes.forEach((item)=>{
        item.values.forEach((item2)=>{
            variantAtributes.set(item2.value,item2.name);
        })
    });
    let list=new Map();
        for( const property in pVarinat.variant.variation_values){
            if(pVarinat.variant.variation_values.hasOwnProperty(property))
                list.set(property, variantAtributes.get(pVarinat.variant.variation_values[property]));
        }

    return list;
}
exports.ProductModel=ProductModel;
exports.ProductCartModel=ProductCartModel;